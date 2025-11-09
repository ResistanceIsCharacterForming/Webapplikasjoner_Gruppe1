import { libraries} from "@/db/schema";
import { apiResponse } from "./api";

export interface postLibraryData {
  userId: string,
  name: string,
  text: string,
  cordlon: number,
  cordlat: number,
  books: string
}

export type databaseLibraryData = postLibraryData & {
  photos: string,
  isVisible: boolean,
  createdAt: string
}

export interface libraryRepository {
  getLibraries(): Promise<apiResponse<library[]>>;
  createLibrary(data: databaseLibraryData): Promise<apiResponse<library[]>>;
  editLibrary(id: string, data: Partial<library>): Promise<apiResponse<library[]>>;
  getLibraryById(id: string): Promise<apiResponse<library[]>>;
  getLibraryByUserId(id: string): Promise<apiResponse<library[]>>;
  getLibraryBycords(cordlat:number,cordlon:number): Promise<apiResponse<library[]>>;
  deleteLibraryById(id: string): Promise<apiResponse<void>>;
  deleteLibrariesByUserId(id: string): Promise<apiResponse<void>>;
}

export interface libraryService{
  listLibraries(): Promise<apiResponse<library[]>>;
  getLibraryWithId(id:string): Promise<apiResponse<library[]>>;
  listLibraryWithUserId(id:string): Promise<apiResponse<library[]>>;
  listLibraryWithCords(cordlat:number,cordlon:number): Promise<apiResponse<library[]>>;
  createLibrary(data: postLibraryData): Promise<apiResponse<library[]>>;
  editlibrary(id:string,data:Partial<library>): Promise<apiResponse<library[]>>;
  deletelibraryWithId(id:string): Promise<apiResponse<void>>;
  deletelibraryWithUserId(id:string): Promise<apiResponse<void>>;
}

export type library = typeof libraries.$inferSelect;