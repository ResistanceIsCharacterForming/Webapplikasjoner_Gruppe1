"use client"

import { useEffect, useState } from "react"

import { MapContainer, TileLayer } from "react-leaflet"


import "leaflet/dist/leaflet.css"

import { CreateLibrary } from "./createLibrary"
import { LatLng } from "leaflet"
import ModalContainer from "@/components/shared/ModalContainer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import ReviewCard from "@/features/reviews/pages/ReviewCard"

import AddLibraryLogic from "./AddLibraryLogic"
import ModalContentShowLibrary from "./ModalContentShowLibrary"
import ModalContentNewLibrary from "./ModalContentNewLibrary"

function getInitialCenter() {
  const params = new URLSearchParams(window.location.search)
  const lat = parseFloat(params.get("lat") || "59.12183")
  const lng = parseFloat(params.get("lng") || "11.381")
  return [lat, lng] as [number, number]
}

export default function MapGenerator() {

  const [showModal, setShowModal] = useState<boolean>(false)

  const [currentView, setCurrentView] = useState<string>("")

  return (
    <div className=" w-full h-screen flex justify-center items-center">

      {showModal === true && currentView !== "" ?
        <ModalContainer
          onPrevious={() => console.log("previous")}
          onForward={() => console.log("forward")}
          onClose={() => setShowModal(false)}
        >
          {currentView === "showLibrary" ? <ModalContentShowLibrary/> : null}
          {currentView === "newLibrary" ? <ModalContentNewLibrary/> : null}
        </ModalContainer>
      : null}
      
      <MapContainer
        center={getInitialCenter()}
        minZoom={4}
        zoom={13}
        className="position: relativ z-0 h-[100vh] w-[100%]"
      >

        <TileLayer
          attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <AddLibraryLogic
          onAdd={(position: any /* utrolig fin ts kode */) => {
            setCurrentView("newLibrary")
            setShowModal(true)
          }}
        />
      
      
      </MapContainer>
      
    </div>
  )
}
