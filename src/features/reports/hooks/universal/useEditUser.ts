"use server";
import { singletonMaster } from "@/utils/singletonBuilder";



export async function useEditUser(id: string, data: FormData) {
    const result = await singletonMaster.userService.editUserById(id, data);
    return result;
}
