"use server";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function removeLikeReview(reviewId: number, userid: string) {
    const result = await singletonMaster.reviewService.deleteReviewEndorsementByReviewIdAndUserId(reviewId, userid);
    return result;
}
