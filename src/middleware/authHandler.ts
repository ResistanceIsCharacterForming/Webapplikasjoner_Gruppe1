import { setParams } from "@/utils/params"

export const authCheck = (ctx: any) => {

    const [ resource, id, type ] = setParams(ctx)

    //console.log(resource)
    //console.log(id)

    //console.log("auth " + ctx.params.resource)

    switch (ctx.request.method.toLowerCase()) {

        case "get":

            //console.log()

    }

}