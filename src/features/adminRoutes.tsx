import { prefix, route } from "rwsdk/router"

import { isAuthorized } from "./isAuthorized"

export const adminRoutes = prefix("/admin", [
    isAuthorized,
    route("/:elementType", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        const type = ctx.params.elementType

        if (method === "get") {
        return new Response(
            JSON.stringify({
                data: `elementType ${type}`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            }
            )
        } 
    }),
    route("/:elementType/:elementId", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        const id = ctx.params.elementId

        switch(method) { 
            case "get":
            return new Response(
                JSON.stringify({
                data: `elementId ${id}`,
                success: true
                }),
                {
                status: 201,
                headers: {"Content-Type": "application/json"}
                }
            )
        case "post":
            return
        case "put":
            return
        default:
            return new Response("Method not allowed.", {status: 405})
        }
    })
])