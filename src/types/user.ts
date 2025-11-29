import { favoriteLibrary } from "@/db/schema"
import { apiResponse } from "./api"
import { admin } from "@/db/schema"
import { users } from "@/db/schema/users-schema"

export interface postUserData  {
  name: string,
  email: string,
  password: string,
  image:File|null
}
export interface UserData {
  name: string,
  email: string,
  password: string,
}
export type databaseUserData = UserData & {
  settings: string,
  createdAt: string,
  lastLoginAt: string
  profileImage: string
  isVisible: boolean
}

export interface userRepository {
  getUsers(): Promise<apiResponse<user[]>>
  createUser(data: databaseUserData): Promise<apiResponse<user[]>>
  editUser(id: string, data: Partial<user>): Promise<apiResponse<user[]>>
  getUserById(id: string): Promise<apiResponse<user[]>>
  getUserByEmail(email: string): Promise<apiResponse<user>>
  deleteUserById(id: string): Promise<apiResponse<void>>,
  isUserAdmin(ctx: any): Promise<boolean>,
  isUserOwner(ctx: any): Promise<boolean>

  //favoritlibaries

  getFavoriteLibraries(): Promise<apiResponse<favoriteLibrary[]>>
  createFavoriteLibrary(data:any): Promise<apiResponse<favoriteLibrary[]>>
  editFavoriteLibrary(id:number,data:Partial<favoriteLibrary>): Promise<apiResponse<favoriteLibrary[]>>
  getFavoriteLibraryById(id:number): Promise<apiResponse<favoriteLibrary[]>>
  getFavoriteLibrariesByUserId(id:string): Promise<apiResponse<favoriteLibrary[]>>
  getFavoriteLibrariesByLibraryId(id:string): Promise<apiResponse<favoriteLibrary[]>>
  deleteFavoriteLibraryById(id:number): Promise<apiResponse<void>>
  deleteFavoriteLibrariesByUserId(id:string): Promise<apiResponse<void>>
  deleteFavoriteLibrariesByLibraryId(id:string): Promise<apiResponse<void>>

  getAdmins(): Promise<apiResponse<admin[]>>
  createAdmin(userId:string,createdAt:string,adminLevel:number): Promise<apiResponse<admin[]>>
  editAdmin(id: string, data: any): Promise<apiResponse<admin[]>>
  getAdminById(id: string): Promise<apiResponse<admin[]>>
  deleteAdminById(id: string): Promise<apiResponse<void>>
}
export type user = typeof users.$inferSelect;
