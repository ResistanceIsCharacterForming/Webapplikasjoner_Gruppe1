import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { reportApi } from "@/features/report/api"
import { reviewApi } from "@/features/review/api"
import { isAuthorized } from "@/middleware/authorization/authorization"
import { setParams } from "@/middleware/params"

const features = {
    libraries  : (ctx: any) => {return libraryApi(ctx)},
    users : (ctx: any) => {return userApi(ctx)},
    reports : (ctx: any) => {return reportApi(ctx)},
    reviews : (ctx: any) => {return reviewApi(ctx)}
}

export const apiHandler = (ctx: any) => {

    setParams(ctx)
    
    if (ctx.params.resource !== "" && ctx.params.resource in features) {
        const feature: (keyof typeof features) = ctx.params.resource as any
        return features[feature](ctx)
    }
}