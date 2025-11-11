import { favoritLibrary, user } from "@/db/schema"
import { postUserData, userRepository } from "@/types/user"

import {
  hashPassword as hash,
  verifyPassword as verify,
} from "better-auth/crypto"

export async function hashPassword(password: string): Promise<string> {
  try {
    return await hash(password);
  } catch (error) {
    console.error("Password hashing error:", error);
    throw new Error("Failed to hash password");
  }
}

export function createUserService(repository: userRepository) {
    return {
         async listUsers() { 
            const result = await repository.getUsers()
            return result
        },
        async getUserById(id: string) { 
            const result = await repository.getUserById(id)
            return result
        },
        async getUserByEmail(email: string) { 
            const result = await repository.getUserByEmail(email)
            return result
        },
        async createUser(data: postUserData) {
            
            const hashedPassword = await hashPassword(data.password)
            data.password = hashedPassword

            const createdAt = new Date().toString()
            const result = await repository.createUser({...data, settings: "", createdAt: createdAt, lastLoginAt: "", profileImage: "", isVisible: true})
            return result
        },
         async deleteUserByid(id: string) {
            const result = await repository.deleteUserById(id)
            return result
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