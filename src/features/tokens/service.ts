import { singletonMaster } from "@/utils/singletonBuilder"

import { verifyPassword } from "./hooks/password"

import { createToken, verifyToken } from "./hooks/handleToken"

export function createTokensService() {
    return {
        async checkCredentials(ctx: any) {

            let cookie: string | undefined = ctx.request.headers.get("cookie") ?? undefined
            
            if (cookie === undefined) return false

            let jwt: string = cookie.split(":")[1]

            if (!jwt.includes("jwtToken")) return false

            jwt = jwt.replaceAll(' ', '')

            jwt = jwt.split("=")[1]
            
            const result = await verifyToken(jwt)

            return result
        },
        async handleLogin(data: any) {
            const { email, password } = data
            const user = await singletonMaster.userService.getUserByEmail(email)
            if (user.data?.password === undefined) {
                return false
            }
            
            const hashedPassword = user.data?.password as string
            
            const result = await verifyPassword(password, hashedPassword)

            if(!result) return false

            const success = result

            const jwt = await createToken(user.data.id)

            return {success: success, jwt: jwt}
        }
    }
}