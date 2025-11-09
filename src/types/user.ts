import { favoritLibrary, User } from "@/db/schema";
import { apiResponse } from "./api";
import { admin } from "@/db/schema";


export interface postUserData {
  name: string,
  email: string,
  password: string
}

export type databaseUserData = postUserData & {
  settings: string,
  createdAt: string,
  lastLoginAt: string
  profileImage: string
  isVisible: boolean
}


export interface userRepository {
  getUsers(): Promise<apiResponse<User[]>>;
  createUser(data: databaseUserData): Promise<apiResponse<User[]>>;
  editUser(id: string, data: Partial<User>): Promise<apiResponse<User[]>>;
  getUserById(id: string): Promise<apiResponse<User[]>>;
  getUserByEmail(email: string): Promise<apiResponse<User>>;
  deleteUserById(id: string): Promise<apiResponse<void>>;

  //favoritlibaries

  getfavoritLibraries(): Promise<apiResponse<favoritLibrary[]>>;
  createfavoritLibrary(data:any): Promise<apiResponse<favoritLibrary[]>>;
  editfavoritLibrary(id:number,data:Partial<favoritLibrary>): Promise<apiResponse<favoritLibrary[]>>;
  getfavoritLibraryById(id:number): Promise<apiResponse<favoritLibrary[]>>;
  getfavoritLibrariesByUserId(id:string): Promise<apiResponse<favoritLibrary[]>>;
  getfavoritLibrariesByLibaryId(id:string): Promise<apiResponse<favoritLibrary[]>>;
  deletefavoritLibraryById(id:number): Promise<apiResponse<void>>;
  deletefavoritLibrariesByUserId(id:string): Promise<apiResponse<void>>;
  deletefavoritLibrariesByLibaryId(id:string): Promise<apiResponse<void>>;

  getAdmins(): Promise<apiResponse<admin[]>>;
  createAdmin(userId:string,createdAt:string,adminLevel:number): Promise<apiResponse<admin[]>>;
  editAdmin(id: string, data: any): Promise<apiResponse<admin[]>>;
  getAdminById(id: string): Promise<apiResponse<admin[]>>;
  deleteAdminById(id: string): Promise<apiResponse<void>>;
}