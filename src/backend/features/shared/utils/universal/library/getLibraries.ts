"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function getLibraries() {
    const result = await singletonMaster.libraryService.listLibraries();
    return result;
}
