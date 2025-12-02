import { reports } from "@/db/schema";
import { apiResponse } from "./api";

export interface reportRepository {
  getReports(): Promise<apiResponse<report[]>>;
  createReport(data:any): Promise<apiResponse<report[]>>;
  editReport(id: number, data: Partial<uploadreport>): Promise<apiResponse<report[]>>;
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
  editReport(id: number,formdata: any): Promise<apiResponse<report[]>>;
  createReports(data:any): Promise<apiResponse<report[]>>;
  deleteReport(id:number): Promise<apiResponse<void>>;
}

export type report =typeof reports.$inferSelect

export type responeReport ={
  data:[report]
}
export type uploadreport ={
    submitterUserId: string;
    text: string | null;
    userId: string | null;
    createdAt: string | null;
    libraryId: number | null;
    reviewId: string | null;
    reportType: string;
    reportLevel: number;
}
