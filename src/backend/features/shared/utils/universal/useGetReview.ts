"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function useGetReview(id: number) {
    const result = await singletonMaster.reviewService.getReviewById(id);
    return result;
}
