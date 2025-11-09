

export function createTokensController(tokensService: any) {
    return {
        async verifyToken(ctx: any) {

            const result = await tokensService.verifyToken(ctx)

             if (result.success === true) {
                
                return new Response(
                    JSON.stringify({
                    data: result.id,
                    success: true,
                }),
                {
                    status: 201,
                    headers: { "Content-Type": "application/json" },
                }
                )

             } else {

                return new Response(null, { status: 300 })

            }

        },
        async handleLogin(data: any) {
            const result = await tokensService.handleLogin(data)

            if (result.success === true) {
            
                return new Response("Logged in", {
                    headers: {
                        "Set-Cookie": "token=" + result.jwt + "; HttpOnly; Secure",
                        "Content-Type": "text/plain"
                    }
                })

            } else {

                return new Response(null, { status: 300 })

            }
        }
    }
}