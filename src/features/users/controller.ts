import { postUserData } from "@/types/user"

export function createUserController (userService: any) {
    return {
         async listUsers() {
            const result = await userService.listUsers()
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getUserById(id: string) { 
            const result = await userService.getUserById(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createUser(data: any) {
            const result = await userService.createUser(data)
             return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editUser(id: string, data:any) {
             const result = await userService.editUserById(id,data)
             return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        }, 
        async deleteUser(id: string) {
             const result = await userService.deleteUserByid(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async getFavoriteLibrariesFromUser(id:string) {
             const result = await userService.getfavoriteLibrariesByUserId(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async deleteFavoriteLibrariesByUser(id: string) {
             const result = await userService.deletefavoriteLibrariesByUser(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async createFavoriteLibrary(userid: string,libraryid:string) {
             const result = await userService.createfavoriteLibrary(userid,libraryid)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async editFavoriteLibrary(id: string,data:any) {
             const result = await userService.editFavoriteLibrary(id,data)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async getFavoriteLibraries() {
             const result = await userService.getFavoriteLibraries()
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async deleteFavoriteLibrary(id: string) {
             const result = await userService.deleteFavoriteLibraryById(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async getFavoriteLibrary(id: string) {
             const result = await userService.getFavoriteLibraryById(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getAdminById(id: string) { 
            const result = await userService.getAdminById(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createAdmin(id: string,adminLevel:number) { 
            const result = await userService.createAdmin(id,adminLevel)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editAdmin(id: string,adminLevel:number){ 
            const result = await userService.editAdmin(id,adminLevel)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async deleteAdmin(id: string){ 
            const result = await userService.deleteAdmin(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success,
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
    }
}

export const userController = createUserController()