import { isAdmin } from "@/middleware/authHandler"
import { singletonMaster } from "@/utils/singletonBuilder"
import { route } from "rwsdk/router"

const reviewController = singletonMaster.reviewController

export const reviewsRoutes = [
    route("reviews", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "post") {
                try {
                    const data: any = await ctx.request.formData()
                    const result = await reviewController.createReview(data)
                    return result
                } catch (error) {
                    new Response(JSON.stringify({success: false,error:"400 check formdata"}),
                    {status: 400, headers: {"Content-Type": "application/json"}})
                }
            }
        },
        async (ctx) => {
            //alle skal kunne 
            const method = ctx.request.method.toLowerCase()
            if (method === "get") {
                const result = await reviewController.listReviews()
                return result
            }
        }
    ]),
     route("reviews/:id", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const id = ctx.params?.id ?? undefined
                const result = await reviewController.getReviewById(id)
                return result
            }
        },
          async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "put") {
                try {
                    const data: any = await ctx.request.formData()
                    const id = ctx.params?.id ?? undefined
                    const result = await reviewController.editReview(id,data)
                    return result
                } catch (error) {
                    new Response(JSON.stringify({success: false,error:"400 check formdata"}),
                    {status: 400, headers: {"Content-Type": "application/json"}})
                }
            }
        },
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            if (method === "delete") {
                const id = ctx.params?.id ?? undefined
                const result = await reviewController.deleteReview(id)
                return result
            }
        }
    ]),
    route("reviews/:id/endorsements", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                //add type to form here
                const id = ctx.params?.id ?? undefined
                const result =await reviewController.getEndorsmentByReviewId(id)
                return result
            }
        },
    ]),
    // ask on how to form this route as unsure best practis on this one as need userid and reviewid?
    route("endorsements", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const result = await reviewController.getEndorsments()
                return result
            }
        },
           async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "post") {
                try {
                    const data: any = await ctx.request.formData()
                    const result =await reviewController.createEndorsment(data)
                    return result 
                } catch (error) {
                    new Response(JSON.stringify({success: false,error:"400 check formdata"}),
                    {status: 400, headers: {"Content-Type": "application/json"}})
                }
            }
        }
    ]),
     route("endorsements/:id", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const id = ctx.params?.id ?? undefined
                const result = await reviewController.getEndorsmentById(id)
                return result
            }
        },
        async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "put") {
                try {
                    const id = ctx.params?.id ?? undefined
                    const data: any = await ctx.request.formData()
                    const result = await reviewController.editEndorsment(id,data)
                    return result
                } catch (error) {
                    new Response(JSON.stringify({success: false,error:"400 check formdata"}),
                    {status: 400, headers: {"Content-Type": "application/json"}})
                }
            }
        },
        async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "delete") {
                const id = ctx.params?.id ?? undefined
                const result = await reviewController.deleteEndorsment(id)
            }
        },
    ]),
    




]