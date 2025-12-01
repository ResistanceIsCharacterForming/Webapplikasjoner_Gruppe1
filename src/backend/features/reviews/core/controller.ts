import { reviewService } from "@/backend/types/reviews"

export function createReviewController(service: reviewService) {
    return {
        async listReviews() {
            const result = await service.getReviews()
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
            const result = await service.getReviewById(id)
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
            const result = await service.editReview(id, data)
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
            const result = await service.createReview(data)
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
            const result = await service.deleteReviewById(id)
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
            const result = await service.getReviewEndorsementByReviewId(id)
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
            const result = await service.getReviewEndorsementById(id)
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
            const result = await service.getReviewByUserId(id)
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
            const result = await service.deleteReviewEndorsementById(id)
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
            const result = await service.getReviewsEndorsements()
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
            const result = await service.createReviewEndorsement(data)
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
            const result = await service.editReviewEndorsement(id, data)
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