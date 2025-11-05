import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { reportApi } from "@/features/report/api"
import { reviewApi } from "@/features/review/api"
import { setParams } from "@/utils/params"
import { sessionApi } from "@/features/session/api"

const features = {
    libraries  : (ctx: any) => {return libraryApi(ctx)},
    users : (ctx: any) => {return userApi(ctx)},
    reports : (ctx: any) => {return reportApi(ctx)},
    reviews : (ctx: any) => {return reviewApi(ctx)},
    sessions : (ctx: any) => {return sessionApi(ctx)}
}

export const apiHandler = (ctx: any) => {

    const [ resource ] = setParams(ctx)

    console.log(resource)

    if (resource !== "" && resource in features) {
        const feature: (keyof typeof features) = resource as any
        return features[feature](ctx)
    }
}