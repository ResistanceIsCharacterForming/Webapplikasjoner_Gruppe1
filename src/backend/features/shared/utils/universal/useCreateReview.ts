"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function useCreateReview(formdata: FormData) {
    const result = await singletonMaster.reviewService.createReview(formdata);
    return result;
}



