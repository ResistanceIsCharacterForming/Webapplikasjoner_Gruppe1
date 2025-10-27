"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import { LocationMarker } from "@/features/map/hooks/markerPlacer";

function isClient() {
  return typeof window !== "undefined";
}

export function MapGenerator() {
  const [reactLeaflet, setReactLeaflet] = useState<any>(null);

  useEffect(() => {
    if (!isClient()) return;

    import("react-leaflet").then((module) => {
      setReactLeaflet(module);
    });
  }, []);

  if (!reactLeaflet) {
    return <div>Loading map...</div>;
  }

  const { MapContainer, TileLayer } = reactLeaflet;

  return (
    <MapContainer
      center={[59.12183, 11.381]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker reactLeaflet={reactLeaflet} />
    </MapContainer>
  );
}
