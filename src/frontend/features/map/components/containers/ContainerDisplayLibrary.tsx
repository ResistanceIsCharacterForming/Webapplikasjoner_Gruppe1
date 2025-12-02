"use client"
import { useGetLibrary } from "@/backend/features/shared/utils/universal/useGetLibrary";
import { useGetReviewsFromLibraries } from "@/backend/features/shared/utils/universal/useGetReviewsFromLibraries";
import { library } from "@/backend/types/library";
import PresenterDisplayLibrary from "@/frontend/features/map/components/presenters/PresenterDisplayLibrary"
import { useEffect, useState } from "react";

interface ContainerDisplayLibraryProps {
  libraryId: string
  userId: string | undefined
}

export default function ContainerDisplayLibrary({libraryId, userId}: ContainerDisplayLibraryProps) {

    const [libraries, setLibraries] = useState<{ img: string, data: library }>()

    const [reviewComponents, setReviewComponents] = useState<[]>()

    const getLibrary = async () => {
        const result = await useGetLibrary(libraryId)
        if (result.data) setLibraries(result.data)
    }

    const getReviewsAndEndorsment = async () => {
        const result = await useGetReviewsFromLibraries(libraryId, userId)
        if (result) setReviewComponents(result)
    }

    useEffect(() => {
            getLibrary()
            getReviewsAndEndorsment()

            console.log(reviewComponents)
        }, [])
    
    return <>{libraries ? <PresenterDisplayLibrary libraryImg={libraries?.img} libraryData={libraries?.data} /> : null}</>
}