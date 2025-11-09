import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { postUserData } from "@/types/user"

const userController = singletonMaster.userController

export const usersRoutes = [
    route("users", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
        if (method === "get") {
            const result = await userController.listUsers()
            return result
        }
        if (method === "post") {
            const data: postUserData = await ctx.request.json()
            const result = await userController.createUser(data)
            return result
        }
        return new Response(null, { status: 405 })
    })
]