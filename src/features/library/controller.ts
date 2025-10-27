export function createLibraryController (libraryService: any) {
    /* Alle disse funksjonene skal til slutt kalle funksjoner / bruke services til å hente data. Men de kommer selv til å bygge ferdi Reponse objekt og sende det tilbake som svar for at API-kall / route.  */
    return {
        async listLibraries() { 
            return new Response(
                JSON.stringify({
                data: `listBookshelves` /* Kall til libraryService.listBookshelves() eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async getLibraryById(id: string): Promise<Response> { 
            return new Response(
                JSON.stringify({
                data: `getBookshelfById ${id}` /* Kall til libraryService.getBookshelfById(id) eller lignende. */,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async createLibrary(id: string, text: string, books: string, name: string) {
             return new Response(
                JSON.stringify({
                data: `createBookshelf ${id} ${text} ${books} ${name}`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async editLibrary(id: string, text: string, books: string) {
             return new Response(
                JSON.stringify({
                data: `editBookshelf  ${id} ${text} ${books}`,
                success: true
            }),
            {
                status: 201,
                headers: {"Content-Type": "application/json"}
            })
        },
        async deleteLibrary(id: string) {
             return new Response(
                JSON.stringify({
                data: `deleteLibrary ${id}`,
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
        async createReview(libraryId: string, reviewId: string, text: string) {
             return new Response(
                JSON.stringify({
                data: `createReview ${libraryId} ${reviewId} ${text}` /* kall libraryService */,
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
        },
    }
}