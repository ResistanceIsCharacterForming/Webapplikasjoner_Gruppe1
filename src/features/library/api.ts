import { setParams } from "@/utils/params"
import { singletonMaster } from "@/utils/singletonBuilder"

export const libraryApi = async (ctx: any) => {
    
    const libraryController = singletonMaster.libraryController

    const [ resource, libraryId, type ] = setParams(ctx)

    console.log("api " + ctx.params.resource)


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
                    const libraryUserId:string | undefined = data.libraryUserId
                    const libraryText: string | undefined = data.libraryText
                    const libraryName: string | undefined = data.libraryName
                    const libraryCordLat: number | undefined = data.libraryCordLat
                    const libraryCordlon: number | undefined = data.libraryCordlon
                    const libraryBooks: string | undefined = data.libraryBooks
                    const libraryPhotos: string | undefined = data.libraryPhotos

                    if (
                        libraryUserId !== undefined && libraryCordLat !== undefined && libraryCordlon !== undefined
                        && libraryText !== undefined && libraryBooks !== undefined && libraryName !== undefined
                        && libraryPhotos !== undefined
                    ) {
                        return libraryController.createLibrary(
                            libraryUserId,
                            libraryName,
                            libraryText,
                            libraryCordLat,
                            libraryCordlon,
                            libraryBooks,
                            libraryPhotos
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