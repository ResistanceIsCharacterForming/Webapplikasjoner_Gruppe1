import { singletonMaster } from "@/utils/singletonBuilder"

export const reportApi = async (ctx: any) => {

    const reportController = singletonMaster.reportController
    const reportId: string = ctx.params.ide
    const reportType: string = ctx.params.type

    switch (ctx.request.method.toLowerCase()) {

        case "get":
            
            if (reportId !== "" && reportType !== "") {
                return reportController.listReportsByType(reportType)
            }
            if (reportId !== "") {
                return reportController.getReportById(reportId)
            }
            return reportController.listReports()
    }
}