"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function useCreateUser(data: FormData) {
    const result = await singletonMaster.userService.createUser(data);
    return result;
}
