export function createUserController (userService: any) {
    return {
         async listUsers() { 
            return new Response(
                JSON.stringify({
                data: `listUsers` /* Kall til libraryService.listBookshelves() eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getUserById(id: string) { 
            return new Response(
                JSON.stringify({
                data: `getUserById ${id}` /* Kall til libraryService.listBookshelves() eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createUser(id: string, name: string, email: string, password: string) {
             return new Response(
                JSON.stringify({
                data: `createUser ${id} ${name} ${email} ${password}`,
                success: true
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