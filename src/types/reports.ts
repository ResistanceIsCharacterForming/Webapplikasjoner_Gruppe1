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