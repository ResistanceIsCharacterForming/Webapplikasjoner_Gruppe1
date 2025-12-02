import { imageService } from "@/backend/types/image"
import { validateImgFile } from "../../shared/zod/fileValidation"


export function createImageController(service: imageService) {
    return {
        async getImage(key: string) {
            const result = await service.getImage(key)
            console.log(result)
            return new Response(
                JSON.stringify({
                    data: result.data,
                    success: result.success,
                }),
                {
                    status: 201,
                    headers: { "Content-Type": "application/json" }
                })
        },
        async putImage(key: string, img: any) {
            const result = await service.putImage(key, img)
            if ( result.success){
            return new Response(
                JSON.stringify({
                    data: result.data,
                    success: result.success,
                }),
                {
                    status: 201,
                    headers: { "Content-Type": "application/json" }
                })
            }else return new Response("failed request", { status: 404 })
        },
        async deleteImage(key: string) {
            const result = await service.deleteImage(key)
            return new Response(
                JSON.stringify({
                    data: result.data,
                    success: result.success,
                }),
                {
                    status: 201,
                    headers: { "Content-Type": "application/json" }
                })
        }
    }

}