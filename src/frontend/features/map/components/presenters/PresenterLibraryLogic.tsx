"use client"

import { LatLng } from "leaflet"
import { Marker, Tooltip } from "react-leaflet"

interface PresenterLibraryLogicProps {
  onAddAction: (position: any) => void
  markerPosition: LatLng
}

export default function PresenterLibraryLogic({markerPosition, onAddAction}: PresenterLibraryLogicProps) {
    return (<Marker
      position={markerPosition}
      eventHandlers={{
        click: () => onAddAction(markerPosition)
      }}
    >
      <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>Trykk på denne nålen<br/>for å bekrefte plassering</Tooltip>
    </Marker>)
}