"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function isClient() {
  return typeof window !== "undefined";
}

export function MapGenerator() {
  const [leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {
    if (!isClient()) return;

    import("react-leaflet").then((module) => {
      setLeaflet(module);
    });
  }, []);

  if (!leaflet) {
    return <div>Loading map...</div>;
  }

  const { MapContainer, TileLayer, Marker, Popup } = leaflet;

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
      <Marker position={[59.12183, 11.381]}>
        <Popup>
          Halden. <br /> Temporary example.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
