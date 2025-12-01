"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function useGetLibraries() {
    const result = await singletonMaster.libraryService.listLibraries();
    return result;
}
