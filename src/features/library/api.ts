import { prefix, route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { filterQueryParams } from "@/utils/queryParamsHandler"

export const libraryApi = async ({ctx, resource}) => {

    const libraryController = singletonMaster.libraryController

    if (resource === "library") {

        /* Attempt to get values from id and review params if they exist. */
        const [ id, review ] = filterQueryParams(ctx, ["id", "review"]) as [string, string]
        
        switch (ctx.request.method) {

            case "GET":
                if (id !== undefined) {
                    return libraryController.getBookshelfById(id)
                }

                return libraryController.listBookshelves()

            case "POST":
                if (id !== undefined && review !== undefined) {
                    return libraryController.createReview({})
                }

                if (id !== undefined) {
                    return libraryController.createBookshelf({})
                }

            case "PUT":
                if (id !== undefined && review !== undefined) {
                    return libraryController.editReview(id)
                }

                if (id !== undefined) {
                    return libraryController.editBookshelf(id)
                }

            default:
                return new Response("Method not allowed.", {status: 405})

        }
        
    }

}