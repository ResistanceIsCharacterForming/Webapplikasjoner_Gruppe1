import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { postUserData } from "@/types/user"
import { isAdmin } from "@/middleware/authHandler"

const userController = singletonMaster.userController

export const usersRoutes = [
    route("users", [isAdmin,
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            if (method === "get") {
                const result = await userController.listUsers()
                return result
            }
        },
        async(ctx) => {
            const data: postUserData = await ctx.request.json()
            const method = ctx.request.method.toLowerCase()
            if (method === "post") {
                const result = await userController.createUser(data)
                return result
            }
        }
    ])
]
