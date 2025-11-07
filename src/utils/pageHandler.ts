import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { userApi } from "@/features/user/api"
import { reportApi } from "@/features/report/api"
import { reviewApi } from "@/features/review/api"
import { isAuthorized } from "@/middleware/authorization/authorization"
import { setParams } from "@/utils/params"

import { MapScreen } from "@/features/map/pages/mapScreen"
import { databasescreen } from "@/test"

const features = {
    db : () =>{return databasescreen()},
    map  : () => {return MapScreen()}
}

export const pageHandler = (ctx: any) => {

    setParams(ctx)
    if (ctx.params.resource !== "" && ctx.params.resource in features) {
        const feature: (keyof typeof features) = ctx.params.resource as any
        return features[feature]()
    }
}