"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function listUser() {
    const result = await singletonMaster.userService.listUsers();
    return result;
}
