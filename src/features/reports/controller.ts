import { reportService } from "@/types/reports"

export function createReportController (reportService: reportService) {
    return {
        async listReports() { 
            const result=await reportService.getReports()
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async postReport(data:any){
            const result=await reportService.createReports(data)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        }, 
        async editReport(id:number,data:any){
            const result=await reportService.editReport(id,data)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async deleteReport(id:number){
            const result=await reportService.deleteReport(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        
        async getReportById(id: number): Promise<Response> { 
            const result=await reportService.getReportWithId(id)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async listReportsByType(type: string): Promise<Response> { 
            const result=await reportService.getReportsWithType(type)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async listReportsByLevel(level: number): Promise<Response> { 
            const result=await reportService.getReportsWithlevel(level)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
         async listReportsByTypeAndLevel(type:string,level: number): Promise<Response> { 
            const result=await reportService.getReportsWithTypeAndLevel(type,level)
            return new Response(
                JSON.stringify({
                data: result.data,
                success: result.success
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
    }
}