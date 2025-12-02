"use client"
import { Marker } from "react-leaflet";

import { PresenterLibrariesMarkerProps } from "@/frontend/features/map/components/containers/ContainerLibrariesMarker"

export default function PresenterLibrariesMarker({library, onOpenAction}: PresenterLibrariesMarkerProps) {
    return (<Marker
        position={[library.cordlat, library.cordlon]}
        eventHandlers={{
            click: () => onOpenAction(library)
        }}
    ></Marker>
    )
}