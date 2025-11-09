import { library } from "@/db/schema"
import { libraryService, libraryRepository, postLibraryData } from "@/types/library"


export function createLibraryService(repository: libraryRepository): libraryService {

    return {
        async listLibraries() {
            const result=await repository.getLibraries()
            return result
        },
        async getLibraryWithId(id:string) {
            const result=await repository.getLibraryById(id)
            return result
        },
        async listLibraryWithUserId(id:string) {
            const result=await repository.getLibraryByUserId(id)
            return result
        },
        async listLibraryWithCords(data: any) {
            const cordsData = {}
            const result=await repository.getLibraryByCords(cordsData)
            return result
        },
        async createLibrary( data: postLibraryData ) {
            /* const { userId, name, text, cordlon, cordlat, books } = data */
            const createdAt = new Date().toString()
            /*console.log({...data, createdAt: createdAt, isVisible: true})*/
            const result = await repository.createLibrary({...data, createdAt: createdAt, isVisible: true, photos: ""})
            return result
        },
         async editlibrary(id:string,data:Partial<library>) {
            const result=await repository.editLibrary(id,data)
            return result
        },
         async deletelibraryWithId(id:string) {
            const result=await repository.deleteLibraryById(id)
            return result
        },
         async deletelibraryWithUserId(id:string) {
            const result=await repository.deleteLibrariesByUserId(id)
            return result
        }
    }

}

