import { imagehandler, imageService } from "@/types/image"
import { singletonMaster } from "@/utils/singletonBuilder"

export function createImageHandler(service:imageService){
    return{
        async getImage(key:string){
            const result= await service.getimg(key)
            if(result.success)
                return { success: true, data: result.data }
            else
                return { success: false, data: "failed to get img" }
            
        },
        async putImage(key:string,img:any){
            const result= await service.putimg(key,img)
             if(result.success)
                return { success: true, data: result.data }
            else
                return { success: false, data: "failed to put img" }
            
        },
        async delimage(key:string){
             const result=await service.deleteimg(key)
            if(result.success)
                return { success: true, data: result.data }
            else
                return { success: false, data: "failed to delete img"}
        }




    }

}