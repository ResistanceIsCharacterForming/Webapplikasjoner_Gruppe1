"use client"

import { getLibrary } from "@/backend/features/shared/utils/universal/library/getLibrary";
import { getReviewsFromLibraries } from "@/backend/features/shared/utils/universal/review/getReviewsFromLibraries";
import { library } from "@/backend/types/library";
import { reviewComponentData } from "@/backend/types/reviews";
import PresenterDisplayLibrary from "@/frontend/features/map/components/presenters/PresenterDisplayLibrary"
import { useEffect, useState } from "react";

interface ContainerDisplayLibraryProps {
    libraryId: string
    userId: string | undefined
}

export default function ContainerDisplayLibrary({ libraryId, userId }: ContainerDisplayLibraryProps) {

    const [libraries, setLibraries] = useState<{ img: string, data: library }>()

    const [reviewComponents, setReviewComponents] = useState<reviewComponentData[]>()

    const getLibrarydata = async () => {
        const result = await getLibrary(libraryId)
        if (result.data) setLibraries(result.data)
    }

    const getReviewsAndEndorsment = async () => {
        const result = await getReviewsFromLibraries(libraryId, userId)
        if (result) setReviewComponents(result)
    }

    useEffect(() => {
        getLibrarydata()
        getReviewsAndEndorsment()
    }, [])

    return <>{libraries ? <PresenterDisplayLibrary libraryImg={libraries?.img} libraryData={libraries?.data} reviewComponents={reviewComponents} /> : null}</>
}