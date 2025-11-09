import { singletonMaster } from "@/utils/singletonBuilder"

import { verifyPassword } from "./hooks/password"

import * as jose from 'jose'

export function createTokensService() {
    return {
        async verifyToken(ctx: any) {
            
            const cookie: string | undefined = ctx.request.headers.get("cookie")

            if (!cookie) return new Response(null, { status: 300 })
            
            const jwt = cookie.split("=")[1]

            const JWT_SECRET = process.env.JWT_SECRET

            const secret = new TextEncoder().encode(
                JWT_SECRET
            )

            try {
                const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
                    issuer: 'urn:example:issuer',
                    audience: 'urn:example:audience',
                })
                return {success: true, id: payload.id}
            } catch (error) {
                console.log(error)
                return {success: false}
            }

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

            const JWT_SECRET = process.env.JWT_SECRET

            const secret = new TextEncoder().encode(
                JWT_SECRET,
            )

            const alg = 'HS256'
            const jwt = await new jose.SignJWT({ 'id': user.data.id })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('1h')
            .sign(secret)

            return {success: result, jwt: jwt}
        }
    }
}