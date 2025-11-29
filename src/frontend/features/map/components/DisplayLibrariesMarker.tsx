"use client"

import { useState } from "react"
import { Marker, useMapEvents  } from "react-leaflet"

import { useGetLibrariesOfArea } from "./hooks/useGetLibrariesOfArea"
import { LeafletEvent } from "leaflet"

/* Types for leaflet */
import { library as libraryType } from "@/types/library"

export default function DisplayLibrariesMarker() {
    
    const [libraries, setLibraries] = useState<libraryType[]>()

    const getLibraries = async () => {
        const lat = map.getCenter().lat
        const lng = map.getCenter().lng
        const result = await useGetLibrariesOfArea(lat, lng)
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
                ? libraries.map((library: libraryType) => (
                    <Marker
                        position={[library.cordlat, library.cordlon]}
                    ></Marker>
                ))
            : null}
        </>
    )
}