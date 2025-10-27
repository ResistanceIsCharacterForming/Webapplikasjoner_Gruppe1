import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"

const features = {
    library : (ctx: any) => {return libraryApi(ctx)}
}

export const apiHandler = (ctx: any) => {
    
    const version: string = ctx.params.version
    
    const feature: (keyof typeof features) = ctx.params.resource

    return features[feature](ctx)
}