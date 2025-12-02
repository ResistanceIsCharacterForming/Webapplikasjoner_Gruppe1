"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function getReviews() {
    const result = await singletonMaster.reviewService.getReviews();
    return result;
}
