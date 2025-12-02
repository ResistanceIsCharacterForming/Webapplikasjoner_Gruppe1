"use client"

import { useCreateLibrary } from "@/backend/features/shared/utils/universal/library/useCreateLibrary"
import { library, postLibraryData } from "@/backend/types/library"
import PresenterCreateLibrary from "@/frontend/features/map/components/presenters/PresenterCreateLibrary"

import { ContainerChildrenProp } from "@/frontend/types/container"
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
  file: File | string
}

export default function ContainerCreateLibrary({cords, userId}: ContainerCreateLibraryProps) {

    const [formData, setFormData] = useState<formDataFields>({
        userId: userId,
        text: "",
        name: "",
        cordlat: cords.split(",")[0],
        cordlon: cords.split(",")[1],
        books: "",
        file: ""
    })

    const onSubmitAction = async () => {
        console.log(formData)

        const form = new FormData

        form.append("userId", formData.userId)
        form.append("text", formData.text)
        form.append("name", formData.name)
        form.append("cordlat", formData.cordlat)
        form.append("cordlon", formData.cordlon)
        form.append("books", formData.books)
        form.append("file", formData.file)

        const result = await useCreateLibrary(form)

        console.log(result)
    }

    const onChangeAction = (field: string, value: string) => {
        const key = field as keyof formDataFields
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    return <><PresenterCreateLibrary formData={formData} onChangeAction={onChangeAction} onSubmitAction={onSubmitAction}/></>
}