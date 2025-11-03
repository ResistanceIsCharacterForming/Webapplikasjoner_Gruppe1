import { report } from "@/db/schema";
import { apiResponse } from "./api";


export interface reportRepository {
  getReports(): Promise<apiResponse<report[]>>;
  createReport(data:any): Promise<apiResponse<report[]>>;
  editReport(id: number, data: Partial<report>): Promise<apiResponse<report[]>>;
  getReportById(id: number): Promise<apiResponse<report[]>>;
  getReportByType(type: string): Promise<apiResponse<report[]>>;
  getReportByTypeAndLevel(type:string,level:number):Promise<apiResponse<report[]>>;
  getReportByLevel(level:number):Promise<apiResponse<report[]>>;
  deleteReportById(id:number):Promise<apiResponse<void>>;
}


export interface reportService{
  getReports(): Promise<apiResponse<report[]>>;
  getReportsWithType(type: string): Promise<apiResponse<report[]>>;
  getReportsWithlevel(level: number): Promise<apiResponse<report[]>>;
  getReportsWithTypeAndLevel(type: string,level:number): Promise<apiResponse<report[]>>;
  getReportWithId(id: number): Promise<apiResponse<report[]>>;
  editReport(id: number,data: Partial<report>): Promise<apiResponse<report[]>>;
  createReports(userId:string|null,libaryId:string|null,reviewId:number|null,raportLevel:number,text:string,raportType:string): Promise<apiResponse<report[]>>;
  deleteReport(id:number): Promise<apiResponse<void>>;




}