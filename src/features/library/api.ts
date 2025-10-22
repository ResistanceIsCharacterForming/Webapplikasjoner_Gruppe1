import { prefix, route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { filterQueryParams } from "@/utils/queryParamsHandler"

import { apiFeature } from "@/types/api"

export const libraryApi = async ({ctx, resource}: apiFeature) => {

    const libraryController = singletonMaster.libraryController

    if (resource === "library") {

        /* Attempt to get values from id and review params if they exist. */
        const [ 
            libraryId,
            reviewId,
            libraryText,
            reviewText,
            libraryName,
            libraryBooks
        ] = filterQueryParams(
            ctx, [
            "libraryId",
            "reviewId",
            "libraryText",
            "reviewText",
            "libraryName",
            "libraryBooks"
        ]) as [
            string,
            string,
            string,
            string,
            string,
            string
        ]
        
        switch (ctx.request.method) {

            case "GET":
                if (libraryId !== undefined) {
                    return libraryController.getLibraryById(libraryId)
                }

                return libraryController.listLibraries()

            case "POST":
                console.log(libraryId)
                console.log(reviewId)
                console.log(reviewText)
                if (libraryId !== undefined && reviewId !== undefined && reviewText !== undefined) {
                    return libraryController.createReview(libraryId, reviewId, reviewText)
                }

                if (libraryId !== undefined && libraryText !== undefined && libraryBooks !== undefined && libraryName !== undefined) {
                    return libraryController.createLibrary(libraryId, libraryText, libraryBooks, libraryName)
                }

            case "PUT":
                if (reviewId !== undefined && reviewText !== undefined) {
                    return libraryController.editReview(reviewId, reviewText)
                }

                if (libraryId !== undefined && libraryText !== undefined && libraryBooks !== undefined) {
                    return libraryController.editLibrary(libraryId, libraryText, libraryBooks)
                }

            default:
                return new Response("Method not allowed.", {status: 405})

        }
        
    }

}