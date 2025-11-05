import { setParams } from "@/utils/params"

export const authCheck = (ctx: any) => {

    const [ resource, id, type ] = setParams(ctx)

    console.log(resource)
    console.log(id)

    switch (ctx.request.method.toLowerCase()) {

        case "get":

            console.log()

    }

}