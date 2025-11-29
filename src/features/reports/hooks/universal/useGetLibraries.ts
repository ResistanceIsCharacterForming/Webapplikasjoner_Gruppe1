"use server";
import { singletonMaster } from "@/utils/singletonBuilder";

export async function useGetLibraries() {
    const result = await singletonMaster.libraryService.listLibraries();
    return result;
}
