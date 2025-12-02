import * as jose from 'jose'

/* Lag en ny JWT token. */
export const createToken = async (id: string) => {

    /* Hent secret brukt for signaturen, så enkoder vi den. */
    const JWT_SECRET = process.env.JWT_SECRET
    const secret = new TextEncoder().encode(
        JWT_SECRET,
    )

    /* TODO: Look over and change some of these values. These are the default ones. */
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({ 'id': id })
    /* Med JWT har du header, payload, signature, viktig at alle tre blir satt opp. */
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('300min')
    .sign(secret)

    return jwt

}

/* Undersøk om JWT token fra bruker er riktig. */
export const verifyToken = async(jwt: string) => {

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
        return {success: true, userId: payload.id}
    } catch (error) {
        /* Kjører catch er token feil, ingen auth */
        return {success: false, userId: undefined}
    }

}