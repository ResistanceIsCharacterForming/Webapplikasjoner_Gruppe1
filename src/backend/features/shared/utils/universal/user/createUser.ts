"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function createUser(data: FormData) {
    const result = await singletonMaster.userService.createUser(data);
    return result;
}
