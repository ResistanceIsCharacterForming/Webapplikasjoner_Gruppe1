import { singletonMaster } from "@/utils/singletonBuilder"

export const libraryApi = async (ctx: any) => {
    
    const libraryController = singletonMaster.libraryController

    const libraryId: string = ctx.params.id

    switch (ctx.request.method.toLowerCase()) {

        case "get":

            if (libraryId !== "") {
                return libraryController.getLibraryById(libraryId)
            }
            return libraryController.listLibraries()

        case "post":

            if (libraryId !== "") {
                try {
                    const data = await ctx.request.json()
                    const libraryText: string | undefined = data.libraryText
                    const libraryBooks: string | undefined = data.libraryBooks
                    const libraryName: string | undefined = data.libraryBooks
                    if (libraryText !== undefined && libraryBooks !== undefined && libraryName !== undefined) {
                        return libraryController.createLibrary(
                            libraryId,
                            libraryText,
                            libraryBooks,
                            libraryName
                        )
                    }
                    return new Response("Bad Request.", {status: 400})
                } catch {
                    return new Response("Bad Request.", {status: 404})
                }
            }

        case "put": 

            if (libraryId !== "") {
                try {
                    const data = await ctx.request.json()
                    const libraryText: string | undefined= data.libraryText
                    const libraryBooks: string | undefined = data.libraryBooks
                    if (libraryText !== undefined && libraryBooks !== undefined) {
                        return libraryController.editLibrary(libraryId, libraryText, libraryBooks)
                    }
                } catch {
                    return new Response("Bad Request.", {status: 404})
                }
            }

        case "delete":
            
            if (libraryId !== "delete") {
                return libraryController.deleteLibrary(libraryId)
            }
        
        default:
            return new Response("Method not allowed.", {status: 405})

    }
}