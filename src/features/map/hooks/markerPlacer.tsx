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
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
