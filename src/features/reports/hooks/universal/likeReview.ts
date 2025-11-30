"use server";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function likeReview(id: number, userid: string) {
    const result = await singletonMaster.reviewService.createReviewEndorsement({ id, userid });
    return result;
}
