import { libraries} from "@/db/schema";
import { apiResponse } from "./api";


export interface libraryRepository {
  getLibraries(): Promise<apiResponse<library[]>>;
  createLibrary(data: Partial<library>): Promise<apiResponse<library[]>>;
  editLibrary(id: string, data: Partial<library>): Promise<apiResponse<library[]>>;
  getLibraryById(id: string): Promise<apiResponse<library[]>>;
  getLibraryByUserId(id: string): Promise<apiResponse<library[]>>;
  getLibraryBycords(maxlon: number,minlon: number,maxlat: number,minlat: number): Promise<apiResponse<library[]>>;
  deleteLibraryById(id: string): Promise<apiResponse<void>>;
  deleteLibrariesByUserId(id: string): Promise<apiResponse<void>>;
}

export interface libraryservice{
  listLibraries(): Promise<apiResponse<library[]>>;
  getLibraryWithId(id:string): Promise<apiResponse<library[]>>;
  listLibraryWithUserId(id:string): Promise<apiResponse<library[]>>;
  listLibraryWithCords(maxlon:number,minlon:number,maxlat:number,minlat:number): Promise<apiResponse<library[]>>;
  createlibrary(userId:string|null,name: string,text: string,cordlat: number,cordlon: number,books: string,photos:string): Promise<apiResponse<library[]>>;
  editlibrary(id:string,data:Partial<library>): Promise<apiResponse<library[]>>;
  deletelibraryWithId(id:string): Promise<apiResponse<void>>;
  deletelibraryWithUserId(id:string): Promise<apiResponse<void>>;
}

export type library = typeof libraries.$inferSelect;