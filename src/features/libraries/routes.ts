import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { postLibraryData } from "@/types/library"

const libraryController = singletonMaster.libraryController

export const librariesRoutes = [
    route("libraries",[ 
        async (ctx) => {
              //add alle kan bruke 
            const method = ctx.request.method.toLowerCase()
            if (method === "get") {
                return libraryController.listLibraries()
            }
    },
     async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "post") {
                //add type to form here
                const data: any = await ctx.request.formData()
                const result = await libraryController.createLibrary(data)
                return result
            }
    },
    ]),
    route("libraries/:lat/:long", [
        async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        if (method === "get") {
            const lat =ctx.params?.lat ?? undefined
            const long = ctx.params?.long ?? undefined
            const result = await libraryController.listLibraryWithCords(lat,long)
            return result
        }
    }]),
    route("libraries/:id", [
        async (ctx) => {
        const method = ctx.request.method.toLowerCase()
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
    },
    async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "put") {
                const id = ctx.params?.id ?? undefined
                //add type to form here
                const data: any = await ctx.request.formData()
                const result = await libraryController.editLibrary(id,data)
                return result
            }
    },
    async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "delete") {
                const id = ctx.params?.id ?? undefined
                const result = await libraryController.deleteLibrary(id)
                return result
            }
    },
    

]),
]
