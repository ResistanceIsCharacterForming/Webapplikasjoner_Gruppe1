export function createLibraryController (libraryService: any) {

    /* Alle disse funksjonene skal til slutt kalle funksjoner / bruke services til å hente data. Men de kommer selv til å bygge ferdi Reponse objekt og sende det tilbake som svar for at API-kall / route.  */
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
            libraryService.test()
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