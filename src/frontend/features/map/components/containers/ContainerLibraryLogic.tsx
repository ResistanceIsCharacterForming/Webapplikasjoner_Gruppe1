"use client"

import { useState } from "react"

import { Marker, Tooltip, useMapEvents } from "react-leaflet"
import { LatLng, LeafletMouseEvent } from "leaflet"

import PresenterLibraryLogic from "@/frontend/features/map/components/presenters/PresenterLibraryLogic"

import { ContainerChildrenProp } from "@/frontend/types/container"

interface ContainerLibraryLogicProps {
  onAddAction: (position: any) => void
}


export default function ContainerLibraryLogic({onAddAction}: ContainerLibraryLogicProps) {

  const [position, setPosition] = useState<LatLng | null>(null)

  const map = useMapEvents({
    click(event: LeafletMouseEvent) {
      setPosition(event.latlng)
    }
  })

  return position === null ? null : (<PresenterLibraryLogic markerPosition={position} onAddAction={onAddAction} />)
}