"use client"

import { useState } from "react"

/* Leaflet imports. */
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"

/* Henter container for alle modals. */
import ModalContainer from "@/frontend/features/shared/components/ModalContainer"

/* Selve "rammen" for innholdet til en modal. */
import ModalContentShowLibrary from "@/frontend/features/map/components/modal/DisplayLibrary"
import ModalContentNewLibrary from "@/frontend/features/map/components/modal/CreateLibrary"

import CreateLibraryLogic from "@/frontend/features/map/components/CreateLibraryLogic"

import DisplayLibrariesMarker from "@/frontend/features/map/components/DisplayLibrariesMarker"

function getInitialCenter() {
  const params = new URLSearchParams(window.location.search)
  const lat = parseFloat(params.get("lat") || "59.12183")
  const lng = parseFloat(params.get("lng") || "11.381")
  return [lat, lng] as [number, number]
}

/* Hent hook fra nuqs for å parse query params. */
import { useQueryState } from 'nuqs'


export default function MapGenerator() {

  const [showModal, setShowModal] = useState<boolean>(false)

  const [currentView, setCurrentView] = useState<string>("")

  /* Disse states samsvarer med hvilken query params vi kan forvente. */
  const [userID, setUserID] = useQueryState("bruker")
  const [libraryID, setLibraryID] = useQueryState("bokkrok")
  const [reviewsID, setReviewsID] = useQueryState("anmeldelser")
  const [reportID, setReportID] = useQueryState("rapport")

    const singelParamActivate = (param: string, value: string) => {
        /* Siden React er smart og ikke oppdaterer en state med verdien den hadde kan vi kalle her uten å sjekke om verdien er en tom streng. */
        setUserID(null)
        setLibraryID(null)
        setReviewsID(null)
        setReportID(null)
        switch (param) {
            case "userID": setUserID(value)
            break
            case "libraryID": setLibraryID(value)
            break
            case "reviewsID": setReviewsID(value)
            break
            case "reportID": setReportID(value)
            break
        }
    }  


    /* Helpe funksjon for å avgjøre om det er flere enn en query param i URL. Hvis det finnes mer enn en, returner false. */
    const singleParamPresent = (): boolean => {
        const allParams = [userID, libraryID, reviewsID, reportID].filter(value => value != null)
        if (allParams.length > 1) return false
        return true
    }

    const openModalWithContent = (type: string, id: string) => {

    }

  return (
    /* Wrap vår egen modal og hele Leaflet elementet i en flex så vi kan enkelt sentrere modal over kartet. */
    <section className=" w-full h-screen flex justify-center items-center">

        {/* Hvis modal er lukket og vi har ingenting å vise frem, hold den skjult. */}
        {showModal === true && currentView !== "" ?
            <ModalContainer
            /* Vi sender funksjoner til ModalContainer som blir kjørt når forskjellige knapper inni den er trykket på. */
            actions={{
                onPrevious: () => console.log("previous"),
                onForward: () => console.log("forward"),
                onClose: () => {
                    setShowModal(false)
                    setCurrentView("")
                }
            }}>
            {currentView === "displayLibrary" ? <ModalContentShowLibrary/> : null}
            {currentView === "createLibrary" ? <ModalContentNewLibrary/> : null}
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

        <DisplayLibrariesMarker/>

        <CreateLibraryLogic
          onAddAction={(position: any) => {
            console.log(position)
            setShowModal(true)
            setCurrentView("createLibrary")
            /*openModalWithContent("library", )*/
          }}
        />
      
      
      </MapContainer>
      
    </section>
  )
}
