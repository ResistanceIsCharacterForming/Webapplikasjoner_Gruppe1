"use client"

import { library } from "@/backend/types/library"
import {
  LatLng,
  LatLngBounds,
  LeafletMouseEvent,
  LocationEvent,
  LeafletEvent,
  Map,
} from "leaflet"

import { MouseEvent, useState } from "react"

import { manipulateUrl } from "./manipulateUrl"

async function getLibrariesInView(bounds: LatLngBounds): Promise<library[]> {
  const res = await fetch("api/v1/libraries/")
  if (!res.ok) {
    console.error("Failed to fetch libraries:", res.statusText)
    return []
  }

  const libraries: any = await res.json();
  return libraries.data || []
}

export async function AddLibrary(libName: string, libText: string, coordinate: LatLng, libBooks: string = "") {
  const newLibrary: library = {
    id: "create",
    userId: "28fae289-ab8e-44f3-9c33-fffdc55ec36a",
    name: libName,
    text: libText,
    cordlat: coordinate.lat,
    cordlon: coordinate.lng,
    createdAt: new Date().toISOString(),
    books: libBooks,
    photos: "{}",
    isVisible:true
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

  await res.json();
}


export function LocationMarker({ reactLeaflet }: { reactLeaflet: any }) {
  const { Marker, Popup, useMapEvents } = reactLeaflet
  const [position, setPosition] = useState<LatLng | null>(null)
  const [libraries, setLibraries] = useState<library[]>([])


  async function refreshMarkers(map: Map) {
    const zoomLevel = map.getZoom()
      if (zoomLevel >= 14) {
        const bounds = map.getBounds()
        const librariesInView = await getLibrariesInView(bounds)
        setLibraries(librariesInView)
      } else setLibraries([])
  }

  const map: Map = useMapEvents({
    // async click(e: LeafletMouseEvent) {
    //   await addLibrary(e.latlng)
    //   await refreshMarkers(map)
    // },
    locationfound(e: LocationEvent) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 15)
    },
    async moveend(e: LeafletEvent) {
      await refreshMarkers(map)

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
    <Marker position={position} onClick = {() => console.log("true")}>
      {/*<Popup>You are here</Popup>*/}
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
