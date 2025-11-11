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
        async editUser(id: string, name: string, email: string) {
             return new Response(
                JSON.stringify({
                data: `editUser ${id} ${name} ${email}`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
    }
}