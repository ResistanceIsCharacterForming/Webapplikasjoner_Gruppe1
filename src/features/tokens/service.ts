import { singletonMaster } from "@/utils/singletonBuilder"

import { verifyPassword } from "./hooks/password"

export function createTokensService() {
    return {
        async handleLogin(data: any) {
            const { email, password } = data
            const user = await singletonMaster.userService.getUserByEmail(email)

            if (user.data?.password === undefined) {
                return false
            }
            
            const hashedPassword = user.data?.password as string
            
            const result = await verifyPassword(password, hashedPassword)

            console.log(password)

            if (result === true) {
                return true
            }
            return false
        }
    }
}