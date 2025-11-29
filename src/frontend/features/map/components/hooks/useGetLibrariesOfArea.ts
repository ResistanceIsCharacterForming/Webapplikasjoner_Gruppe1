"use server"

import { singletonMaster } from "@/utils/singletonBuilder";

/* 0,40 */

export async function useGetLibrariesOfArea(lat: number, long: number) {
    const result = await singletonMaster.libraryService.listLibraryWithCords(lat, long);
    return result;
}