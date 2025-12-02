"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";

export async function useGetLibrariesOfArea(lat: number, long: number) {
    const result = await singletonMaster.libraryService.listLibraryWithCords(lat, long);
    return result;
}
