import {
  Map,
  Control,
  DomUtil,
} from "leaflet"
import { useEffect } from "react";
import {renderToStaticMarkup} from "react-dom/server"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faLocationPin } from "@fortawesome/free-solid-svg-icons"

export function MapControls({ reactLeaflet }: { reactLeaflet: any }) {
    const { useMap } = reactLeaflet
    const currentMap: Map = useMap();

    useEffect(() => {
        const locateControl = Control.extend({
            onAdd: function(map: Map) {
                const container: HTMLDivElement = DomUtil.create(
                    "div",
                    "leaflet-control-zoom leaflet-bar leaflet-control")

                const button: HTMLAnchorElement = DomUtil.create("a")
            
                const iconHTML = renderToStaticMarkup(
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                )

                button.innerHTML = iconHTML
                button.title = "Go to my location"
                button.role = "button"

                Object.assign(container.style, style)

                button.onclick = () => {
                    map.locate({ enableHighAccuracy: true })
                }

                container.appendChild(button)
                return container
            }
        })

        const addLibraryControl = Control.extend({
            onAdd: function(map: Map) {
                const container: HTMLDivElement = DomUtil.create(
                    "div",
                    "leaflet-control-zoom leaflet-bar leaflet-control")

                const button: HTMLAnchorElement = DomUtil.create("a")
            
                const iconHTML = renderToStaticMarkup(
                    <FontAwesomeIcon icon={faPenToSquare} />
                )

                button.innerHTML = iconHTML
                button.title = "Add library"
                button.role = "button"

                Object.assign(container.style, style)

                

                container.appendChild(button)
                return container
            }
        })
    
        const locateControlButton = new locateControl({ position: "topleft" })
        const addLibraryControlButton = new addLibraryControl({ position: "topleft" })
        currentMap.addControl(locateControlButton)
        currentMap.addControl(addLibraryControlButton)

        return () => {
            currentMap.removeControl(locateControlButton)
            currentMap.removeControl(addLibraryControlButton)
        }
    })
    
    return null
}

const style = document.createElement("style");
style.innerHTML = `
  .leaflet-control svg {
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }
`;
document.head.appendChild(style);