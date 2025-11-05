

export function createUserService(repository: any) {

    return {
         async listUsers() { 
            const result = await repository.getUsers()
            return result
        },
        async getUserById(id: string) { 
            const result = await repository.getUserById(id)
            return result
        },
        async createUser(id: string, name: string, email: string, password: string, createdAt: Date) {
            const result = await repository.createUser()
            return result
        },
        async editUser(id: string, name: string, email: string) {

        }
    }
}