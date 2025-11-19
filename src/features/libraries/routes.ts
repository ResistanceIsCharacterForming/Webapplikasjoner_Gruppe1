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
                try {
                    const data: any = await ctx.request.formData()
                    const result = await libraryController.createLibrary(data)
                    return result
                } catch (error) {
                    new Response(JSON.stringify({success: false,error:"400 check formdata"}),
                    {status: 400, headers: {"Content-Type": "application/json"}})
                }
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
    },
    async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "put") {
               try {
                 const id = ctx.params?.id ?? undefined
                 const data: any = await ctx.request.formData()
                 const result = await libraryController.editLibrary(id,data)
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
                const result = await libraryController.deleteLibrary(id)
                return result
            }
    },
    

]),
]
