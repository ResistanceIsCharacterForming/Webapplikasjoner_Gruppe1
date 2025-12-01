import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder"

import { verifyPassword } from "@/backend/features/tokens/utils/handlePassword"

import { createToken, verifyToken } from "@/backend/features/tokens/utils/handleToken"

export function createTokensService() {
    return {
        async checkCredentials(ctx: any) {
            let cookieHeader: string | undefined = ctx.request.headers.get("cookie") ?? undefined
            let cookieArray: [string]
            let singleCookie: string = ""

            if (cookieHeader === undefined) return false
            
            if (cookieHeader.includes(";")) {
                
                cookieArray = ctx.request.headers.get("cookie").split(";")

                if (cookieArray.length <= 1) return false

                singleCookie = cookieArray.filter(x => x.includes("jwtToken"))[0]
            }

            if (!singleCookie.includes(":")) return false

            let jwt: string = singleCookie.split(":")[1]

            if (!jwt.includes("jwtToken")) return false

            jwt = jwt.replaceAll(' ', '')

            jwt = jwt.split("=")[1]

            const result = await verifyToken(jwt)

            return result
        },
        
        async handleLogin(data: any) {
            
            const password = data.get("password")
            const email = data.get("email")

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