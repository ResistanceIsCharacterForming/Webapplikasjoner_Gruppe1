
import { imagehandler } from "@/types/image";
import { libraryService, libraryRepository, postLibraryData } from "@/types/library"


export function createLibraryService(repository: libraryRepository,imagehandler:imagehandler): libraryService {

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
        async listLibraryWithCords(lat:number,long:number) {
            const result=await repository.getLibraryByCords(lat,long)
            return result
        },
        async createLibrary( formdata: any ) {
            //add zod here
            const files=formdata.getAll("files")
            formdata.delete("files")
            const dataObject  = Object.fromEntries(formdata.entries());
            const librarydata =dataObject as unknown as postLibraryData
            let photos="0"
            if(files !==null){
               photos=files.length.toString()
            }
            const createdAt = new Date().toString()
            const result = await repository.createLibrary({...librarydata, createdAt: createdAt, isVisible: true, photos: ""})
            if(files !==null){
                if (result.success && result.data){
                    for (let index = 0; index < files.length; index++) {
                        const key= result.data[0].id+"@libaryPicture"+index.toString()+".png"
                        await imagehandler.putImage(key,files[index])
                    }   
                }
            }
            return result
        },
         async editLibrary(id:string,formdata:any) {
            const files=formdata.getAll("files")
            formdata.delete("files")
            const dataObject  = Object.fromEntries(formdata.entries());
            const librarydata =dataObject as unknown as postLibraryData
            let photos="0"
            if(files !==null){
               photos=files.length.toString()
            }
            const result=await repository.editLibrary(id,librarydata)
            if(files !==null){
                if (result.success && result.data){
                    for (let index = 0; index < files.length; index++) {
                        const key= result.data[0].id+"@libaryPicture"+index.toString()+".png"
                        await imagehandler.putImage(key,files[index])
                    }   
                }
            }
            return result
        },
         async deleteLibraryWithId(id:string) {
            const result=await repository.deleteLibraryById(id)
            return result
        },
         async deleteLibraryWithUserId(id:string) {
            const result=await repository.deleteLibrariesByUserId(id)
            return result
        }
    }

}

