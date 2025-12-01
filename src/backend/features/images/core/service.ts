import { imageRepository, imageService } from "@/backend/types/image"
import { validateImgFile } from "../../shared/zod/fileValidation"


export function createImageService(repository:imageRepository):imageService{
    return{
        async getImage(key:string){
            const result= await repository.getImage(key)
            return { success: result.success, data: result.data }
            
        },
        async putImage(key:string,img:any){
            const validate =validateImgFile.safeParse(img)
            if (validate.success && validate.data){
                const result= await repository.putImage(key,img)
                return { success: result.success, data: result.data }
            }
            else return { success: false, error: validate.error }
        },
        async deleteImage(key:string){
            const result=await repository.deleteImage(key)
            return { success: result.success}
        }
    }
}