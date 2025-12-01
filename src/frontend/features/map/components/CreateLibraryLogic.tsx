"use client"

import { useState } from "react"

import { Marker, Tooltip, useMapEvents } from "react-leaflet"
import { LatLng, LeafletMouseEvent } from "leaflet"

interface CreateLibraryLogicProps {
  onAddAction: (position: any) => void
}


export default function CreateLibraryLogic({onAddAction}: CreateLibraryLogicProps) {

  const [position, setPosition] = useState<LatLng | null>(null)

  const map = useMapEvents({
    click(event: LeafletMouseEvent) {
      setPosition(event.latlng)
    }
  })

  return position === null ? null : (

    <Marker
      position={position}
      eventHandlers={{
        click: () => onAddAction(position)
      }}
    >
      <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>Trykk på denne nålen<br/>for å bekrefte plassering</Tooltip>
    </Marker>
  )
}