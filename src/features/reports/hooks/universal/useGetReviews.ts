"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useGetReviews() {
    const result = await singletonMaster.reviewService.getReviews();
    return result;
}
