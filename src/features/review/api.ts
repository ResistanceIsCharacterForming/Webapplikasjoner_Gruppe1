import { singletonMaster } from "@/utils/singletonBuilder"

export const reviewApi = async (ctx: any) => {

    const reviewController = singletonMaster.reviewController

    const reviewId: string = ctx.params.id

    switch (ctx.request.method.toLowerCase()) {
        case "get":
            if (reviewId !== "") {
                return reviewController.getReviewById(reviewId)
            }
            return reviewController.listReviews()

        case "post":
            if (reviewId !== "") {
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
            if (reviewId !== "") {
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
        
        case "delete":
            if (reviewId !== "") {
                return reviewController.deleteReview(reviewId)
            }
    }
}