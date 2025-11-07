import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"

const libraryController = singletonMaster.libraryController

export const librariesRoutes = [
    route("/libraries/", async (ctx) => {
        console.log(true)

        const method = ctx.request.method.toLowerCase()
        if (method === "get") {
            return libraryController.listLibraries()
        }
        return new Response(null, { status: 405 })
    }),
    route("/libraries/:id", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        const id = ctx.params?.$0 ?? undefined
        if (id && method === "get") {
           return libraryController.getLibraryById(id)
        }
        return new Response(null, { status: 405 })
    })
]