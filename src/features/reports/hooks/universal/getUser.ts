"use server";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function getUser(id: string) {
    const result = await singletonMaster.userService.getUserById(id);
    return result;
}
