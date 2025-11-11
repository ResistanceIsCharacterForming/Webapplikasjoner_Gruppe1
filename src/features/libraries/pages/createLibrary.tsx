import { library } from "@/types/library"
import { useState } from "react"
import { AddLibrary } from "../hooks/markerPlacer"
import { LatLng, Map } from "leaflet"

interface CreateLibraryProps {
    reactLeaflet: any
    onClose: () => void
    coordinate: LatLng | null
}

export function CreateLibrary({reactLeaflet, onClose, coordinate}: CreateLibraryProps) {
    const {useMap} = reactLeaflet
    const map: Map = useMap()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [books, setBooks] = useState("")

    if (!coordinate) return null

    async function handleSumbit(e: React.FormEvent) {
        e.preventDefault()
        if (!coordinate) return null
        AddLibrary(name, description, coordinate, books)
        if (map.getZoom() < 14) map.setZoom(14)
        onClose()
    }

    return (
        <div style={{
          position: "fixed",
          margin: "auto",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
          width: "50%",
          height: "50%",
        }}>
            <form onSubmit={handleSumbit} style={{display: "flex", flexDirection: "column", height: "100%"}}>
                <h3 style={{ marginBottom: "8px" }}>Add Library</h3>
                <div style={{ marginBottom: "8px" }}>
                    <label>Name</label>
                    <input
                        style={{ width: "100%", background: "#ecececff" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <label>Description</label>
                    <textarea
                        style={{ resize: "none", width: "100%", background: "#ecececff" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "8px" }}>
                    <label>Books</label>
                    <textarea
                        style={{ resize: "none", width: "100%", background: "#ecececff" }}
                        value={books}
                        onChange={(e) => setBooks(e.target.value)}
                    />
                </div>
                {coordinate && (
                    <p style={{ resize: "none", fontSize: "12px", color: "#444" }}>
                        Lat: {coordinate.lat.toFixed(4)} | Lon: {coordinate.lng.toFixed(4)}
                    </p>
                )}
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-around" }}>
                    <button style={{color: "#3792e1ff"}} type="submit">Add</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    )
}