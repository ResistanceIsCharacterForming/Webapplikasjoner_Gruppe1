import { prefix, route } from "rwsdk/router"

import { bookshelvesApi } from "@/features/bookshelves/api"

const features = {
    bookshelves : ({ctx, resource}) => {return bookshelvesApi({ctx, resource})}
}

export const apiHandler = (ctx) => {

    /* I http://localhost:5173/<bookshelves>/api/v1/test blir <...> tatt ut. */
    const category: string = ctx.params.$1
    /* I http://localhost:5173/bookshelves/api/v<1>/test blir <...> tatt ut. */
    const version: string = ctx.params.$0
    /* I http://localhost:5173/bookshelves/api/v1/<test> blir <...> tatt ut. */
    const resource: string = ctx.params.$2
    
    const feature: (keyof typeof features) = ctx.params.$1

    return features[feature]({ctx, resource})
}