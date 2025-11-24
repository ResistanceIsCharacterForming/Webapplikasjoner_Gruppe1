import { imagehandler, imageService } from "@/types/image"
import { singletonMaster } from "@/utils/singletonBuilder"

export function ImageController(service:imageService):imagehandler{
    return{
        async getImage(key:string){
            const result= await service.getImage(key)
            if(result.success)
                return { success: true, data: result.data }
            else
                return { success: false, data: "failed to get img" }
            
        },
        async putImage(key:string,img:any){
            const result= await service.putImage(key,img)
             if(result.success)
                return { success: true, data: result.data }
            else
                return { success: false, data: "failed to put img" }
            
        },
        async deleteImage(key:string){
             const result=await service.deleteImage(key)
            if(result.success)
                return { success: true, data: result.data }
            else
                return { success: false, data: "failed to delete img"}
        }
    }

}