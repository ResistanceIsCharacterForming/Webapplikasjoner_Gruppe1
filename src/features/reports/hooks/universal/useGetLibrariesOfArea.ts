"use server";
import { singletonMaster } from "@/utils/singletonBuilder";


export async function useGetLibrariesOfArea(lat: number, long: number) {
    const result = await singletonMaster.libraryService.listLibraryWithCords(lat, long);
    return result;
}
