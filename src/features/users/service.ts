import { favoriteLibrary, user } from "@/db/schema"
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
        async createUser(formdata: FormData) {
            const dataObject  = Object.fromEntries(formdata.entries());
            const data =dataObject as unknown as postUserData
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
                await imagehandler.putImage(key,image)
            }
            
            }
            return result
        },
        async editUserById(id:string,formdata:FormData){
            const dataObject  = Object.fromEntries(formdata.entries());
            const data =dataObject as unknown as postUserData
            //check if it has password?
            const hashedPassword = await hashPassword(data.password)
            data.password = hashedPassword
            const result = await repository.editUser(id,data)
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
        async createAdmin(userId:string,adminLevel:number) {
             const createdAt = new Date().toString()
            const result = await repository.createAdmin(userId, createdAt, adminLevel)
            return result
        },
        async editAdmin(userId:string,adminLevel:number){
            const result = await repository.editAdmin(userId,adminLevel)
            return result
        },
        async deleteAdmin(userId:string){
            const result = await repository.deleteAdminById(userId)
            return result
        },
        async isUserOwner(id: string) {

        },
        //favlibs
        async getFavoriteLibraries() {
            const result = await repository.getFavoriteLibraries()
            return result
        },
        async createFavoriteLibrary(data: any) {
            const result = await repository.createFavoriteLibrary(data)
            return result
        },
        async editFavoriteLibrary(id: number,formdata:any) {
            const dataObject  = Object.fromEntries(formdata.entries());
            const data =dataObject as unknown as Partial<favoriteLibrary>
            const result = await repository.editFavoriteLibrary(id,data)
            return result
        },
        async getFavoriteLibraryById(id: number) {
            const result = await repository.getFavoriteLibraryById(id)
            return result
        },
        async getFavoriteLibrariesByUserId(id: string) {
            const result = await repository.getFavoriteLibrariesByUserId(id)
            return result
        },
        async getFavoriteLibrariesByLibraryId(id: string) {
            const result = await repository.getFavoriteLibrariesByLibraryId(id)
            return result
        },
        async deleteFavoriteLibraryById(id: number) {
            const result = await repository.deleteFavoriteLibraryById(id)
            return result
        },
        async deleteFavoriteLibrariesByUserId(id: string) {
            const result = await repository.deleteFavoriteLibrariesByUserId(id)
            return result
        },
        async deleteFavoriteLibrariesByLibraryId(id: string) {
            const result = await repository.deleteFavoriteLibrariesByLibraryId(id)
            return result
        },
    }
}