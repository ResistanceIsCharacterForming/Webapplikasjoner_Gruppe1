"use client"

import { postLibraryData } from "@/backend/types/library"
import { useState } from "react"
import { formDataFields } from "../containers/ContainerCreateLibrary"

interface ContainerCreateLibraryProps {
    formData: formDataFields
    onChangeAction: (field: string, value: string) => void
    onSubmitAction: () => void
}


export default function PresenterCreateLibrary({formData, onChangeAction, onSubmitAction}: ContainerCreateLibraryProps) {

    return (
        <article className="flex flex-wrap py-2 px-2">
            <h2 className="font-prata text-xl">Legg til bokkrok</h2>
             <section className="basis-full">
                <form onSubmit={e => {
                    e.preventDefault()
                    onSubmitAction()
                }}>
                    
                <input
                    type="text"
                    value={formData.name}
                    placeholder="Name"
                    onChange={e => onChangeAction("name", e.target.value)}
                />

                <input
                    type="text"
                    value={formData.books}
                    placeholder="Books"
                    onChange={e => onChangeAction("books", e.target.value)}
                />

                <input
                    type="file"
                    placeholder="Photo"
                    onChange={e => onChangeAction("file", e.target.value)}
                />

                <input type="submit" value="Lag ny bokkrok"/>
                </form>
             </section>
        </article>
    )
}