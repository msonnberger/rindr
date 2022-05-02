import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Coordinates = {
  latitude: number
  longitude: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    res.status(500)
    return
  }

  const from = { longitude: 13.254923393796085, latitude: 47.98067277832721 }
  const to = { longitude: 13.086791861894637, latitude: 47.723227207131735 }
  const via = { longitude: session.user.longitude, latitude: session.user.latitude }

  const extraDistance = await calculateExtraDistanceNeeded(47000, from, to, via)

  res.status(200).json({ extraDistance })
}

function combineCoordinates(locations: Coordinates[]) {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`)
  return stringLocations.join(';')
}

async function calculateExtraDistanceNeeded(
  distance: number,
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

  return (data.routes[0].distance - distance) / 1000
}
