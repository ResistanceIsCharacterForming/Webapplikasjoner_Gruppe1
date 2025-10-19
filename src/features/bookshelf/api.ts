import { prefix, route } from "rwsdk/router"
import { bookshelfController } from "./controller"
import { filterQueryParams } from "@/helpers/queryParamsHandler"

export const bookshelfApi = async ({ctx, resource}) => {

    if (resource === "bookshelf") {

        /* Attempt to get values from id and review params if they exist. */
        const [ id, review ] = filterQueryParams(ctx, ["id", "review"]) as [string, string]
        
        switch (ctx.request.method) {

            case "GET":
                if (id !== undefined) {
                    return bookshelfController.getBookshelfById(id)
                }

                return bookshelfController.listBookshelves()

            case "POST":
                if (id !== undefined && review !== undefined) {
                    return bookshelfController.createReview({})
                }

                if (id !== undefined) {
                    return bookshelfController.createBookshelf({})
                }

            case "PUT":
                if (id !== undefined && review !== undefined) {
                    return bookshelfController.editReview(id)
                }

                if (id !== undefined) {
                    return bookshelfController.editBookshelf(id)
                }

            default:
                return new Response("Method not allowed.", {status: 405})

        }
        
    }

}