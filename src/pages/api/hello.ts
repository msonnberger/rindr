// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: 'John Doe' })
}

const from = '47.98067277832721, 13.254923393796085'
const to = '47.723227207131735, 13.086791861894637'
const viapoint = '47.868879712358044, 13.128797945605017'
const mapbox = `https://api.mapbox.com/directions/v5/mapbox/driving/${from};${viapoint};${to}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
const time = '2022-05-02T15:00'

async function fetchRoute() {
  const res = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&depart_at=${time}`
  )
  const response = await res.json()
  setRoute(response)
  console.log('ERRRROOOOR')
  console.log(route)
}
