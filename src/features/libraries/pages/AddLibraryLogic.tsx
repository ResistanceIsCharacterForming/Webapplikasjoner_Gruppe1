"use client"

import { useState } from "react"
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet"

export default function AddLibraryLogic({onAdd}: any) {

  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    click(e: any) {
        setPosition(e.latlng)
    }
  })

  return position === null ? null : (
    <Marker
      position={position}
      eventHandlers={{
        click: () => {
          onAdd(position)
        },
      }}>
      <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>Trykk på denne nålen<br/>for å bekrefte plassering</Tooltip>
    </Marker>
  )
}