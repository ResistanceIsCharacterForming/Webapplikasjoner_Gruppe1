"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useEditReview(id: number, formdata: FormData) {
    const result = await singletonMaster.reviewService.editReview(id, formdata);
    return result;
}
