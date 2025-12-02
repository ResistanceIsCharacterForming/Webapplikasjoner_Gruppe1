import { validateEditReport, validateNumberId, validatePostReport, validateReportLevel, validateReportType } from "@/backend/features/shared/zod/valueValidation";
import { reportRepository, reportService, uploadreport } from "@/backend/types/reports";

export function createReportService(repository: reportRepository): reportService {

    return {
        async getReports() {
            const result = await repository.getReports();
            return result
        },
        //gets list of reports with the type 
        async getReportsWithType(type: string) {
            if (!validateReportType.safeParse(type)) return Promise.reject("Failed to validate report type.")

            const result = await repository.getReportByType(type);
            return result
        },
        //gets list of reports with the levels 
        async getReportsWithlevel(level: number) {
            if (!validateReportLevel.safeParse(level)) return Promise.reject("Failed to validate report level.")

            const result = await repository.getReportByLevel(level);
            return result
        },
        //gets list of reports with the type and level 
        async getReportsWithTypeAndLevel(type: string, level: number) {
            if (!validateReportType.safeParse(type)) return Promise.reject("Failed to validate report type.")
            if (!validateReportLevel.safeParse(level)) return Promise.reject("Failed to validate report level.")

            const result = await repository.getReportByTypeAndLevel(type, level);
            return result
        },
        async getReportWithId(id: number) {
            if (!validateNumberId.safeParse(id)) return Promise.reject("Failed to validate report id.")

            const result = await repository.getReportById(id);
            return result
        },
        async editReport(id: number, formdata: any) {
            if (!validateEditReport(id, formdata)) return Promise.reject("Failed to validate report.")

            const dataObject = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown as Partial<uploadreport>
            const result = await repository.editReport(id, data);
            return result
        },
        async createReports(formdata: any) {
            if (!validatePostReport(formdata)) return Promise.reject("Failed to validate report.")

            const dataObject = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown as uploadreport
            data.createdAt = new Date().toUTCString()
            const result = await repository.createReport(data);
            return result
        },
        async deleteReport(id: number) {
            if (!validateNumberId.safeParse(id)) return Promise.reject("Failed to validate report id.")
            const result = await repository.deleteReportById(id)
            return result
        }

    }

}