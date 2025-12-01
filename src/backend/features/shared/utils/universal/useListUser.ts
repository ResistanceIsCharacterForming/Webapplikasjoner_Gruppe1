"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function useListUser() {
    const result = await singletonMaster.userService.listUsers();
    return result;
}
