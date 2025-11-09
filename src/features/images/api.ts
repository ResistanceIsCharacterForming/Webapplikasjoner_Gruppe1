import { singletonMaster } from "@/utils/singletonBuilder"

export const imageApi = async (ctx: any) => {
    
    const imageapi = singletonMaster.ImageController
    const imageKey: string = ctx.params.id

    switch (ctx.request.method.toLowerCase()) {

        case "get":
          const response=await imageapi.getImage(imageKey)
            if (response.data){
              return new Response(
              await response.data.blob(),
            {
          status: 201,
          headers: { "Content-Type": "application/json" },
          }
      );
            }
            
        case "post":
            if (imageKey!== "") {
                try {
                    const data = await ctx.request.body
                    const response=await imageapi.putImage(imageKey,data)
                    return new Response("sendt?"+imageKey.toString()+" id", {status: 404})
                } catch {
                    return new Response("Bad Request "+ imageKey.toString(), {status: 404})
                }
            }
         case "delete":
            if (imageKey!== "") {
                try {
                    const response=await imageapi.delimage(imageKey)
                    return new Response("deleted img: "+ imageKey.toString(), {status: 404})
                } catch {
                    return new Response("failed Request to delete "+ imageKey.toString(), {status: 404})
                }
            }
}
}