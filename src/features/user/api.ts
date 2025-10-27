import { singletonMaster } from "@/utils/singletonBuilder"

export const userApi = async (ctx: any) => {
    const userController = singletonMaster.userController
    const userId: string | undefined = ctx.params.slugOne
    switch (ctx.request.method.toLowerCase()) {
        case "get":
            if (userId !== undefined) {
                return userController.getUserById(userId)
            }
            return userController.listUsers()
        case "post":
            try {
                const data = await ctx.request.json()
                const userName: string | undefined = data.userName
                const userEmail: string | undefined = data.userEmail
                const userPassword: string | undefined = data.userPassword
                if (userId !== undefined && userName !== undefined && userEmail !== undefined && userPassword !== undefined) {
                     return userController.createUser(
                        userId,
                        userName, 
                        userEmail,
                        userPassword
                    )
                }
                return new Response("Bad Request.", {status: 400})
            } catch {
                return new Response("Bad Request.", {status: 404})
            }
        case "put":
            try {
                const data = await ctx.request.json()
                const userName: string | undefined = data.userName
                const userEmail: string | undefined = data.userEmail
                if (userId !== undefined && userName !== undefined && userEmail !== undefined) {
                     return userController.editUser(
                        userId,
                        userName, 
                        userEmail
                    )
                }
                return new Response("Bad Request.", {status: 400})
            } catch {
                return new Response("Bad Request.", {status: 404})
            }
        default:
            return new Response("Method not allowed.", {status: 405})
    }
}