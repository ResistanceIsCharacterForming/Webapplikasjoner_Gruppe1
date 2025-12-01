"use client"

import { useEffect, useState } from "react"

import { NuqsAdapter } from 'nuqs/adapters/react'

export default function MapSafeGuard() {

    const [mapLoaded, setMapLoaded] = useState<boolean>(false)
    const [dynamicImport, setDynamicImport] = useState<any>()
    const [loction,setloction] = useState<[number,number]>([59.12928,11.353732])
    const isClient = () => {
        return typeof window !== "undefined"
    }

    useEffect(() => {
        if (!isClient()) return
        import("./MapManager").then((module) => {
            setDynamicImport((() => module.default))
            setMapLoaded(true)
        })

        navigator.geolocation.getCurrentPosition((position)=> {setloction([position.coords.latitude,position.coords.longitude]);})
        
    }, [])

 

    if (!mapLoaded && !dynamicImport) {
        return <section>Laster kart ...</section>
    }

    const MapGeneratorComponent = dynamicImport;
    return <NuqsAdapter><MapGeneratorComponent cords={loction}/></NuqsAdapter>
}