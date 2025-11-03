export const setParams = (ctx: any) => {

    const [ resource, id, type ] = ((ctx: any): string[] => {

        if (ctx.params.$0 !== undefined) {

            const paramsLength = ctx.params.$0.split("/").length

            switch(paramsLength) {

                case 1:
                    return [ctx.params.$0.split("/")[0], "", ""]
                
                case 2:
                    return [ctx.params.$0.split("/")[0], ctx.params.$0.split("/")[1], ""]

                case 3:
                    return [ctx.params.$0.split("/")[0], ctx.params.$0.split("/")[1], ctx.params.$0.split("/")[2]] 

                default:
                    return ["", "", ""]

            }

        }
        return ["", "", ""]
    })(ctx)

    if (resource !== "") {
        ctx.params.resource = resource
        ctx.params.id = id
        ctx.params.type = type
    }

}