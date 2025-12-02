"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function likeReview(id: number, userid: string) {
    const result = await singletonMaster.reviewService.createReviewEndorsement({ id, userid });
    return result;
}
