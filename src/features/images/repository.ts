import { imageRepository } from "@/types/image"

export function createImageRepository(r2db: any):imageRepository{
    return{
        async getImage(key:string){
            try{
                const result= await r2db.get(key)
            if(result)
                return { success: true, data: result }
            else
                return { success: false}
            }catch(error){
                return  { success: false}
            }
        },
        async putImage(key:string,img:any){
            try{
                const result= await r2db.put(key,img)
            if(result)
                return { success: true, data: result }
            else
                return { success: false}
            }catch(error){
                return  { success: false}
            }
        },
        async deleteImage(key:string){
            try{
                await r2db.delete(key)
                return { success: true,}
            }catch(error){
                return  { success: false}
            }
        }
    }
}