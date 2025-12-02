import { RequestInfo } from "rwsdk/worker"

/* Hente singletonMaster for å få tilgang til service laget til tokens. */
import { verifyToken } from "@/backend/features/tokens/utils/handleToken"
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder"
import { checkCredentials } from "@/backend/features/tokens/utils/checkCredentials"


export type AppContext = {
  userId: string | null
}

/* Middelware for å brytte tidlig hvis brukeren forsøker å få tilgang til en begrenset rute og de ikke er innlogget. */
export async function authCheck ({
  ctx,
  request,
}: {
  ctx: AppContext
  request: Request
}) {

    ctx.userId = null

    /* Send ctx til funksjonen checkCredentials i token sitt service lag.  */
    
    const auth = await checkCredentials(request)

    /* Vi forventer å få tilbake UID-en til brukeren hvis JWT fra token er riktig. */
    const user: any = auth

    /* Hent URL for siden som blir forespurt. */
    const url = new URL(request.url)

    /* Hent ut selve stinavnet fra url. Hvis brukeren har lagt til en trailing slash fjern den. */
    let requestedPathname: string = url.pathname
    
    if (requestedPathname !== "/" && requestedPathname.endsWith("/")) {
        requestedPathname = requestedPathname.slice(0, -1)
    }
    
    /* Hvilken metode brukes for å gjøre denne handlingen. */
    const method = request.method.toLowerCase()

    /* Dette er en oversikt over hvilken sider og API ressurser som krever at brukeren er logget inn. */
    const openRoutes: string[] = [
        "/",
        "/login",
        "/register",
        "/home",
        "/api/v1/tokens",
        "/api/v1/users",
        "/api/v1/libraries",
        "/api/v1/image"
    ]

    const isOpenRoute = (openRoutes.includes(requestedPathname))

    if (!user && !isOpenRoute) return new Response("No auth", { status: 401 })

    // Temp to test, need to be moved
    interface AuthenticatedCtx extends RequestInfo {
        user?: string
    }
    
    if (user) ctx.userId = user.id
}

// TESTING 

// Arrange

// Act

// Assert









/* Middleware for å undersøke om brukeren er admin. Tar ikke høyde for admin-nivå. */
export const isAdmin = async (ctx: RequestInfo["ctx"]) => {
    // temp fix to let it run for now obv should be better and type checks but just to check runs ^^
    let cookieArray = ctx.request.headers.get("cookie").split(";")
    let singleCookie = cookieArray.filter(x => x.includes("jwtToken"))[0]
    let jwt = singleCookie.split(":")[1]
    jwt = jwt.split("=")
    let user = await verifyToken(jwt[1])
    const result = await singletonMaster.userService.getAdminById(user.userId)
    /* Prøv å hent oppføring fra admins tabell med bruker sin ID.  */
    //temped commented over for now as does not work? 
    //const result = await singletonMaster.userService.getAdminById(ctx.user)

    /* Hvis enten result.data ikke finnes, eller den har ingen data, da er ikke bruker admin. */
    if (result.data === undefined || result.data.length === 0) {
        /* Avbrytt forespørsel. */
        return new Response("No auth", { status: 401 })
    }
}

export const isOwner = async (ctx: any) => {
    
}