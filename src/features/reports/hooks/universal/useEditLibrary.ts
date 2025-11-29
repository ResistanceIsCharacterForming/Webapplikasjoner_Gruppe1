"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useEditLibrary(id: string, data: FormData) {
    const result = await singletonMaster.libraryService.editLibrary(id, data);
    return result;
}
