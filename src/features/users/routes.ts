import { route } from "rwsdk/router"
import { singletonMaster } from "@/utils/singletonBuilder"
import { postUserData } from "@/types/user"
import { isAdmin } from "@/middleware/authHandler"


const userController = singletonMaster.userController
const reviewController = singletonMaster.reviewController
const libraryController =singletonMaster.libraryController

export const usersRoutes = [
    route("users", [
         async(ctx) => {
            const method = ctx.request.method.toLowerCase()
             if (method === "post") {
                try {
                    const data: postUserData = await ctx.request.formData()
                    const result = await userController.createUser(data)
                    return result   
                } catch (error) {
                  return new Response("No formdata", {status: 401})
                }
            }
        },
        isAdmin,
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            if (method === "get") {
                const result = await userController.listUsers()
                return result
            }
        }
    ]),
    route("users/:id", [
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "get") {
                const result = await userController.getUserById(id)
                return result
        }},
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "put") {
                 try {
                    const data: any = await ctx.request.formData()
                    const result = await userController.editUser(id,data)
                    return result
                } catch (error) {
                    return new Response("No formdata", {status: 401})
                }
        }},
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "delete"){
                const result = await userController.deleteUser(id)
                return result
        }},
        ]),
    route("users/:id/admin", [
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            if (method === "get") {
                const id = ctx.params?.id ?? undefined
                const result = await userController.getAdminById(id)
                return result
        }},
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            if (method === "delete") {
                const id = ctx.params?.id ?? undefined
                if (id === undefined) return new Response("No Id", {status: 401})
                const result = await userController.deleteAdmin(id)
                return result
        }},
        ]),
    route("users/:id/admin/:level",[
         async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "delete") {
                const result = await userController.deleteAdmin(id)
                return result
        }},
        ]),
    route("users/:id/admin/:level",[
         async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "post") {
                const level= ctx.params?.level ?? undefined
                const result = await userController.createAdmin(id,level)
                return result
        }},
         async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "put") {
                const level= ctx.params?.level ?? undefined
                const result = await userController.editAdmin(id,level)
                return result
        }},
    ]),
    route("users/:id/endorsements",[
        async (ctx) => {
            //add controler for theese
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "get") {
                const result =reviewController.getEndorsementByUserId(id)
                return result
        }},
    ]),
    route("users/:id/libraries",[
        async (ctx) => {
            //add controler for theese
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "get") {
                const result =libraryController.getLibraryByUserId(id)
                return result
        }},
        async (ctx) => {
            //add controler for theese
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "delete") {
                const result =libraryController.deleteLibraryByUserId(id)
                return result
        }},
    ]),
    route("users/:id/favoriteLibraries",[
        async (ctx) => {
            //add controler for theese
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "get") {
                const result =userController.getFavoriteLibrariesFromUser(id)
                return result
        }},
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "delete") {
                const result =userController.deleteFavoriteLibrariesByUser(id)
                return result
        }},
    ]),
    route("users/:id/favoriteLibraries/:libraryid",[
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "post") {
                const libraryid = ctx.params?.libaryid ?? undefined
                const result =userController.createFavoriteLibrary(id,libraryid)
                return result
        }}, 
    ]),
    route("favoriteLibraries",[
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "get") {
                const result = await userController.getFavoriteLibraries()
                return result
        }},
    ]),
    route("favoriteLibraries/:id",[
        async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "get") {
                const result =await userController.getFavoriteLibrary(id)
                return result
        }},
         async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "delete") {
                const result =await userController.deleteFavoriteLibrary(id)
                return result
        }},
         async (ctx) => {
            const method = ctx.request.method.toLowerCase()
            const id = ctx.params?.id ?? undefined
            if (id === undefined) return new Response("No Id", {status: 401})
            if (method === "put") {
               try {
                    const data: any = await ctx.request.formData()
                    const result =await userController.editFavoriteLibrary(id,data)
                    return result
                } catch (error) {
                  return new Response("No formdata", {status: 401})
                }
        }
         },
    ]),
]
