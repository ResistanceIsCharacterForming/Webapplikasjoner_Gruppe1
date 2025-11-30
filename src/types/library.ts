import { libraries} from "@/db/schema";
import { apiResponse } from "./api";
import { favoriteLibraries } from "@/db/schema/favoriteLibraries-schema";

export interface postLibraryData {
  userId: string,
  name: string,
  text: string,
  cordlon: number,
  cordlat: number,
  books: string
  photos: string 
}

export type databaseLibraryData =  {
  userId: string | null,
  name: string,
  text: string,
  cordlon: number,
  cordlat: number,
  books: string |null,
  photos: string |null,
  isVisible: boolean,
  createdAt: string
}

export interface libraryRepository {
  getLibraries(): Promise<apiResponse<library[]>>;
  createLibrary(data: databaseLibraryData): Promise<apiResponse<library[]>>;
  editLibrary(id: string, data: Partial<library>): Promise<apiResponse<library[]>>;
  getLibraryById(id: string): Promise<apiResponse<library[]>>;
  getLibraryByUserId(id: string): Promise<apiResponse<library[]>>;
  getLibraryByCords(lat:number,long:number): Promise<apiResponse<library[]>>;
  deleteLibraryById(id: string): Promise<apiResponse<void>>;
  deleteLibrariesByUserId(id: string): Promise<apiResponse<void>>;
}

export interface libraryService{
  listLibraries(): Promise<apiResponse<library[]>>;
  getLibraryWithId(id:string): Promise<apiResponse<{img:string,data:library}>>;
  listLibraryWithUserId(id:string): Promise<apiResponse<library[]>>;
  listLibraryWithCords(lat:number,long:number): Promise<apiResponse<library[]>>;
  createLibrary(data: any): Promise<apiResponse<library[]>>;
  editLibrary(id:string,formdata:any): Promise<apiResponse<library[]>>;
  deleteLibraryWithId(id:string): Promise<apiResponse<void>>;
  deleteLibraryWithUserId(id:string): Promise<apiResponse<void>>;
}

export type library = typeof libraries.$inferSelect

export type favoriteLibrary = typeof favoriteLibraries.$inferSelect

export const LibaryPhotoName="@libaryPicture.png"

export const deafultLibaryPhotoName="defualtLibary.png"


