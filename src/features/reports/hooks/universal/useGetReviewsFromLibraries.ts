"use server";
import { reviewComponentData } from "@/types/reviews";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function useGetReviewsFromLibraries(id: string, userid?: string): Promise<reviewComponentData[]> {
    const result = await singletonMaster.reviewService.getReviewByLibraryId(id);
    let returndata: reviewComponentData[] = []
    if (result.data) {
        for (let index = 0; index < result.data.length; index++) {
            let reviewPhotos = ""
            let liked = false
            let username = ""
            let userProfilePhoto = ""
            const review = result.data[index]
            if (review.photo == "1") {
                const img = await singletonMaster.ImageService.getImage(review.id + "@reviewPicture.png");
                if (img.data && img.success) reviewPhotos = img.data;
            }
            if (userid) {
                const likedCheck = await singletonMaster.reviewService.getReviewEndorsementByReviewIdAndUserId(review.id, userid)
                if (likedCheck.success) liked = true
            }
            const pointscheck = await singletonMaster.reviewService.getReviewEndorsementByReviewId(review.id)
            if(pointscheck.data)review.reviewsPoints = pointscheck.data.length
            const userdata = await singletonMaster.userService.getUserById(review.userId)
            if (userdata.data && userdata.succes) {
                username = userdata.data.data.name
                if (userdata.data.img) userProfilePhoto = userdata.data.img
            }

            const data = {
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
            console.log(data)
        }

    }
    return returndata;
}
