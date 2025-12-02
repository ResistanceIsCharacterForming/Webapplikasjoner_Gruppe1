"use client"

import { useEffect, useState } from "react"
import { Marker, useMapEvents } from "react-leaflet"

import { getLibrariesOfArea } from "@/backend/features/shared/utils/universal/library/getLibrariesOfArea"
import { LeafletEvent } from "leaflet"

/* Types for leaflet */
import { library as libraryType } from "@/backend/types/library"
import { useQueryState } from "nuqs"
import { ContainerChildrenProp } from "@/frontend/types/container"
import PresenterLibrariesMarker from "../presenters/PresenterLibrariesMarker"

interface ContainerLibrariesMarkerProps {
    onOpenAction: (position: any) => void
    onMoveendAction: (position: any) => void
}

export interface PresenterLibrariesMarkerProps {
    onOpenAction: (position: any) => void
    library: libraryType
}

export default function ContainerLibrariesMarker({ onOpenAction, onMoveendAction }: ContainerLibrariesMarkerProps) {

    const [libraries, setLibraries] = useState<libraryType[]>()

    const map = useMapEvents({
        moveend(event: LeafletEvent) {
            getLibraries()
            onMoveendAction(map.getCenter())
        }
    })

    const getLibraries = async () => {
        const lat = map.getCenter().lat
        const lng = map.getCenter().lng
        const result = await getLibrariesOfArea(lat, lng)
        setLibraries(result.data)
    }

    return (
        <>
            {libraries?.map((library: libraryType) => (
                <PresenterLibrariesMarker key={library.id} library={library} onOpenAction={() => {onOpenAction(library.id)}} />
            ))}
        </>
    )
}