"use client"

import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

import { LocationMarker } from "@/features/libraries/hooks/markerPlacer"
import { CreateLibrary } from "./createLibrary"
import { LatLng } from "leaflet"
import LibrariesContainer from "@/components/shared/LibrariesContainer"

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
  const [mapControls, setMapControls] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [formCoordinate, setFormCoordinate] = useState<LatLng | null>(null)

  useEffect(() => {
    if (!isClient()) return

    import("react-leaflet").then((module) => {
      setReactLeaflet(module)
    })

    import("@/features/libraries/hooks/mapControls").then((module) => {
      setMapControls(module)
    })
  }, [])

  if (!reactLeaflet || !mapControls) {
    return <div>Loading map...</div>
  }

  const { MapContainer, TileLayer } = reactLeaflet
  const { MapControls } = mapControls

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <LibrariesContainer/>
      <MapContainer
        center={getInitialCenter()}
        minZoom={4}
        zoom={13}
        className="position: relativ z-0 h-[100vh] w-[100%]"
      >
        <TileLayer
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapControls reactLeaflet={reactLeaflet} setShowForm={setShowForm} setFormCoordinate={setFormCoordinate} />
        <LocationMarker reactLeaflet={reactLeaflet} />

        {showForm && (
          <CreateLibrary reactLeaflet={reactLeaflet} onClose={() => setShowForm(false)} coordinate={formCoordinate} />
      )}
      </MapContainer>
      
    </div>
  )
}
