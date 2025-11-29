"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useGetReviewsFromLibraries(id: string) {
    const result = await singletonMaster.reviewService.getReviewByLibraryId(id);
    if (result.data) {
        for (let index = 0; index < result.data.length; index++) {
            const review = result.data[index];
            if (review.photo == "1") {
                const img = await singletonMaster.ImageService.getImage(review.id + "@reviewPicture.png");
                if (img.data && img.success) review.photo = img.data;
            }
        }
        return result.data;
    }
}
