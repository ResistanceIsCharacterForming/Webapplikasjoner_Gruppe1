import { imageService } from "@/backend/types/image"


export function createImageController(service: imageService) {
    return {
        async getImage(key: string) {
            const result = await service.getImage(key)
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