import { imageRepository } from "@/backend/types/image";

export function createImageRepository(r2db: any): imageRepository {
    return {
        async getImage(key: string) {
            try {
                const result = await r2db.get(key)
                if (!result) return { success: false }
                else {
                    // convert bilder til base64 som vi bruker på frontend
                    const arrayBuffer = await result.arrayBuffer();
                    const base64 = Buffer.from(arrayBuffer).toString("base64");
                    return { success: true, data: base64 }
                }

            } catch (error) {
                return { success: false }
            }
        },
        async putImage(key: string, img: any) {
            try {
                const result = await r2db.put(key, img)
                if (result) {
                    return { success: true }
                }
                else
                    return { success: false }
            } catch (error) {
                return { success: false }
            }
        },
        async deleteImage(key: string) {
            try {
                await r2db.delete(key)
                return { success: true, }
            } catch (error) {
                return { success: false }
            }
        }
    }
}