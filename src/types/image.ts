import { apiResponse } from "./api";


export interface imagehandler {
  getImage(key:string): Promise<apiResponse<R2Object|string>>;
  putImage(key:string,img:any): Promise<apiResponse<R2Object|string>>;
  deleteImage(key:string): Promise<apiResponse<void|string>>;
}

export interface imageRepository{
  getImage(key:string):Promise<apiResponse<R2Object>>;
  putImage(key:string,img:any): Promise<apiResponse<R2Object>>;
  deleteImage(key:string):Promise<apiResponse<void>>;
}

export interface imageService{
  getImage(key:string):Promise<apiResponse<R2Object>>;
  putImage(key:string,img:any): Promise<apiResponse<R2Object>>;
  deleteImage(key:string):Promise<apiResponse<void>>;
}
