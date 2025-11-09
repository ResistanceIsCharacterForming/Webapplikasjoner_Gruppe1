import * as jose from 'jose'

export function createTokensController(tokensService: any) {
    return {
        async verifyToken(data: any) {
            const result = await tokensService.verifyToken(data)
             if (result.success === true) {

                return new Response(
                    JSON.stringify({
                    data: "",
                    success: result.success,
                    }),
                    {
                    status: 201,
                    headers: { "Content-Type": "application/json" },
                    }
                );

             } else {

                return new Response(null, { status: 300 })

            }
        },
        async handleLogin(data: any) {
            const result = await tokensService.handleLogin(data)
            if (result.success === true) {
                
                const secret = new TextEncoder().encode(
                'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
                )

                const alg = 'HS256'

                const jwt = await new jose.SignJWT({ 'id': result.id })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setIssuer('urn:example:issuer')
                .setAudience('urn:example:audience')
                .setExpirationTime('1h')
                .sign(secret)

                return new Response("Logged in", {
                    headers: {
                        "Set-Cookie": "token=" + jwt + "; HttpOnly; Secure",
                        "Content-Type": "text/plain"
                    }
                })

            } else {

                return new Response(null, { status: 300 })

            }
        }
    }
}