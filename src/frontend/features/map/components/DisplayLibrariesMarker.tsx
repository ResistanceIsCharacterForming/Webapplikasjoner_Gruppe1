"use client"

import { useEffect, useState } from "react"
import { Marker, useMapEvents  } from "react-leaflet"

import { getLibrariesOfArea } from "@/frontend/features/map/utils/getLibrariesOfArea"
import { LeafletEvent } from "leaflet"

/* Types for leaflet */
import { library as libraryType } from "@/backend/types/library"
import { useQueryState } from "nuqs"

interface DisplayLibrariesMarkerProps {
  onOpenAction: (position: any) => void
  onMoveendAction: (position: any) => void
  cords:[number,number]
}

export default function DisplayLibrariesMarker({onOpenAction,onMoveendAction,cords}: DisplayLibrariesMarkerProps) {
    
    const [libraries, setLibraries] = useState<libraryType[]>()
    function compareCords(cords: [number, number]) {
        if (Math.abs(cords[0] - cords[0]) > 0.2 && Math.abs(cords[0] - cords[0]) > 0.2) return true
        return false
    }
    
    const getLibraries = async () => {
        const lat = map.getCenter().lat
        const lng = map.getCenter().lng
        if (compareCords([lat,lng])){
            console.log("change cords ")
            const result = await getLibrariesOfArea(lat, lng)
            setLibraries(result.data)   
        }
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
                            click: () => onOpenAction(cords)
                        }}
                    ></Marker>
                ))
            : null}
        </>
    )
}