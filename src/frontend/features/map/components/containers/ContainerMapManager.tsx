"use client"

import { useContext, useEffect, useState } from "react"

/* Leaflet imports. */
import { Circle, FeatureGroup, LayerGroup, LayersControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

/* Henter container for alle modals. */
import ModalContainer from "@/frontend/features/shared/components/containers/ContainerModal"

/* Selve "rammen" for innholdet til en modal. */
import ContentShowLibrary from "@/frontend/features/map/components/presenters/PresenterDisplayLibrary"
import ContentNewLibrary from "@/frontend/features/map/components/presenters/PresenterCreateLibrary"

import CreateLibraryLogic from "@/frontend/features/map/components/containers/ContainerLibraryLogic"


/* Hent hook fra nuqs for å parse query params. */
import { useQueryState } from 'nuqs'
import { latLng, LatLng } from "leaflet"
import AuthContext, { UserContext } from "@/frontend/features/auth/components/AuthContext"

import PresenterMapManager from "../presenters/PresenterMapManager"
import ContainerModal from "@/frontend/features/shared/components/containers/ContainerModal"
import PresenterNewLibrary from "@/frontend/features/map/components/presenters/PresenterCreateLibrary"
import PresenterModal from "@/frontend/features/shared/components/presenters/PresenterModal"
import PresenterDisplayLibrary from "@/frontend/features/map/components/presenters/PresenterDisplayLibrary"


import ContainerDisplayLibrary from "@/frontend/features/map/components/containers/ContainerDisplayLibrary"
import ContainerCreateLibrary from "@/frontend/features/map/components/containers/ContainerCreateLibrary"
import ContainerLibraryLogic from "@/frontend/features/map/components/containers/ContainerLibraryLogic"
import ContainerLibrariesMarker from "./ContainerLibrariesMarker"

import { useGetLibrary } from "@/backend/features/shared/utils/universal/library/useGetLibrary"

export default function MapGenerator(props: { cords: [number, number] }) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [latLong, SetLatLong] = useState<[number, number]>(props.cords)
  const [currentView, setCurrentView] = useState<string>("")

  /* Disse states samsvarer med hvilken query params vi kan forvente. */
  const [userID, setUserID] = useQueryState("bruker")
  const [libraryID, setLibraryID] = useQueryState("bokkrok")
  const [reviewsID, setReviewsID] = useQueryState("anmeldelser")
  const [reportID, setReportID] = useQueryState("rapport")
  const [cords, setCords] = useQueryState("koordinater")

  const [elementValue, setElementValue] = useState<string>("")

  const getCords: any = () => {
    const parseCords = cords?.split(",") ?? [0, 0]
    return [Number(parseCords[0]), Number(parseCords[1])]
  }

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
    }
  }

  /* Helpe funksjon for å avgjøre om det er flere enn en query param i URL. Hvis det finnes mer enn en, returner false. */
  const singleParamPresent = (): boolean => {
    const allParams = [userID, libraryID, reviewsID, reportID].filter(value => value != null)
    if (allParams.length > 1) return false
    return true
  }

  const openModalWithContent = async (modalView: string, param: string, id: string) => {
    singelParamActivate(param, id)
    setShowModal(true)
    setCurrentView(modalView)

    switch (param) {
      case "userID":
        setElementValue(param)
        break
      case "libraryID":
        setElementValue(id)
        break
      case "reviewsID":
        break
    }
  }

  const user: any = useContext(UserContext)

  useEffect(() => {
    if (!singleParamPresent) return
    if (userID) openModalWithContent("displayUser", "userID", userID)
    if (libraryID) openModalWithContent("displayLibrary", "libraryID", libraryID)
    if (reviewsID) openModalWithContent("displayReviews", "reviewsID", reviewsID)
  },[])

  return (
    /* Wrap vår egen modal og hele Leaflet elementet i en flex så vi kan enkelt sentrere modal over kartet. */
    <section className="w-full h-screen flex justify-center items-center">

      <PresenterMapManager>

        {/* Hvis modal er lukket og vi har ingenting å vise frem, hold den skjult. */}
        {showModal === true && currentView !== "" ?
          <ContainerModal
          /* Vi sender funksjoner til ModalContainer som blir kjørt når forskjellige knapper inni den er trykket på. */
          >
            <PresenterModal
              actions={{
                onPrevious: () => console.log("previous"),
                onForward: () => console.log("forward"),
                onClose: () => {
                  setShowModal(false);
                  setCurrentView("");
                }
              }}
            >
              {currentView === "displayLibrary" && (
                <ContainerDisplayLibrary libraryId={elementValue} userId={user.userId} />
              )}
              {currentView === "createLibrary" && (
                <ContainerCreateLibrary cords={elementValue} userId={user.userId} />
              )}
            </PresenterModal>
          </ContainerModal>
          : null}

        <MapContainer
          center={cords === null ? latLong : getCords()}
          minZoom={4}
          zoom={13}
          className="position: relativ z-0 h-[100vh] w-[100%]"
        >

          <TileLayer
            attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ContainerLibrariesMarker
            onOpenAction={(libraryId) => {
              openModalWithContent("displayLibrary", "libraryID", libraryId)

            }}
            onMoveendAction={(cords: any) => {
              const cordsAsString = `${cords.lat},${cords.lng}`
              setCords(cordsAsString)
            }}
          />

          <ContainerLibraryLogic
            onAddAction={(position: LatLng) => {
              const lat = position.lat;
              const lng = position.lng;
              const cords = `${lat},${lng}`;
              openModalWithContent("createLibrary", "libraryID", cords)
            }}
          />

        </MapContainer>

      </PresenterMapManager>

    </section>
  )
}
