import { report } from "@/db/schema";
import { reportRepository, reportService } from "@/types/reports"

export function createReportService(repository:reportRepository):reportService {

    return {
        async getReports() {
            const result= await repository.getReports();
            return result
        },
        async getReportsWithType(type: string){
             const result= await repository.getReportByType(type);
            return result
        },
         async getReportsWithlevel(level: number){
             const result= await repository.getReportByLevel(level);
            return result
        },
         async getReportsWithTypeAndLevel(type: string,level:number){
             const result= await repository.getReportByTypeAndLevel(type,level);
            return result
        },
         async getReportWithId(id: number){
             const result= await repository.getReportById(id);
            return result
        },
         async editReport(id: number,data: Partial<report>){
             const result= await repository.editReport(id,data);
            return result
        },
         async createReports(userId:string|null,libaryId:string|null,reviewId:number|null,raportLevel:number,text:string,raportType:string){
            const createdAt = new Date().toUTCString()
            const data ={userId,libaryId,reviewId,raportLevel,text,raportType,createdAt}
            const result= await repository.createReport(data);
            return result
        },
        async deleteReport(id:number){
            const result= await repository.deleteReportById(id)
            return result
        }
        
    }

}