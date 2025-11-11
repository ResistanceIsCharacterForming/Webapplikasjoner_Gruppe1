import { favoritLibrary, user } from "@/db/schema"
import { imagehandler } from "@/types/image";
import { postUserData, userRepository } from "@/types/user"

import {
  hashPassword as hash,
  verifyPassword as verify,
} from "better-auth/crypto"
import { and } from "drizzle-orm";

export async function hashPassword(password: string): Promise<string> {
  try {
    return await hash(password);
  } catch (error) {
    console.error("Password hashing error:", error);
    throw new Error("Failed to hash password");
  }
}

export function createUserService(repository: userRepository ,imagehandler:imagehandler) {
    return {
         async listUsers() { 
            const result = await repository.getUsers()
            return result
        },
        async getUserById(id: string) { 
            const result = await repository.getUserById(id)
            const img =await imagehandler.getImage("defualtProfile.png")
            //const test=result.data[0]["img"]=img
            const returnData ={img:img.data,...result.data}
            return {succes:true,data:returnData}
        },
        async getUserByEmail(email: string) { 
            const result = await repository.getUserByEmail(email)
            return result
        },
        async createUser(data: postUserData) {
            let profileImage="0"
            const {image,...userdata}=data
             if(image !==null){
                 profileImage="1"
             }
            const hashedPassword = await hashPassword(userdata.password)
            userdata.password = hashedPassword
            const createdAt = new Date().toString()
            const result = await repository.createUser({...userdata,settings:"", createdAt: createdAt, lastLoginAt: "", profileImage: profileImage, isVisible: true})
            if (result.success && result.data){
                const key= result.data[0].id+"@profilePicture.png"
                if(data.image !==null){
                const test=await imagehandler.putImage(key,image)
            }
            
            }
            return result
        },
         async deleteUserByid(id: string) {
            const result = await repository.deleteUserById(id)
            return result
        },
        async getAdminById(id: string) {
            const result = await repository.getAdminById(id)
            return result
        },
        async createAdmin(userId:string,createdAt:string,adminLevel:number) {
            const result = await repository.createAdmin(userId, createdAt, adminLevel)
            return result
        },
        async isUserOwner(id: string) {

        },
        //favlibs
        async getfavoritLibraries() {
            const result = await repository.getfavoritLibraries()
            return result
        },
        async createfavoritLibrary(data: any) {
            const result = await repository.createfavoritLibrary(data)
            return result
        },
        async editfavoritLibrary(id: number,data:Partial<favoritLibrary>) {
            const result = await repository.editfavoritLibrary(id,data)
            return result
        },
        async getfavoritLibraryById(id: number) {
            const result = await repository.getfavoritLibraryById(id)
            return result
        },
        async getfavoritLibrariesByUserId(id: string) {
            const result = await repository.getfavoritLibrariesByUserId(id)
            return result
        },
        async getfavoritLibrariesByLibaryId(id: string) {
            const result = await repository.getfavoritLibrariesByLibaryId(id)
            return result
        },
        async deletefavoritLibraryById(id: number) {
            const result = await repository.deletefavoritLibraryById(id)
            return result
        },
        async deletefavoritLibrariesByUserId(id: string) {
            const result = await repository.deletefavoritLibrariesByUserId(id)
            return result
        },
        async deletefavoritLibrariesByLibaryId(id: string) {
            const result = await repository.deletefavoritLibrariesByLibaryId(id)
            return result
        },
    }
}