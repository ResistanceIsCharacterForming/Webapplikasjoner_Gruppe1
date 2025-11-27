
import { imageService } from "@/types/image";
import { libraryService, libraryRepository, postLibraryData } from "@/types/library"


export function createLibraryService(repository: libraryRepository,imagehandler:imageService): libraryService {

    return {
        async listLibraries() {
            const result=await repository.getLibraries()
            return result
        },
        async getLibraryWithId(id:string) {
            const result=await repository.getLibraryById(id)
            if (result.data && result.data.length !== 0) {
                if (result.data[0].photos == undefined || result.data[0].photos == "0") {
                    const img = ""
                    const returnData = { img: img, ...result.data }
                    return { success: result.success, data: returnData }
                }
                if (result.data[0].photos == "1") {
                    const img = await imagehandler.getImage(result.data[0].id + "@libaryPicture.png")
                    const returnData = { img: img.data, ...result.data }
                    return { success: result.success, data: returnData }
                }
            }
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
            const file=formdata.get("file")
            formdata.delete("file")
            const dataObject  = Object.fromEntries(formdata.entries());
            const librarydata =dataObject as unknown as postLibraryData
            if(file !==null){
               librarydata.photos="1"
            }
            const createdAt = new Date().toString()
            const result = await repository.createLibrary({...librarydata, createdAt: createdAt, isVisible: true})
            if(file !==null){
                if (result.success && result.data){

                        const key= result.data[0].id+"@libaryPicture.png"
                        await imagehandler.putImage(key,file)
                        
                }
            }
            return result
        },
         async editLibrary(id:string,formdata:any) {
            const file=formdata.get("file")
            formdata.delete("file")
            const dataObject  = Object.fromEntries(formdata.entries());
            const librarydata =dataObject as unknown as postLibraryData
            if(file !==null)librarydata.photos="1"
            const result=await repository.editLibrary(id,librarydata)
            if(file !==null){
                if (result.success && result.data){
                    const key= result.data[0].id+"@libaryPicture.png"
                    await imagehandler.putImage(key,file)
                }
            }
            // just incase it will alwayst try to delete the photo here if photos is = 0
            else if(librarydata.photos)if(librarydata.photos=="0"){
                if (result.success && result.data){
                    const key= result.data[0].id+"@libaryPicture.png"
                    await imagehandler.deleteImage(key)
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

