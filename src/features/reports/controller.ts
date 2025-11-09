export function createReportController (reportService: any) {
    return {
        async listReports() { 
            return new Response(
                JSON.stringify({
                data: `listReports` /* Kall til libraryService.listBookshelves() eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getReportById(id: string): Promise<Response> { 
            return new Response(
                JSON.stringify({
                data: `getReportById ${id}` /* Kall til libraryService.getBookshelfById(id) eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async listReportsByType(type: string): Promise<Response> { 
            return new Response(
                JSON.stringify({
                data: `getReportByType ${type}` /* Kall til libraryService.getBookshelfById(id) eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        }
    }
}