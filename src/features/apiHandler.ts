import { prefix, route } from "rwsdk/router"

import { bookshelfApi } from "@/features/bookshelf/api"
import { filterQueryParams } from "@/helpers/queryParamsHandler"

const features = {
    bookshelf : ({ctx, resource}) => {return bookshelfApi({ctx, resource})}
}

export const apiHandler = (ctx: any) => {

    

    const [ id, test ] = filterQueryParams(ctx, ["id", "test"])

    console.log("---")
    console.log(id)
    console.log(test)

    const resource: string = ctx.params.$1
    
    const version: string = ctx.params.$0
    
    const feature: (keyof typeof features) = ctx.params.$1

    return features[feature]({ctx, resource})
}