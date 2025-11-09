import { route } from "rwsdk/router"

import { singletonMaster } from "@/utils/singletonBuilder"

export const tokensRoutes = [
    route("tokens", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        if (method === "get") {
            const data: any = await ctx.request.json()
            console.log(data)
            /*const result = await singletonMaster.tokensController.verifyToken(data)
            return result*/
        }
        if (method === "post") {
            const data: any = await ctx.request.json()
            const result = await singletonMaster.tokensController.handleLogin(data)
            return result
        }
        return new Response(null, { status: 405 })
   })
]