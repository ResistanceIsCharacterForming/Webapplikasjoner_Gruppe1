import { apiResponse } from "@/backend/types/api";

export interface imageRepository{
  getImage(key:string):Promise<apiResponse<string>>;
  putImage(key:string,img:any): Promise<apiResponse<string>>;
  deleteImage(key:string):Promise<apiResponse<void>>;
}

export interface imageService{
  getImage(key:string):Promise<apiResponse<string>>;
  putImage(key:string,img:any): Promise<apiResponse<string>>;
  deleteImage(key:string):Promise<apiResponse<void>>;
}

