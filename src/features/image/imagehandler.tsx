import { env } from "cloudflare:workers"

export function createImageHandler(){
      const r2db=env.R2
    return{
        async getImage(img:string){
            try{
                const result= await r2db.get(img)
            if(result)
                return { success: true, data: result }
            else
                return { success: false, error:"failed to get img"}
            }catch(error){
                return  { success: false, error:error}
            }
        },
        async putImage(key:string,img:any){
            try{
                const result= await r2db.put(key,img)
            if(result)
                return { success: true, data: result }
            else
                return { success: false, error:"failed to put img"}
            }catch(error){
                return  { success: false, error:error}
            }
        },
        async delimage(key:string){
              try{
                await r2db.delete(key)
                return { success: true, data: "img is deleted" }
            }catch(error){
                return  { success: false, error:error}
            }
        }




    }

}