import { prefix, route } from "rwsdk/router"

import { libraryApi } from "@/features/library/api"
import { filterQueryParams } from "./queryParamsHandler"

import { apiFeature } from "@/types/api"

const features = {
    library : ({ctx, resource}: apiFeature) => {return libraryApi({ctx, resource})}
}

export const apiHandler = (ctx: any) => {

    const resource: string = ctx.params.$1
    
    const version: string = ctx.params.$0
    
    const feature: (keyof typeof features) = ctx.params.$1

    return features[feature]({ctx, resource})
}