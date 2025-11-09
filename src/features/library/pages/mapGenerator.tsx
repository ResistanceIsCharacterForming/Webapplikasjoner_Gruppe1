"use client"

import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

import { LocationMarker } from "@/features/library/hooks/markerPlacer"

function isClient() {
  return typeof window !== "undefined"
}

function getInitialCenter() {
  const params = new URLSearchParams(window.location.search)
  const lat = parseFloat(params.get("lat") || "59.12183")
  const lng = parseFloat(params.get("lng") || "11.381")
  return [lat, lng] as [number, number]
}

export function MapGenerator() {
  const [reactLeaflet, setReactLeaflet] = useState<any>(null)

  useEffect(() => {
    if (!isClient()) return

    import("react-leaflet").then((module) => {
      setReactLeaflet(module)
    })
  }, [])

  if (!reactLeaflet) {
    return <div>Loading map...</div>
  }

  const { MapContainer, TileLayer } = reactLeaflet

  return (
    <MapContainer
      center={getInitialCenter()}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker reactLeaflet={reactLeaflet} />
    </MapContainer>
  )
}
