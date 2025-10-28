import { LatLng, LocationEvent } from "leaflet";
import { useState } from "react";

export function LocationMarker({ reactLeaflet }: { reactLeaflet: any }) {
  const { Marker, Popup, useMapEvents } = reactLeaflet;

  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: LocationEvent) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    moveend() {
      const { lat, lng } = map.getCenter();
      const url = new URL(window.location.href);
      url.searchParams.set("lat", lat.toFixed(5));
      url.searchParams.set("lng", lng.toFixed(5));
      window.history.replaceState({}, "", url);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
