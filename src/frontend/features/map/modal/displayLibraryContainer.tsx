"use client"

import { useGetLibrary } from "@/backend/features/shared/utils/universal/library/useGetLibrary"
import { useGetReviewsFromLibraries } from "@/backend/features/shared/utils/universal/review/useGetReviewsFromLibraries"
import { library } from "@/backend/types/library"
import { reviewComponentData } from "@/backend/types/reviews"
import { useEffect, useState } from "react"


export function DisplayLibraryContainer(props: { libraryid: string, userid?: string }) {
    const [libraries, setLibraries] = useState<{ img: string, data: library }>()
    const [reviewComponentData, setReviewComponentData] = useState<reviewComponentData[]>()

    const getLibrary = async () => {
        const result = await useGetLibrary(props.libraryid)
        if (result.data) setLibraries(result.data)
    }
    const getRevwiesAndEndorsment = async () => {
        const result = await useGetReviewsFromLibraries(props.libraryid, props.userid)
        if (result) setReviewComponentData(result)
    }

    useEffect(() => {
        getLibrary()
        getRevwiesAndEndorsment()
    }, [])
    let child = <p>error</p>
    if (libraries) child = <DisplayLibrary libraryimg={libraries?.img} librarydata={libraries?.data} />
    return (
        <>{child}</>
    )

}