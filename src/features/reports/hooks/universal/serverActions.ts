"use server"

import { singletonMaster } from "@/utils/singletonBuilder";

const user = singletonMaster.userService;
export async function getUser(id:string) {
     const result = await user.getUserById(id)
    return result
}



