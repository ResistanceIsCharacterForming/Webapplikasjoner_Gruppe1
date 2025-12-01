"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function useEditReview(id: number, formdata: FormData) {
    const result = await singletonMaster.reviewService.editReview(id, formdata);
    return result;
}
