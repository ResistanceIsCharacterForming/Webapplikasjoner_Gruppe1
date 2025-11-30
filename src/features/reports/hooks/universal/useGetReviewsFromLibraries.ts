"use server";
import { reviewComponentData, reviewPhotoName } from "@/types/reviews";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function useGetReviewsFromLibraries(id: string, userid?: string): Promise<reviewComponentData[]> {
    const result = await singletonMaster.reviewService.getReviewByLibraryId(id);
    let returndata: reviewComponentData[] = []
    // goes through all of the reviews
    if (result.data) {
        for (let index = 0; index < result.data.length; index++) {
            let reviewPhotos = ""
            let liked = false
            let username = ""
            let userProfilePhoto = ""
            const review = result.data[index]
            // checks if review have a photo and if so collects it
            if (review.photo == "1") {
                const img = await singletonMaster.ImageService.getImage(review.id + reviewPhotoName);
                if (img.data && img.success) reviewPhotos = img.data;
            }
            // checks if we have userid and if so it will check if user have liked the review
            if (userid) {
                const likedCheck = await singletonMaster.reviewService.getReviewEndorsementByReviewIdAndUserId(review.id, userid)
                if (likedCheck.success) liked = true
            }
            // gets the user that made the review to get their name and photo
            const userdata = await singletonMaster.userService.getUserById(review.userId)
            if (userdata.data && userdata.succes) {
                username = userdata.data.data.name
                if (userdata.data.img) userProfilePhoto = userdata.data.img
            }
            // setts the data to send into the return
            const data : reviewComponentData = {
                id: review.id,
                text: review.text,
                userId: review.userId,
                createdAt: review.createdAt,
                libraryId: review.libraryId,
                reviewsPoints: review.reviewsPoints,
                photo: review.photo,
                reviewPhotos: reviewPhotos,
                liked: liked,
                userName: username,
                userProfilePhoto: userProfilePhoto,
            }
            returndata[index] = data
        }

    }
    return returndata;
}
