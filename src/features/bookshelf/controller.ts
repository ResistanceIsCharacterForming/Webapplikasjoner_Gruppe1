export function createBookshelfController (bookshelfService: any) {

    return {
        async listBookshelves() { 
            return new Response(
                JSON.stringify({
                data: `listBookshelves`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getBookshelfById(data: any) { 
            return new Response(
                JSON.stringify({
                data: `getBookshelfById`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createBookshelf(data: any) {
             return new Response(
                JSON.stringify({
                data: `createBookshelf`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editBookshelf(id: string) {
             return new Response(
                JSON.stringify({
                data: `editBookshelf`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editReview(id: string) {
             return new Response(
                JSON.stringify({
                data: `editReview`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createReview(data: any) {
             return new Response(
                JSON.stringify({
                data: `createReview`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
    }
    
}

export const bookshelfController = createBookshelfController({})