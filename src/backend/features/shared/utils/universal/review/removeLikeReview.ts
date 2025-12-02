"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function removeLikeReview(reviewId: number, userid: string) {
    const result = await singletonMaster.reviewService.deleteReviewEndorsementByReviewIdAndUserId(reviewId, userid);
    return result;
}
