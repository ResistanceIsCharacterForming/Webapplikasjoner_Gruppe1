import { isAdmin } from "@/middleware/authHandler"
import { singletonMaster } from "@/utils/singletonBuilder"
import { route } from "rwsdk/router"

const reportController = singletonMaster.reportController

export const reportsRoutes = [
 
    route("reports", [
        async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const result = await reportController.listReports()
                return result
            }
        },
        async (ctx) => {
            //trenger ikke admin på post
            const method = ctx.request.method.toLowerCase()
            if (method === "post") {
                const data: any = await ctx.request.formData()
                const result = reportController.postReport(data)
                return result
                try {
                    const data: any = await ctx.request.formData()
                    const result = reportController.postReport(data)
                    return result
                } catch (error) {
                  return new Response("No formdata", {status: 401})  
                }
            }
        }
    ]),
       route("reports/:id", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
             if (method === "get") {
                const result = await reportController.getReportById(id)
                return result
            }
        },
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "put") {
                //add type to json here
                try {
                    const data: any = await ctx.request.formData()
                    const result = reportController.editReport(id,data)
                    return result
                } catch (error) {
                    return new Response("No formdata", {status: 401})
                }
        },
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "delete") {
                const result = reportController.deleteReport(id)
                return result
            }
        }
    ]),
     route("reports/levels/:level", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const level = ctx.params?.level ?? undefined
                const result = reportController.listReportsByLevel(level)
                return result
            }
        },
    ]),
     route("reports/types/:type", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const type = ctx.params?.type ?? undefined
                const result = reportController.listReportsByType(type)
                return result
            }
        },
    ]),
    // ?level=:level&type=:type
    route("reports/types/:type/level/:level", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "get") {
                const level = ctx.params?.level ?? undefined
                const type = ctx.params?.type ?? undefined
                const result = reportController.listReportsByTypeAndLevel(type,level)
                return result
            }
        },
    ]),


]

// const id = ctx.params?.id ?? undefined