import { reportService } from "@/backend/types/reports"

export function createReportController(service: reportService) {
    return {
        async listReports() {
            const result = await service.getReports()
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
            const result = await service.createReports(data)
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
            const result = await service.editReport(id, data)
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
            const result = await service.deleteReport(id)
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
            const result = await service.getReportWithId(id)
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
            const result = await service.getReportsWithType(type)
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
            const result = await service.getReportsWithlevel(level)
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
            const result = await service.getReportsWithTypeAndLevel(type, level)
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