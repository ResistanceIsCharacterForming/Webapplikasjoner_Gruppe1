/* Hente singletonMaster for å få tilgang til service laget til tokens. */
import { singletonMaster } from "@/utils/singletonBuilder"

/* Middelware for å brytte tidlig hvis brukeren forsøker å få tilgang til en begrenset rute og de ikke er innlogget. */
export const authCheck = async (ctx: any) => {
    /* Send ctx til funksjonen checkCredentials i token sitt service lag.  */
    const auth = await singletonMaster.tokensService.checkCredentials(ctx)

    /* Vi forventer å få tilbake UID-en til brukeren hvis JWT fra token er riktig. */
    const userId = auth.userId ?? undefined

    /* Hent URL for siden som blir forespurt. */
    const url = new URL(ctx.request.url)

    /* Hent ut selve stinavnet fra url. Hvis brukeren har lagt til en trailing slash fjern den. */
    let requestedPathname: string = url.pathname
    if (url.pathname.slice(-1) === "/") {
        requestedPathname = url.pathname.slice(0, -1)
    }

    /* Hvilken metode brukes for å gjøre denne handlingen. */
    const method = ctx.request.method.toLowerCase()

    /* Dette er en oversikt over hvilken sider og API ressurser som krever at brukeren er logget inn. */
    const protectedRoutes: [{pathname: string, method: string}] = [
        {pathname : "/api/v1/users", method : "any"}
    ]

    /* Vi bruker sameMethod for å enkelt lagre om enten method er lik hva method fra et objekt er eller any, altså vilkårlig.  */
    let sameMethod: boolean = false
    /* Hent hvert objekt fra protectedRoutes. */
    for (let route of protectedRoutes) {
        /* Gjør denne sammenligning her for å øke lesbarhet nedenfor. */
        if (method === route.method || route.method == "any") {
            sameMethod = true
        }
        /* Hvis objektet sin sti er lik den som forespures og metoden er beskyttet, undersøker om vi er logget inn. */
        if (route.pathname == requestedPathname && sameMethod) {
            /* Hvis userId ikke finnes, altså brukeren ikke er logget inn, send tilbake en feilmelding. */
            if (userId === undefined) return new Response("No auth", { status: 401 })
        }
    }

    ctx.user = userId
}

/* Middleware for å undersøke om brukeren er admin. Tar ikke høyde for admin-nivå. */
export const isAdmin = async (ctx: any) => {
    /* Prøv å hent oppføring fra admins tabell med bruker sin ID.  */
    const result = await singletonMaster.userService.getAdminById(ctx.user)
    /* Hvis enten result.data ikke finnes, eller den har ingen data, da er ikke bruker admin. */
    if (result.data === undefined || result.data.length === 0) {
        /* Avbrytt forespørsel. */
        return new Response("No auth", { status: 401 })
    }
}

export const isOwner = async (ctx: any) => {
    
}