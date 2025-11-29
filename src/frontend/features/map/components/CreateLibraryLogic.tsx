"use client"

import { useState } from "react"
import { Marker, Popup, Tooltip, useMapEvents } from "react-leaflet"

interface CreateLibraryLogicProps {
  onAddAction: (position: any) => void
}


export default function CreateLibraryLogic({onAddAction}: CreateLibraryLogicProps) {

  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    click(e: any) {
        setPosition(e.latlng)
    }
  })

    console.log(position)


  return position === null ? null : (


    <Marker
      position={position}
      eventHandlers={{
        click: (e) => onAddAction(position)
      }}
    >
      <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>Trykk på denne nålen<br/>for å bekrefte plassering</Tooltip>
    </Marker>
  )
}