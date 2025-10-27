import { singletonMaster } from "@/utils/singletonBuilder"

export const dashboardApi = async (ctx: any) => {
    const dashboardController = singletonMaster.dashboardController
    const reportId: string | undefined = ctx.params.slugTwo
    const reportType: string | undefined = ctx.params.slugOne
    switch (ctx.request.method.toLowerCase()) {
        case "get":
            if (reportType !== undefined && reportType !== "any") {
                return dashboardController.listReportsByType(reportType)
            }
            if (reportId !== undefined) {
                return dashboardController.getReportById(reportId)
            }
            return dashboardController.listReports()
    }
}