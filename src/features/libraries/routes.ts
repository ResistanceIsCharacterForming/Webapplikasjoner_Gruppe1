import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { postLibraryData } from "@/types/library"

const libraryController = singletonMaster.libraryController

export const librariesRoutes = [
    route("libraries", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        if (method === "get") {
            return libraryController.listLibraries()
        }
        return new Response(null, { status: 405 })
    }),
    route("libraries/:id", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        /*console.log(ctx.params?.id)*/
        const id = ctx.params?.id ?? undefined
        if (id && method === "get") {
           return libraryController.getLibraryById(id)
        }
        if (id && method === "post") {
           const data: postLibraryData = await ctx.request.json()
           const result = await libraryController.createLibrary(data)
           return result
        }
        return new Response(null, { status: 405 })
    })/*
    route("libraries?cords=:cordOne;:cordTwo", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        if (ctx.params && method === "get") {
            return libraryController.listLibraryWithCords({cordOne: ctx.params.cordOne, cordTwo: ctx.params.cordTwo})
        }
    })*/
]