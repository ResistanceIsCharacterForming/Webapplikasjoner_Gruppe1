export function createReviewController (reviewService: any) {
    return {
        async listReviews() { 
            return new Response(
                JSON.stringify({
                data: `listReviews` /* Kall til libraryService.listBookshelves() eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getReviewById(id: string): Promise<Response> { 
            return new Response(
                JSON.stringify({
                data: `getReviewById ${id}` /* Kall til libraryService.getBookshelfById(id) eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editReview(id: string, text: string) {
             return new Response(
                JSON.stringify({
                data: `editReview ${id} ${text}`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createReview(id: string, text: string) {
             return new Response(
                JSON.stringify({
                data: `createReview ${id} ${text}` /* kall libraryService */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async deleteReview(id: string) {
             return new Response(
                JSON.stringify({
                data: `deleteReview ${id}`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        }
    }
}