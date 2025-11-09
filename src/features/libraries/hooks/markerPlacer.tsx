import {
  LatLng,
  LatLngBounds,
  LeafletMouseEvent,
  LocationEvent,
  LeafletEvent,
  Map,
} from "leaflet"

import { MouseEvent, useState } from "react"

async function getLibrariesInView(bounds: LatLngBounds): Promise<any[]> {
  const res = await fetch("api/v1/libraries/")
  if (!res.ok) {
    console.error("Failed to fetch libraries:", res.statusText)
    return []
  }

  const libraries: any = await res.json();
  return libraries.data || []
}

async function addLibrary(coordinate: LatLng) {
  const newLibrary = {
    libraryUserId: "28fae289-ab8e-44f3-9c33-fffdc55ec36a",
    libraryName: "Test Bibliotek",
    libraryText: "Lorem Ipsum.",
    libraryCordLat: coordinate.lat,
    libraryCordlon: coordinate.lng,
    createdAt: new Date().toISOString(),
    libraryBooks: "",
    libraryPhotos: "{}",
  }

  const res = await fetch("api/v1/libraries/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLibrary),
  })

  if (!res.ok) {
    console.error("Failed to create library:", res.statusText)
    return
  }
}


export function LocationMarker({ reactLeaflet }: { reactLeaflet: any }) {
  const { Marker, Popup, useMapEvents } = reactLeaflet
  const [position, setPosition] = useState<LatLng | null>(null)
  const [libraries, setLibraries] = useState<any[]>([])

  const map: Map = useMapEvents({
    click(e: LeafletMouseEvent) {
      addLibrary(e.latlng)
      //map.locate({ enableHighAccuracy: true })
    },
    locationfound(e: LocationEvent) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 15)
    },
    async moveend(e: LeafletEvent) {
      const zoomLevel = map.getZoom()
      if (zoomLevel >= 14) {
        const bounds = map.getBounds()
        const libraries = await getLibrariesInView(bounds)
        setLibraries(libraries)
      } else setLibraries([])
      

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
