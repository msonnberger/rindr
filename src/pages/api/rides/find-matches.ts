import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { SupabaseRide } from 'src/types/main'
import { combineCoordinates } from '@utils/functions'
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

type ResData = SupabaseRide[] | { error: string }

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

  const { data: rideCandidates } = await supabase
    .from<SupabaseRide>('rides')
    .select(
      `
      *,
      driver:users!rides_driver_id_fkey (
        *
      )
    `
    )
    .neq('driver_id', session?.user.id as string)
    .eq(column, campus)
    .gte('departure', date)
    .lte('departure', tomorrow)

  if (!rideCandidates) {
    res.status(500).json({ error: 'Something went wrong. Please try again later' })
    return
  }

  const extraTimePromises = rideCandidates.map((ride) => calculateExtraMinutesNeeded(ride, pickup))
  const extraTimes = await Promise.all(extraTimePromises)

  const rides = rideCandidates.filter((ride, i) => extraTimes[i] < ride.threshold)

  res.status(200).json(rides ?? [])
}

async function calculateExtraMinutesNeeded(ride: SupabaseRide, pickupCoords: string) {
  const start: Coordinates = { latitude: ride.start_latitude, longitude: ride.start_longitude }
  const destination: Coordinates = {
    latitude: ride.destination_latitude,
    longitude: ride.destination_longitude,
  }

  const pickup: Coordinates = {
    latitude: Number(pickupCoords.split(',')[0]),
    longitude: Number(pickupCoords.split(',')[1]),
  }

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
