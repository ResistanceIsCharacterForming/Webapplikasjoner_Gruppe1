import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { dashboardApi } from "@/features/dashboard/api"

const features = {
    library : (ctx: any) => {return libraryApi(ctx)},
    user : (ctx: any) => {return userApi(ctx)},
    dashboard : (ctx: any) => {return dashboardApi(ctx)}
}

export const apiHandler = (ctx: any) => {
    
    const version: string = ctx.params.version
    
    const feature: (keyof typeof features) = ctx.params.resource

    return features[feature](ctx)
}