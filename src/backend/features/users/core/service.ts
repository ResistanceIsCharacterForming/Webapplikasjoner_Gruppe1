import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";
import { validateAdminLevel, validateEditUserData, validateEmail, validateId, validateUserData } from "@/backend/features/shared/zod/valueValidation";
import { favoriteLibrary } from "@/backend/types/library";
import { userRepository, UserData, databaseUserData, deafultUserPhotoName, userPhotoName } from "@/backend/types/user";

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
    const imagehandler = singletonMaster.imageService
    return {
        async listUsers() {
            const result = await repository.getUsers()
            return result
        },
        async getUserById(id: string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")
            const result = await repository.getUserById(id)
            if (result.data && result.data.length !== 0) {
                if (result.data[0].profileImage == undefined || result.data[0].profileImage == "0") {
                    const img = await imagehandler.getImage(deafultUserPhotoName)
                    const returnData = { img: img.data, data:result.data[0] }
                    return { succes: true, data: returnData }
                }
                if (result.data[0].profileImage == "1") {
                    const img = await imagehandler.getImage(result.data[0].id + userPhotoName)
                    const returnData = { img: img.data, data:result.data[0] }
                    return { succes: true, data: returnData }
                }
            }
            return { succes: false, error:"failed to get user" }
        },
        async getUserByEmail(email: string) {
            if (!validateEmail.safeParse(email)) return Promise.reject("Failed to validate user email.")

            const result = await repository.getUserByEmail(email)
            return result
        },
        async createUser(formdata: FormData) {
            if (!validateUserData(formdata)) return Promise.reject("Failed to validate user.")

            const file=formdata.get("file")
            formdata.delete("file")
            const dataObject = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown as UserData
            let profileImage = "0"
            if (file !== null) {
                profileImage = "1"
            }
            const hashedPassword = await hashPassword(data.password)
            data.password = hashedPassword
            const createdAt = new Date().toString()
            const result = await repository.createUser({ ...data, settings: "", createdAt: createdAt, lastLoginAt: "", profileImage: profileImage, isVisible: true })
            if (result.success && result.data) {
                const key = result.data[0].id + userPhotoName
                if (file !== null) {
                    const imgresutl = await imagehandler.putImage(key, file)
                }

            }
            return result
        },
        async editUserById(id: string, formdata: FormData) {
            if (!validateEditUserData(id, formdata)) return Promise.reject("Failed to validate user data.")
            const file=formdata.get("file")
            formdata.delete("file")
            const dataObject = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown as Partial<databaseUserData>
            //check if it has password?
            if (data.password) {
                const hashedPassword = await hashPassword(data.password)
                data.password = hashedPassword
            }
             if(file){
                data.profileImage="1"
                const key= id+userPhotoName
                await imagehandler.putImage(key,file)
            }
            const result = await repository.editUser(id, data)
            return result
        },
        async deleteUserByid(id: string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result = await repository.deleteUserById(id)
            return result
        },
        async getAdminById(id: string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result = await repository.getAdminById(id)
            return result
        },
        async createAdmin(userId: string, adminLevel: number) {
            if (!validateId.safeParse(userId)) return Promise.reject("Failed to validate user id.")
            if (!validateAdminLevel.safeParse(adminLevel)) return Promise.reject("Failed to validate admin level.")

            const createdAt = new Date().toString()
            const result = await repository.createAdmin(userId, createdAt, adminLevel)
            return result
        },
        async editAdmin(userId: string, adminLevel: number) {
            if (!validateId.safeParse(userId)) return Promise.reject("Failed to validate user id.")
            if (!validateAdminLevel.safeParse(adminLevel)) return Promise.reject("Failed to validate admin level.")

            const result = await repository.editAdmin(userId, adminLevel)
            return result
        },
        async deleteAdmin(userId: string) {
            if (!validateId.safeParse(userId)) return Promise.reject("Failed to validate user id.")

            const result = await repository.deleteAdminById(userId)
            return result
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
        async editFavoriteLibrary(id: number, formdata: any) {
            const dataObject = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown as Partial<favoriteLibrary>
            const result = await repository.editFavoriteLibrary(id, data)
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