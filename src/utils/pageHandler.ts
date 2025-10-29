import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { reportApi } from "@/features/report/api"
import { reviewApi } from "@/features/review/api"
import { isAuthorized } from "@/middleware/authorization"
import { setParams } from "@/middleware/params"

import { MapScreen } from "@/features/map/pages/mapScreen"

const features = {
    map  : () => {return MapScreen()}
}

export const pageHandler = (ctx: any) => {

    setParams(ctx)

    console.log(ctx.params.resource)
    
    if (ctx.params.resource !== "" && ctx.params.resource in features) {
        const feature: (keyof typeof features) = ctx.params.resource as any
        return features[feature]()
    }
}