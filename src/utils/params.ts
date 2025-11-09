export const setParams = (ctx: any) => {

    const params = ((ctx: any): string[] => {

        let paramsLength: number = 0
        let paramsAsArray: string[] = []

        /* This first runs if we are entering from a route */
        if (ctx.params.$0 !== undefined) {
            paramsLength = ctx.params.$0.split("/").length
            paramsAsArray = ctx.params.$0.split("/")
            paramsAsArray = [...paramsAsArray.slice(0)]
        /* This second is for middleware */
        } else {
            paramsLength = ctx.request.url.split("/").length
            if(paramsLength >= 5) {
                paramsAsArray = ctx.request.url.split("/")
                paramsAsArray = [...paramsAsArray.slice(5)]
            }
        }

        paramsLength = paramsAsArray.length

        switch (paramsLength) {

            case 1:
                return [paramsAsArray[0], "", ""]

            case 2:
                return [paramsAsArray[0], paramsAsArray[1], ""]

            case 3:
                return [paramsAsArray[0], paramsAsArray[1], paramsAsArray[2]]

            default:
                return ["", "", ""]

        }

        return ["", "", ""]

    })(ctx)
    
    return params

}


export function extractParams() {
  return async (ctx: any) => {
    const url = new URL(ctx.request.url)
    const parts = url.pathname.split("/")
    const resource: string = parts[3] ?? ""
    const id: string = parts[4] ?? ""
    const type = url.searchParams.get("type") ?? ""

    ctx.params = {resource, id, type}
}
}


/*


export function getUrlParts() {
    return async (ctx: any) => {
        new URL(ctx.request.url).pathname.split("/")
    }
}

export function extractResource() {
    const parts = await getUrlParts()
    return async (ctx: any) => {

    }
}*/