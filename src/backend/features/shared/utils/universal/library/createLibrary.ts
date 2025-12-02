"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function createLibrary(data: FormData) {
    const result = await singletonMaster.libraryService.createLibrary(data);
    return result;
}
