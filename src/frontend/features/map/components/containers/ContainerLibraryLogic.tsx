"use client"

import { useState } from "react"

import { Marker, Tooltip, useMapEvents } from "react-leaflet"
import { LatLng, LeafletMouseEvent } from "leaflet"

import { ContainerChildrenProp } from "@/frontend/types/container"

interface ContainerLibraryLogicProps extends ContainerChildrenProp {
  onAddAction: (position: any) => void
}


export default function ContainerLibraryLogic({children, onAddAction}: ContainerLibraryLogicProps) {

  const [position, setPosition] = useState<LatLng | null>(null)

  const map = useMapEvents({
    click(event: LeafletMouseEvent) {
      setPosition(event.latlng)
    }
  })

  return position === null ? null : (<>{children}</>)
}