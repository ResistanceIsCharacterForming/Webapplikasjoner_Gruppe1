import { singletonMaster } from "@/utils/singletonBuilder"

export const userApi = async (ctx: any) => {

    const userController = singletonMaster.userController
    const userId: string = ctx.params.id

    switch (ctx.request.method.toLowerCase()) {

        case "get":

            if (userId !== "") {
                return userController.getUserById(userId)
            }
            return userController.listUsers()

        case "post":

            if (userId !== "") {
                try {
                    const data = await ctx.request.json()
                    const userName: string | undefined = data.userName
                    const userEmail: string | undefined = data.userEmail
                    const userPassword: string | undefined = data.userPassword
                    if (userName !== undefined && userEmail !== undefined && userPassword !== undefined) {
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
            }

        case "put":

            if (userId !== "") {
                try {
                    const data = await ctx.request.json()
                    const userName: string | undefined = data.userName
                    const userEmail: string | undefined = data.userEmail
                    if (userName !== undefined && userEmail !== undefined) {
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
            }

        default:
            return new Response("Method not allowed.", {status: 405})

    }
}