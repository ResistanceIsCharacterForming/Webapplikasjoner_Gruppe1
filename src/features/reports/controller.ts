import { reportService } from "@/types/reports"

export function createReportController(reportService: reportService) {
    return {
        async listReports() {
            const result = await reportService.getReports()
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {
                return new Response(null, { status: 300 })

            }
        },
        async postReport(data: any) {
            const result = await reportService.createReports(data)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async editReport(id: number, data: any) {
            const result = await reportService.editReport(id, data)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async deleteReport(id: number) {
            const result = await reportService.deleteReport(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },

        async getReportById(id: number): Promise<Response> {
            const result = await reportService.getReportWithId(id)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async listReportsByType(type: string): Promise<Response> {
            const result = await reportService.getReportsWithType(type)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async listReportsByLevel(level: number): Promise<Response> {
            const result = await reportService.getReportsWithlevel(level)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
        async listReportsByTypeAndLevel(type: string, level: number): Promise<Response> {
            const result = await reportService.getReportsWithTypeAndLevel(type, level)
            if (result.success === true) {
                return new Response(
                    JSON.stringify({
                        data: result.data,
                        success: true,
                    }),
                    {
                        status: 201,
                        headers: { "Content-Type": "application/json" },
                    }
                )

            } else {

                return new Response(null, { status: 300 })

            }
        },
    }
}