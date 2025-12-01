import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { filterQueryParam } from "@/utils/queryParamsHandler.ts"

const libraryController = singletonMaster.libraryController

import { loadSearchParams } from "@/utils/searchParams"

export const librariesRoutes = [
    route("libraries", [
        async (ctx) => {

            const { test } = loadSearchParams(ctx.request.url)

            console.log(test)

              //add alle kan bruke 
            const method = ctx.request.method.toLowerCase()
            if (method === "get") {
                const lat = Number(filterQueryParam(ctx, "lat"))
                const long = Number(filterQueryParam(ctx, "long"))
                if (lat && long) return await libraryController.listLibraryWithCords(lat,long)
                else return await libraryController.listLibraries()
            }
        },
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "post") {
                //add type to form here
                const data: any = await ctx.request.formData()
                const result = await libraryController.createLibrary(data)
                return result
            }
    },
    ]),
    route("libraries/:id", [
        async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        const id = ctx.params?.id ?? undefined
        if (id === undefined) return new Response("No Id", {status: 401})
        if (method === "get") {
           return libraryController.getLibraryById(id)
        }
        if (method === "post") {
           const data: any = await ctx.request.formData()
           const result = await libraryController.createLibrary(data)
           return result
        }
        return new Response(null, { status: 405 })
    },
    async(ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
             if (method === "put") {
                //add type to form here
                const data: any = await ctx.request.formData()
                const result = await libraryController.editLibrary(id,data)
                return result
            }
    },
    async(ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
             if (method === "delete") {
                const result = await libraryController.deleteLibrary(id)
                return result
            }
    },
    

]),
]
