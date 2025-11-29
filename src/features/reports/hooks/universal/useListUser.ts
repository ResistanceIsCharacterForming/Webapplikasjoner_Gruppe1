"use server";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function useListUser() {
    const result = await singletonMaster.userService.listUsers();
    return result;
}
