
import { imageService } from "@/types/image";
import { libraryService, libraryRepository, postLibraryData } from "@/types/library"
import { validateEditLibrary, validateId, validateLatitude, validateLongitude, validatePostLibrary } from "@/utils/valueValidation";


export function createLibraryService(repository: libraryRepository,imagehandler:imageService): libraryService {
    return {
        async listLibraries() {
            const result=await repository.getLibraries()
            return result
        },
        async getLibraryWithId(id:string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate library id.")

            const result=await repository.getLibraryById(id)
            if (result.data && result.data.length !== 0) {
                if (result.data[0].photos == undefined || result.data[0].photos == "0") {
                    return { success: result.success, data: { img: "deafult img?", data:result.data[0] } }
                }
                if (result.data[0].photos == "1") {
                    const img = await imagehandler.getImage(result.data[0].id + "@libaryPicture.png")
                    if(img.data != undefined)return { success: result.success, data:{ img: img.data,data:result.data[0] } }
                }
            }
            return { success: false}
        },
        async listLibraryWithUserId(id:string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result=await repository.getLibraryByUserId(id)
            return result
        },
        async listLibraryWithCords(lat:number,long:number) {
            if (!validateLatitude.safeParse(lat)) return Promise.reject("Failed to validate latitude.")
            if (!validateLongitude.safeParse(long)) return Promise.reject("Failed to validate longitude.")

            const result=await repository.getLibraryByCords(lat,long)
            return result
        },
        async createLibrary( formdata: any ) {
            if (!validatePostLibrary(formdata)) return Promise.reject("Failed to validate library.")

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
            if (!validateEditLibrary(id, formdata)) return Promise.reject("Failed to validate library.")

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
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate library id.")

            const result=await repository.deleteLibraryById(id)
            return result
        },
         async deleteLibraryWithUserId(id:string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result=await repository.deleteLibrariesByUserId(id)
            return result
        }
    }

}

