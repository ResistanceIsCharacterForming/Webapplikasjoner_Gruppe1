"use client"

import { useEffect, useState } from "react"

import { NuqsAdapter } from 'nuqs/adapters/react'

export default function MapSafeGuard() {

    const [mapLoaded, setMapLoaded] = useState<boolean>(false)
    const [dynamicImport, setDynamicImport] = useState<any>()

    const isClient = () => {
        return typeof window !== "undefined"
    }

    useEffect(() => {
        if (!isClient()) return

        import("./MapManager").then((module) => {
            setDynamicImport((() => module.default))
            setMapLoaded(true)
        })
    }, [])

 

    if (!mapLoaded && !dynamicImport) {
        return <section>Laster kart ...</section>
    }

    const MapGeneratorComponent = dynamicImport;
    return <NuqsAdapter><MapGeneratorComponent /></NuqsAdapter>
}