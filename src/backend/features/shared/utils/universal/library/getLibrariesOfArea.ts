"use server"
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder"

/* Server side komponent for å hente alle bokkroker som er i et gitt område ved å bruke listLibraryWithCords funksjonen til library service. */
export async function getLibrariesOfArea(lat: number, long: number) {
    const result = await singletonMaster.libraryService.listLibraryWithCords(lat, long);
    return result
}