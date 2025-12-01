"use client"

import { useState } from "react"
import { Marker, useMapEvents  } from "react-leaflet"

import { getLibrariesOfArea } from "@/frontend/features/map/components/utils/getLibrariesOfArea"
import { LeafletEvent } from "leaflet"

/* Types for leaflet */
import { library as libraryType } from "@/types/library"

interface DisplayLibrariesMarkerProps {
  onOpenAction: (position: any) => void
}

export default function DisplayLibrariesMarker({onOpenAction}: DisplayLibrariesMarkerProps) {
    
    const [libraries, setLibraries] = useState<libraryType[]>()

    const getLibraries = async () => {
        const lat = map.getCenter().lat
        const lng = map.getCenter().lng
        const result = await getLibrariesOfArea(lat, lng)
        setLibraries(result.data)
    }
    
    const map = useMapEvents({
        moveend(event: LeafletEvent) {
            getLibraries()
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