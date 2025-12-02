"use client"

import { createLibrary } from "@/backend/features/shared/utils/universal/library/createLibrary"
import { library, postLibraryData } from "@/backend/types/library"
import PresenterCreateLibrary from "@/frontend/features/map/components/presenters/PresenterCreateLibrary"

import { ContainerChildrenProp } from "@/frontend/types/container"
import { useQueryState } from "nuqs"
import { useState } from "react"

interface ContainerCreateLibraryProps {
    cords: string
    userId: string
}

export interface formDataFields {
  userId: string
  text: string
  name: string
  cordlat: string
  cordlon: string
  books: string
  file: FileList |null
}

export default function ContainerCreateLibrary({cords, userId}: ContainerCreateLibraryProps) {
    const [libraryID, setLibraryID] = useQueryState("bokkrok")

    const [formData, setFormData] = useState<formDataFields>({
        userId: userId,
        text: "",
        name: "",
        cordlat: cords.split(",")[0],
        cordlon: cords.split(",")[1],
        books: "",
        file: null
    })

    const onSubmitAction = async () => {
        const form = new FormData

        form.append("userId", formData.userId)
        form.append("text", formData.text)
        form.append("name", formData.name)
        form.append("cordlat", formData.cordlat)
        form.append("cordlon", formData.cordlon)
        form.append("books", formData.books)
        if(formData.file)form.append("file", formData.file[0])

        const result = await createLibrary(form)

        setLibraryID(null)
    }

    const onChangeAction = (field: string, value: string|any) => {
        const key = field as keyof formDataFields
        setFormData(prev => ({ ...prev, [key]: value }))
    }
    const onFileAction=(file:any)  => {
        setFormData(prev => ({ ...prev, file: file }))
    }

    return <><PresenterCreateLibrary formData={formData} onFileAction={onFileAction} onChangeAction={onChangeAction} onSubmitAction={onSubmitAction}/></>
}