import { apiResponse } from "./api";


export interface imagehandler {
  getImage(key:string): Promise<apiResponse<R2Object|string>>;
  putImage(key:string,img:any): Promise<apiResponse<R2Object|string>>;
  delimage(key:string): Promise<apiResponse<void|string>>;
}

export interface imageRepository{
  getimg(key:string):Promise<apiResponse<R2Object>>;
  putimg(key:string,img:any): Promise<apiResponse<R2Object>>;
  deleteimg(key:string):Promise<apiResponse<void>>;
}

export interface imageService{
  getimg(key:string):Promise<apiResponse<R2Object>>;
  putimg(key:string,img:any): Promise<apiResponse<R2Object>>;
  deleteimg(key:string):Promise<apiResponse<void>>;
}
