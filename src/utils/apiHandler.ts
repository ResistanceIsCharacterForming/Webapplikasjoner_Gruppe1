import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { dashboardApi } from "@/features/dashboard/api"
import { reviewApi } from "@/features/review/api"
import { isAuthorized } from "@/middleware/authorization"

const features = {
    libraries  : (ctx: any) => {return libraryApi(ctx)},
    users : (ctx: any) => {return userApi(ctx)},
    reports : (ctx: any) => {return dashboardApi(ctx)},
    reviews : (ctx: any) => {return reviewApi(ctx)}
}

export const apiHandler = (ctx: any) => {

    const [ resource, id, type ] = ((ctx: any): string[] => {

        if (ctx.params.$0 !== undefined) {

            const paramsLength = ctx.params.$0.split("/").length

            switch(paramsLength) {

                case 1:
                    return [ctx.params.$0.split("/")[0], "", ""]
                
                case 2:
                    return [ctx.params.$0.split("/")[0], ctx.params.$0.split("/")[1], ""]

                case 3:
                    return [ctx.params.$0.split("/")[0], ctx.params.$0.split("/")[1], ctx.params.$0.split("/")[2]] 

                default:
                    return ["", "", ""]

            }

        }
        return ["", "", ""]
    })(ctx)
    console.log(resource)
    if (resource !== "") {
        ctx.params.resource = resource
        ctx.params.id = id
        ctx.params.type = type
        const feature: (keyof typeof features) = resource as any
        return features[feature](ctx)
    }
}