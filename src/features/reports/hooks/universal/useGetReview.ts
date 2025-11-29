"use server";
import { singletonMaster } from "@/utils/singletonBuilder";
const review = singletonMaster.reviewService;


export async function getReview(id: number) {
    const result = await review.getReviewById(id);
    return result;
}
