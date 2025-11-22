"use client"

import { useEffect, useState } from "react"

import { MapContainer, TileLayer } from "react-leaflet"


import "leaflet/dist/leaflet.css"

/* import { LocationMarker } from "@/features/libraries/hooks/markerPlacer" */

import { CreateLibrary } from "./createLibrary"
import { LatLng } from "leaflet"
import ModalContainer from "@/components/shared/ModalContainer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import ReviewCard from "@/features/reviews/pages/ReviewCard"

function isClient() {
  return typeof window !== "undefined"
}

import LocationMarker from "./LocationMarker"

function getInitialCenter() {
  const params = new URLSearchParams(window.location.search)
  const lat = parseFloat(params.get("lat") || "59.12183")
  const lng = parseFloat(params.get("lng") || "11.381")
  return [lat, lng] as [number, number]
}

export default function MapGenerator() {
  /*
  const [reactLeaflet, setReactLeaflet] = useState<any>(null)
  const [mapControls, setMapControls] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [formCoordinate, setFormCoordinate] = useState<LatLng | null>(null)
*/
/*
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)

  const [mapComponents, setMapComponents] = useState<any>(null)

  useEffect(() => {
    if (!isClient()) return

    import("react-leaflet").then(( module ) => {
      setMapComponents({
        MapContainer: module.MapContainer,
        TileLayer: module.TileLayer
      })
    })
  }, [])

  if (!mapComponents) {
    return <section>Laster kart ...</section>
  }

  const { MapContainer, TileLayer } = mapComponents*/


  /*
  useEffect(() => {
    if (!isClient()) return


    
    import("react-leaflet").then((module) => {
      setReactLeaflet(module)
    })

    import("@/features/libraries/hooks/mapControls").then((module) => {
      setMapControls(module)
    })
  }, [])*/
/*
  if (!reactLeaflet || !mapControls) {
    return <section>Laster kart ...</section>
  }

  const { MapContainer, TileLayer } = reactLeaflet
  const { MapControls } = mapControls
*/

  return (
    <div className=" w-full h-screen flex justify-center items-center">
      
      {/*
      <LibrariesContainer>
        <article className="grid grid-cols-3 grid-rows-6">
          <section>
            <h2>Bokhylle ved festningen</h2>
            <p>(Brukernavn)</p>
          </section>
          <p>Btn fav</p>
          <p>Btn close</p>
          <p>Image</p>
          <section>
            <p>Anmeldelser 2</p>
          </section>
          <section>
            <p>Stjerner</p>
          </section>
          <section>
            <p>Kort</p>
          </section>
          <section>
            <p>Input felt</p>
          </section>
        </article>
      </LibrariesContainer>
      */}

      {/*
      <ModalContainer>
        <article className="flex flex-wrap py-2 px-2 h-full overflow-scroll">
          <section className="basis-4/5">
            <h2 className="font-prata text-xl">Bokhylle ved festningen</h2>
            <span className="flex flex-wrap justify-start gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
              <p className="font-manrope">(Brukernavn)</p>
            </span>
          </section>
          <section className="basis-1/5 flex flex-wrap justify-end gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </section>
          <section className="basis-full justify-center">
            <img className="w-full max-w-[80%] m-auto" src="src/features/libraries/pages/RP-P-1922-145-edit-1.png"/>
          </section>
          <section className="basis-full mt-1">
            <label className="font-manrope text-blackChocolate" htmlFor="review">Ny anmeldelse:</label>
            <input
                name="review"
                id="review"
                type="text"
                placeholder = "Skriv her ..."
                className = "w-full border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"
            />
          </section>
          <hr className="basis-full my-3"/>
          <section className="basis-1/2 mb-1">
            <p className="font-manrope">Anmeldelser (2)</p>
          </section>
          <section className="basis-1/2">
            <span className="flex flex-wrap justify-end text-end gap-1">
              <p className="font-manrope">2/5</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            </span>
          </section>
          <section className="basis-full">
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
          </section>
          <section className="basis-full justify-center my-4">
            <span className="block text-center text-lg text-lotion hover:text-darkVanilla! bg-oldRose h-auto m-auto p-3"><a href="#">Les alle anmeldelser her</a></span>
          </section>
        </article>
      </ModalContainer>
      */}
 
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
        {/*
        <MapControls reactLeaflet={reactLeaflet} setShowForm={setShowForm} setFormCoordinate={setFormCoordinate} />*/}

        { /*<LocationMarker reactLeaflet={reactLeaflet} /> 

        {showForm && (
          <CreateLibrary reactLeaflet={reactLeaflet} onClose={() => setShowForm(false)} coordinate={formCoordinate} />
      )}*/}

      

        {/*mapLoaded ? <LocationMarker /> : null*/}

        {/*!!mapLoaded && <LocationMarker/>*/}

          <LocationMarker/>

      </MapContainer>
      
    </div>
  )
}
