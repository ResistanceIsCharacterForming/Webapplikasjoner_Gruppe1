import { singletonMaster } from "@/utils/singletonBuilder"

export const libraryApi = async (ctx: any) => {
    const libraryController = singletonMaster.libraryController
    const libraryId: string | undefined = ctx.params.slugOne
    const reviewId: string | undefined = ctx.params.slugTwo
    switch (ctx.request.method.toLowerCase()) {
        case "get":
            console.log(ctx.request.headers.get("content-type"))
            if (libraryId !== undefined) {
                return libraryController.getLibraryById(libraryId)
            }
            return libraryController.listLibraries()
        case "post":
            try {
                const data = await ctx.request.json()
                const libraryText: string | undefined = data.libraryText
                const libraryBooks: string | undefined = data.libraryBooks
                const libraryName: string | undefined = data.libraryBooks
                const reviewText: string | undefined = data.reviewText
                if (libraryId !== undefined && reviewId !== undefined && reviewText !== undefined) {
                    return libraryController.createReview(
                        libraryId,
                        reviewId, 
                        data.reviewText
                    )
                }
                if (libraryId !== undefined && libraryText !== undefined && libraryBooks !== undefined && libraryName !== undefined) {
                    return libraryController.createLibrary(
                        libraryId,
                        libraryText,
                        libraryBooks,
                        libraryName
                    )
                }
                return new Response("Bad Request.", {status: 400})
            } catch {
                return new Response("Bad Request.", {status: 404})
            }
        case "put":
            try {
                const data = await ctx.request.json()
                const libraryText: string | undefined= data.libraryText
                const libraryBooks: string | undefined = data.libraryBooks
                const reviewText: string | undefined = data.reviewText
                if (libraryId !== undefined && libraryText !== undefined && libraryBooks !== undefined) {
                    return libraryController.editLibrary(libraryId, libraryText, libraryBooks)
                }
                if (libraryId !== undefined && reviewId !== undefined && reviewText !== undefined) {
                    return libraryController.editReview(reviewId, reviewText)
                }
                if (libraryId !== undefined && reviewId !== undefined) {
                    return libraryController.deleteReview(reviewId)
                }
                if (libraryId !== undefined) {
                    return libraryController.deleteLibrary(libraryId)
                }
             } catch {
                return new Response("Bad Request.", {status: 404})
            }
        default:
            return new Response("Method not allowed.", {status: 405})
    }
}