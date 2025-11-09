import { setParams } from "@/utils/params"

export const authCheck = (ctx: any) => {

    /*const [ resource, id, type ] = setParams(ctx)*/

    /*const method = ctx.request.method.toLowerCase()*/

    const resource = "users"

    const method = "delete"

    type policy = "public" | "auth" | "owner" | "admin"
/* fibonashi rekke */
    const policiesAPI: any = {
        auth: { get: "public", delete: "auth" },
        libraries: { get: "public", post: "auth", put: "owner", delete: "admin"},
        users: { get: "auth", post: "public", put: "owner", delete: "admin" },
        reports: { get: "auth" },
        reviews: { get: "auth", post: "auth", put: "owner", delete: "admin" }
    }

    const policiesRoute: any = {
        login: "public",
    }

    let currentPolicy: policy = "auth"

    if (resource in policiesAPI) {
        currentPolicy = policiesAPI[resource][method] ?? "auth"
    }
    
    if (resource in policiesRoute) {
        currentPolicy = policiesRoute[resource] ?? "auth"
    }

    if (currentPolicy == "public") return

    if (currentPolicy == "auth") {
        /* Check JWT token */
    }

    if (currentPolicy == "owner") {
        /* Check JWT token */
        /* if ctx.user.id == feature.checkId(id)  return */
    }

    if (currentPolicy == "admin") {
        /* Check JWT token */
        /* if ctx.user.id == feature.usersIsAdmin(id)  return */
    }

    const cookieHeader = ctx.cookies
    console.log(cookieHeader)

}