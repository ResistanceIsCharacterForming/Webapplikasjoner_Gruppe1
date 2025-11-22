"use client"

import { useEffect, useState } from "react"

export default function MapSafeGuard() {

    const isClient = () => {
        return typeof window !== "undefined"
    }

     useEffect(() => {
        if (!isClient()) return

        import("./mapGenerator").then((module) => {
            setDynamicImport((() => module.default))
            setMapLoaded(true)
        })
    }, [])

    const [mapLoaded, setMapLoaded] = useState<boolean>(false)
    const [dynamicImport, setDynamicImport] = useState<any>(null)

    if (!mapLoaded && !dynamicImport) {
        return <section>Laster kart ...</section>
    }

    const MapGeneratorComponent = dynamicImport;
    return <MapGeneratorComponent />
}