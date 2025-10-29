import { singletonMaster } from "@/utils/singletonBuilder"

export const reviewApi = async (ctx: any) => {

    const reviewController = singletonMaster.reviewController

    const action: string = ctx.params.action
    const reviewId: string = ctx.params.$0

    switch (ctx.request.method.toLowerCase()) {
        case "get":
            if (action === "fetch") {
                if (reviewId !== "all") {
                    return reviewController.getReviewById(reviewId)
                }
                return reviewController.listReviews()
            }
        case "post":
            if (action === "create") {
                try {
                    const data = await ctx.request.json()
                    const reviewText: string | undefined = data.reviewText
                    if (reviewText !== undefined) {
                        return reviewController.createReview(
                            reviewId,
                            reviewText
                        )
                    }
                    return new Response("Bad Request.", {status: 400})
                } catch {
                    return new Response("Bad Request.", {status: 404})
                }
            }
        case "put":
            if (action === "edit") {
                try {
                    const data = await ctx.request.json()
                    const reviewText: string | undefined = data.reviewText
                    if (reviewText !== undefined) {
                        return reviewController.editReview(reviewId, reviewText)
                    }
                    
                } catch {
                    return new Response("Bad Request.", {status: 404})
                }
            }
            if (action === "delete") {
                return reviewController.deleteReview(reviewId)
            }
    }
}