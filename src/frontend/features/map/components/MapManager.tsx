"use client"

import { useContext, useEffect, useState } from "react"

/* Leaflet imports. */
import { Circle, FeatureGroup, LayerGroup, LayersControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

/* Henter container for alle modals. */
import ModalContainer from "@/frontend/features/shared/components/ModalContainer"

/* Selve "rammen" for innholdet til en modal. */
import ModalContentShowLibrary from "@/frontend/features/map/modal/DisplayLibrary"
import ModalContentNewLibrary from "@/frontend/features/map/modal/CreateLibrary"

import CreateLibraryLogic from "@/frontend/features/map/components/CreateLibraryLogic"

import DisplayLibrariesMarker from "@/frontend/features/map/components/DisplayLibrariesMarker"


/* Hent hook fra nuqs for å parse query params. */
import { useQueryState } from 'nuqs'
import { latLng, LatLng } from "leaflet"
import AuthContext, { UserContext } from "@/frontend/features/auth/components/AuthContext"


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

  const openModalWithContent = (modalView: string, param: string, id: string) => {
    singelParamActivate(param, id)
    setShowModal(true)
    setCurrentView(modalView)
  }
  const userId: any = useContext(UserContext)

  console.log(userId.userId)


  const center: any = [51.505, -0.09]
  const rectangle: any = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]


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
          {currentView === "displayLibrary" ? <ModalContentShowLibrary /> : null}
          {currentView === "createLibrary" ? <ModalContentNewLibrary /> : null}
        </ModalContainer>
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



        {/* TEST */}
        <LayersControl position="topright">
          <LayersControl.Overlay name="Marker with popup">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle
                center={center}
                pathOptions={{ fillColor: 'blue' }}
                radius={200}
              />
              <Circle
                center={center}
                pathOptions={{ fillColor: 'red' }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[51.51, -0.08]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>



        <DisplayLibrariesMarker
          onOpenAction={(cords) => {
            setShowModal(true)
            setCurrentView("setShowModal")
            /*openModalWithContent("library", )*/

          }}
          onMoveendAction={(cords: any) => {
            const cordsAsString = `${cords.lat},${cords.lng}`
            setCords(cordsAsString)
            console.log(getCords())
          }}
          cords={latLong} />


        <CreateLibraryLogic
          onAddAction={(position: LatLng) => {
            console.log(position)
            const lat = position.lat;
            const lng = position.lng;
            const cords = `${lat},${lng}`;
            openModalWithContent("createLibrary", "libraryID", cords)
          }}
        />

      </MapContainer>

    </section>
  )
}
