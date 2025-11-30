import { reviewService } from "@/types/reviews"

export function createReviewController(reviewService: reviewService) {
    return {
        async listReviews() {
            const result = await reviewService.getReviews()
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getReviewById(id: number): Promise<Response> {
            const result = await reviewService.getReviewById(id)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async editReview(id: number, data: any) {
            const result = await reviewService.editReview(id, data)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async createReview(data: any) {
            const result = await reviewService.createReview(data)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteReview(id: number) {
            const result = await reviewService.deleteReviewById(id)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getEndorsementByReviewId(id: number) {
            const result = await reviewService.getReviewEndorsementByReviewId(id)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getEndorsementById(id: number) {
            const result = await reviewService.getReviewEndorsementById(id)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getEndorsementByUserId(id: string) {
            const result = await reviewService.getReviewByUserId(id)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteEndorsement(id: number) {
            const result = await reviewService.deleteReviewEndorsementById(id)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async getEndorsements() {
            const result = await reviewService.getReviewsEndorsements()
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async createEndorsement(data: any) {
            const result = await reviewService.createReviewEndorsement(data)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async editEndorsement(id: number, data: any) {
            const result = await reviewService.editReviewEndorsement(id, data)
            if (result.success === true) {

                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        }
    }
}