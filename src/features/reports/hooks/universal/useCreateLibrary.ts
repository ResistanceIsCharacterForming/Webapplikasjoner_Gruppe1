"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useCreateLibrary(data: FormData) {
    const result = await singletonMaster.libraryService.createLibrary(data);
    return result;
}
