"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useGetReview(id: number) {
    const result = await singletonMaster.reviewService.getReviewById(id);
    return result;
}
