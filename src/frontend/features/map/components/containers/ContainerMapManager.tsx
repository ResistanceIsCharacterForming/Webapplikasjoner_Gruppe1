"use client"

/* */
import { useContext, useEffect, useState } from "react"

/* Leaflet imports. */
import { MapContainer, TileLayer, } from "react-leaflet"
import "leaflet/dist/leaflet.css"

/* Hent hook fra nuqs for å parse query params. */
import { useQueryState } from 'nuqs'
import { LatLng } from "leaflet"
import { UserContext } from "@/frontend/features/auth/components/AuthContext"

/* Alle presenter og container kompoennter */
import PresenterMapManager from "../presenters/PresenterMapManager"
import ContainerModal from "@/frontend/features/shared/components/containers/ContainerModal"
import PresenterModal from "@/frontend/features/shared/components/presenters/PresenterModal"
import ContainerDisplayLibrary from "@/frontend/features/map/components/containers/ContainerDisplayLibrary"
import ContainerCreateLibrary from "@/frontend/features/map/components/containers/ContainerCreateLibrary"
import ContainerLibraryLogic from "@/frontend/features/map/components/containers/ContainerLibraryLogic"
import ContainerLibrariesMarker from "./ContainerLibrariesMarker"

/* Komponent for å håndtere kartet og modalen */
export default function ContainerMapManager(props: { cords: [number, number] }) {
  /* States for å håndtere logikk. */
  const [showModal, setShowModal] = useState<boolean>(false)
  const [latLong, SetLatLong] = useState<[number, number]>(props.cords)
  const [currentView, setCurrentView] = useState<string>("")

  /* Disse states samsvarer med hvilken query params vi kan forvente. */
  const [userID, setUserID] = useQueryState("bruker")
  const [libraryID, setLibraryID] = useQueryState("bokkrok")
  const [reviewsID, setReviewsID] = useQueryState("anmeldelser")
  const [reportID, setReportID] = useQueryState("rapport")
  const [cords, setCords] = useQueryState("koordinater")

  /* Util state brukt for å sende verdi til den åpne modalen. */
  const [elementValue, setElementValue] = useState<string>("")

  /* Hent koordinater fra query params. */
  const getCords: any = () => {
    const parseCords = cords?.split(",") ?? [0, 0]
    return [Number(parseCords[0]), Number(parseCords[1])]
  }

  /* "Slå" av alle query params untatt en. */
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

  /* Åpne selve modal-visning. modalView er hvilken komponent som skal kalles, nedenfor. param er for query params i URL. id er verdi til query param. */
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

  /* userId og isAdmin, hentet fra context til layouten som får det fra serveren. */
  const user: any = useContext(UserContext)
  
  /* Hvis en query param er satt ønsker vi å laste modal-vinduet for den ressursen. */
  useEffect(() => {
    if (!singleParamPresent) return
    if (userID) openModalWithContent("displayUser", "userID", userID)
    if (libraryID) openModalWithContent("displayLibrary", "libraryID", libraryID)
    if (reviewsID) openModalWithContent("displayReviews", "reviewsID", reviewsID)
  }, [])

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
                  setUserID(null)
                  setLibraryID(null)
                  setReviewsID(null)
                  setReportID(null)
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

          {user.userId !== null ?
          <ContainerLibraryLogic
            onAddAction={(position: LatLng) => {
              const lat = position.lat;
              const lng = position.lng;
              const cords = `${lat},${lng}`;
              openModalWithContent("createLibrary", "libraryID", cords)
            }}
          /> : null}

        </MapContainer>

      </PresenterMapManager>

    </section>
  )
}
