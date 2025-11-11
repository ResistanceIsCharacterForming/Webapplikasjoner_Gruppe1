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
            const formdata  = await ctx.request.formData()
            const dataObject: postUserData = Object.fromEntries(formdata.entries()) as unknown as postUserData;
            if( dataObject.password && dataObject.email && dataObject.name && dataObject.image ){
                const result = await userController.createUser(dataObject)
                return result
            }
            return new Response("missing fields", { status: 405 })
        }
        return new Response(null, { status: 405 })
    }),
    route("users/:id", async (ctx) => {
        const method = ctx.request.method.toLowerCase()
         const id = ctx.params?.id ?? undefined
        if (method === "get") {
            const result = await userController.getUserById(id)
            return result
        }
        if (method ==="put"){

        }
        if (method ==="delete"){
            console.log(id)
            const result = await userController.deleteUser(id)
            return result
        }
    })
]