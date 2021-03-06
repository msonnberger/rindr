import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { FindRideResponse, SupabaseRide } from 'src/types/main'
import { combineCoordinates, stringToCoordinates } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'

interface Coordinates {
  latitude: number
  longitude: number
}

interface QueryParams {
  pickup: string
  campus: 'Campus Urstein' | 'Campus Kuchl' | 'Campus Salzburg/SALK' | 'Campus Schwarzach'
  campusIsStart: 'true' | 'false'
  date: string
}

type ResData = FindRideResponse[] | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
  const session = await getSession({ req })

  if (!session) {
    res.status(500).json({ error: 'Could not get session. Try again later.' })
  }

  const { pickup, campus, campusIsStart, date } = req.query as unknown as QueryParams

  if (!pickup || !campus || !campusIsStart || !date) {
    res.status(500).json({ error: 'Not all required parameters found.' })
  }

  const column = campusIsStart === 'true' ? 'start_location' : 'destination_location'
  const tomorrow = new Date(new Date(date).getTime() + 60 * 60 * 24 * 1000).toISOString()

  let { data: rideCandidates } = await supabase
    .from('rides')
    .select(
      `
      *,
      driver:users!rides_driver_id_fkey (
        *
      )
    `
    )
    .neq('driver_id', session?.user.id as string)
    .is('passenger_id', null)
    .eq(column, campus)
    .gte('departure', date)
    .lte('departure', tomorrow)

  if (!rideCandidates) {
    res.status(500).json({ error: 'Something went wrong. Please try again later' })
    return
  }

  rideCandidates = rideCandidates.map((candidate) => {
    const { driver, ...ride } = candidate
    return { ride, driver }
  })

  const extraTimePromises = rideCandidates.map((card) =>
    calculateExtraMinutesNeeded(card.ride, pickup)
  )
  const extraTimes = await Promise.all(extraTimePromises)

  let rides = rideCandidates.filter((card, i) => extraTimes[i] < card.ride.threshold)
  const imagePromises = rides.map((card) => addRouteImage(card, pickup))
  rides = await Promise.all(imagePromises)

  res.status(200).json(rides ?? [])
}

async function calculateExtraMinutesNeeded(ride: SupabaseRide, pickupCoords: string) {
  const start: Coordinates = { latitude: ride.start_latitude, longitude: ride.start_longitude }
  const destination: Coordinates = {
    latitude: ride.destination_latitude,
    longitude: ride.destination_longitude,
  }

  const pickup: Coordinates = stringToCoordinates(pickupCoords)

  const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/`

  const params = new URLSearchParams([
    ['geometries', 'geojson'],
    ['access_token', process.env.PRIVATE_MAPBOX_KEY as string],
  ])

  const url = `${baseUrl}${combineCoordinates([start, pickup, destination])}?${params.toString()}`
  const response = await fetch(url)
  const data = await response.json()

  if (!data.routes) return 999999999

  return (data.routes[0].duration - ride.duration) / 60
}

async function addRouteImage(card: FindRideResponse, pickup: string): Promise<FindRideResponse> {
  const start: Coordinates = {
    latitude: card.ride.start_latitude,
    longitude: card.ride.start_longitude,
  }
  const via: Coordinates = stringToCoordinates(pickup)
  const destination: Coordinates = {
    latitude: card.ride.destination_latitude,
    longitude: card.ride.destination_longitude,
  }

  const geoJSON = await getGeoJSON(start, via, destination)
  const imageUrl = getImageUrl(geoJSON)

  card.ride.image_url = imageUrl
  return card
}

async function getGeoJSON(start: Coordinates, via: Coordinates, destination: Coordinates) {
  const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/`

  const params = new URLSearchParams([
    ['access_token', process.env.PRIVATE_MAPBOX_KEY as string],
    ['geometries', 'geojson'],
  ])

  const url = `${baseUrl}${combineCoordinates([start, via, destination])}?${params.toString()}`
  const response = await fetch(url)
  const data = await response.json()

  return data.routes[0].geometry
}

function getImageUrl(geoJSON: any) {
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(${encodeURIComponent(
    JSON.stringify(geoJSON)
  )})/auto/600x800?`
  const params = new URLSearchParams([
    ['access_token', process.env.NEXT_PUBLIC_MAPBOX_KEY as string],
    ['padding', '50'],
  ])

  return url + params.toString()
}
