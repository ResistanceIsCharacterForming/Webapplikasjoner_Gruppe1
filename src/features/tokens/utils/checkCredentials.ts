import { cosineDistance } from 'drizzle-orm'
import * as jose from 'jose'

export const verifyToken = async(jwt: string): Promise<string | null> => {

    /* Hent secret brukt for signaturen, så enkoder vi den. */
    const JWT_SECRET = process.env.JWT_SECRET
    const secret = new TextEncoder().encode(
        JWT_SECRET
    )

    /* jwtVerify vil gi oss en feil om token ikke stemmer, så må fange den. */
    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
            /* Endre disse verider senere, som de ovenfor. */
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        })
        /* Send tilbake bruker sin id fra payload om token er riktig. */
        return payload.id as string
    } catch (error) {
        /* Kjører catch er token feil, ingen auth */
        console.log(error)
        return null
    }
}

export const isolateCookie = (cookiesAsString: string) => {
    let cookiesAsArray: string[] | null = cookiesAsString.split(";")
    if (cookiesAsArray.length <= 1) return null
    let singleCookie = cookiesAsArray.filter(data => data.includes("jwtToken"))[0]
    return singleCookie
}

export const extractJWT = (cookie: string) => {
    let jwt: string = cookie.split(":")[1]
    if (!jwt.includes("jwtToken")) return null
    jwt = jwt.replaceAll(' ', '').split("=")[1]
    return jwt
}

export const checkCredentials = async (request: any): Promise<{ success: boolean; id: string | null } | false> => {

    let cookieHeader: string | undefined = request.headers.get("cookie") ?? undefined
    let singleCookie: string | null = null

    if (cookieHeader === undefined) return {success: false, id: null}

    if (!cookieHeader.includes("jwtToken")) return {success: false, id: null}

    if (cookieHeader.includes(";")) {
        singleCookie = isolateCookie(cookieHeader)
    }
    
    const jwt: string | null = extractJWT(cookieHeader)

    if (!jwt) return false

    const result = await verifyToken(jwt)

    if (!result) return false
    
    return {success: true, id: result}
}