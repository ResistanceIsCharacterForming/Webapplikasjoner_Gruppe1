import {
  LatLng,
  LatLngBounds,
  LocationEvent,
  LeafletEvent,
  Map,
} from "leaflet"

import { useState } from "react"

async function getLibrariesInView(bounds: LatLngBounds) {
  //const libraryController = singletonMaster.libraryController
  const _southWest = bounds.getSouthWest()
  const _northEast = bounds.getNorthEast()

  // const res = await libraryController.listLibraryWithCords(
  //   _northEast.lng,
  //   _southWest.lng,
  //   _northEast.lat,
  //   _southWest.lat
  // )
  // const libraries = await res.json()
  // console.log(libraries)
}

export function LocationMarker({ reactLeaflet }: { reactLeaflet: any }) {
  const { Marker, Popup, useMapEvents } = reactLeaflet
  const [position, setPosition] = useState<LatLng | null>(null)

  const map: Map = useMapEvents({
    click() {
      map.locate({ enableHighAccuracy: true })
    },
    locationfound(e: LocationEvent) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
    moveend(e: LeafletEvent) {
      const bounds = map.getBounds()
      getLibrariesInView(bounds)

      const { lat, lng } = map.getCenter()
      const url = new URL(window.location.href)
      url.searchParams.set("lat", lat.toFixed(6))
      url.searchParams.set("lng", lng.toFixed(6))
      window.history.replaceState({}, "", url)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
