import { singletonMaster } from "@/utils/singletonBuilder"

export const dashboardApi = async (ctx: any) => {

    const dashboardController = singletonMaster.dashboardController
    const reportId: string = ctx.params.ide
    const reportType: string = ctx.params.type

    switch (ctx.request.method.toLowerCase()) {

        case "get":
            
            if (reportId !== "" && reportType !== "") {
                return dashboardController.listReportsByType(reportType)
            }
            if (reportId !== "") {
                return dashboardController.getReportById(reportId)
            }
            return dashboardController.listReports()
    }
}