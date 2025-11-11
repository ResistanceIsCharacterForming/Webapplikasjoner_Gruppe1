import { imageRepository, imageService } from "@/types/image"
import { error } from "console"

export function createImageService(repository:imageRepository):imageService{
    return{
        async getimg(key:string){
            const result= await repository.getimg(key)
            return { success: result.success, data: result.data }
            
        },
        async putimg(key:string,img:any){
            const result= await repository.putimg(key,img)
            return { success: result.success, data: result.data }
        },
        async deleteimg(key:string){
            const result=await repository.deleteimg(key)
            return { success: result.success}
        }
    }
}