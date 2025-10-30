import { library } from "@/db/schema"
import { libraryservice, LibraryRepository } from "@/types/library"


export function createLibraryService(repository: LibraryRepository):libraryservice {

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
        async listLibraryWithCords(maxlon:number,minlon:number,maxlat:number,minlat:number) {
            const result=await repository.getLibraryBycords(maxlon,minlon,maxlat,minlat)
            return result
        },
        async createlibrary( userId:string,name: string,text: string,cordlat: number,cordlon: number,books: string,photos:string ) {
            const createdAt = new Date().toUTCString()
            const result=await repository.createLibrary(userId,name,text,cordlat,cordlon,books,createdAt,photos)
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
        },
    }

}

