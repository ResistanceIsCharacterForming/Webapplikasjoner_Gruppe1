import {
  LatLng,
  LatLngBounds,
  LocationEvent,
  LeafletEvent,
  Map,
} from "leaflet"

import { useState } from "react"

async function getLibrariesInView(bounds: LatLngBounds): Promise<any[]> {
  const res = await fetch("api/v1/libraries/")
  if (!res.ok) {
    console.error("Failed to fetch libraries:", res.statusText)
    return []
  }

  const libraries: any = await res.json();
  return libraries.data || []
}

export function LocationMarker({ reactLeaflet }: { reactLeaflet: any }) {
  const { Marker, Popup, useMapEvents } = reactLeaflet
  const [position, setPosition] = useState<LatLng | null>(null)
  const [libraries, setLibraries] = useState<any[]>([])

  const map: Map = useMapEvents({
    click() {
      map.locate({ enableHighAccuracy: true })
    },
    locationfound(e: LocationEvent) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
    async moveend(e: LeafletEvent) {
      const bounds = map.getBounds()
      const libraries = await getLibrariesInView(bounds)
      setLibraries(libraries)

      const { lat, lng } = map.getCenter()
      const url = new URL(window.location.href)
      url.searchParams.set("lat", lat.toFixed(6))
      url.searchParams.set("lng", lng.toFixed(6))
      window.history.replaceState({}, "", url)
    },
  })

  return (
  <>
  {position && (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )}
  {libraries.map((library) => (
    <Marker key={library.id} position={[library.cordlat, library.cordlon]}>
      <Popup>
        <strong>{library.name}</strong>
        <br />
        {library.text}
      </Popup>
    </Marker>
  ))}
  </>
  )
}
