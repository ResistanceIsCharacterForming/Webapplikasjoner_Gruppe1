"use server";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function useCreateUser(data: FormData) {
    const result = await singletonMaster.userService.createUser(data);
    return result;
}
