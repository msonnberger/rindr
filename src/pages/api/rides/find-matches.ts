import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Coordinates = {
  latitude: number
  longitude: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<string[]>) {
  const session = await getSession({ req })

  if (!session) {
    res.status(500)
    return
  }

  const { start, destination, date } = req.query
}

function combineCoordinates(locations: Coordinates[]) {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`)
  return stringLocations.join(';')
}

async function calculateExtraTimeNeeded(
  duration: number,
  from: Coordinates,
  to: Coordinates,
  via: Coordinates
) {
  const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/`

  const params = new URLSearchParams([
    ['geometries', 'geojson'],
    ['access_token', process.env.PRIVATE_MAPBOX_KEY as string],
  ])

  const url = `${baseUrl}${combineCoordinates([from, via, to])}?${params.toString()}`
  const response = await fetch(url)
  const data = await response.json()

  return data.routes[0].duration - duration
}
