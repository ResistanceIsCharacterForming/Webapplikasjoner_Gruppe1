"use server";
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";



export async function editUser(id: string, data: FormData) {
    const result = await singletonMaster.userService.editUserById(id, data);
    return result;
}
