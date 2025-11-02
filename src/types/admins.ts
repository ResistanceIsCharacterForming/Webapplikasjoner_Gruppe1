import { admin } from "@/db/schema";
import { apiResponse } from "./api";



export interface adminRepository {
  getAdmins(): Promise<apiResponse<admin[]>>;
  createAdmin(userId:string,createdAt:string,adminLevel:number): Promise<apiResponse<admin[]>>;
  editAdmin(id: string, data: any): Promise<apiResponse<admin[]>>;
  getAdminById(id: string): Promise<apiResponse<admin[]>>;
  deleteAdminById(id: string): Promise<apiResponse<void>>;
}