import mapboxgl from '!mapbox-gl'
import { useEffect, useRef, useState } from 'react'

// eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
export default function Map() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng] = useState(13.08693)
  const [lat] = useState(47.72379)
  const [zoom] = useState(17)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    })
  })

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}
