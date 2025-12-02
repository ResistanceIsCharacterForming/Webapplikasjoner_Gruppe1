"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function useGetReviews() {
    const result = await singletonMaster.reviewService.getReviews();
    return result;
}
