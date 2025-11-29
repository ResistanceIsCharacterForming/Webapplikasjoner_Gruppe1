"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useGetLibrary(id: string) {
    const result = await singletonMaster.libraryService.getLibraryWithId(id);
    return result;
}



