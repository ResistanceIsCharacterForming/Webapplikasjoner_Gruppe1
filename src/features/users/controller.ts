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
        async createUser(data: postUserData) {
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
          async getfavoritLibrariesFromUser(id:string) {
             const result = await userService.getfavoritLibrariesByUserId(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async deletefavoritLibrariesByUser(id: string) {
             const result = await userService.deletefavoritLibrariesByUser(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async createfavoritLibrary(userid: string,libaryid:string) {
             const result = await userService.createfavoritLibrary(userid,libaryid)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async editfavoritLibrary(id: string,data:any) {
             const result = await userService.editfavoritLibrary(id,data)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async getfavoritLibraries() {
             const result = await userService.getfavoritLibraries()
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async deletefavoritLibrary(id: string) {
             const result = await userService.deletefavoritLibraryById(id)
             return new Response(
                JSON.stringify({
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
          async getfavoritLibrary(id: string) {
             const result = await userService.getfavoritLibraryById(id)
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