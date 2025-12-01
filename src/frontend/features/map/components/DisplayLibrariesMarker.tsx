"use client"

import { useState } from "react"
import { Marker, useMapEvents  } from "react-leaflet"

import { getLibrariesOfArea } from "@/frontend/features/map/utils/getLibrariesOfArea"
import { LeafletEvent } from "leaflet"

/* Types for leaflet */
import { library as libraryType } from "@/backend/types/library"
import { useQueryState } from "nuqs"

interface DisplayLibrariesMarkerProps {
  onOpenAction: (position: any) => void
  onMoveendAction: (position: any) => void
}

export default function DisplayLibrariesMarker({onOpenAction, onMoveendAction}: DisplayLibrariesMarkerProps) {
    
    const [libraries, setLibraries] = useState<libraryType[]>()



    const getLibraries = async () => {
        const lat = map.getCenter().lat
        const lng = map.getCenter().lng
        const result = await getLibrariesOfArea(lat, lng)

    }
    
    const map = useMapEvents({
        moveend(event: LeafletEvent) {
            getLibraries()
            onMoveendAction(map.getCenter())
        }
    })

    return (
        <>
            {libraries !== undefined
                ?   libraries.map((library: libraryType) => (
                    <Marker
                        key={library.id}
                        position={[library.cordlat, library.cordlon]}
                        eventHandlers={{
                            click: () => onOpenAction()
                        }}
                    ></Marker>
                ))
            : null}
        </>
    )
}