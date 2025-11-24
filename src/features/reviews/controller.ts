import { reviewService } from "@/types/reviews"

export function createReviewController (reviewService: reviewService) {
    return {
        async listReviews() { 
            const result=await reviewService.getReviews()
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getReviewById(id: number): Promise<Response> { 
            const result=await reviewService.getReviewById(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editReview(id: number, data: any) {
            const result=await reviewService.editReview(id,data)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createReview(data:any) {
            const result=await reviewService.createReview(data)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async deleteReview(id: number) {
            const result=await reviewService.deleteReviewById(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async getEndorsementByReviewId(id: number) {
            const result=await reviewService.getReviewEndorsementByReviewId(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async getEndorsementById(id: number) {
            const result=await reviewService.getReviewEndorsementById(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getEndorsementByUserId(id: string) {
            const result=await reviewService.getReviewByUserId(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async deleteEndorsement(id: number) {
            const result=await reviewService.deleteReviewEndorsementById(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getEndorsements() {
            const result=await reviewService.getReviewsEndorsements()
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createEndorsement(data: any) {
            const result=await reviewService.createReviewEndorsement(data)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editEndorsement(id: number,data:any) {
            const result=await reviewService.editReviewEndorsement(id,data)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        }
    }
}