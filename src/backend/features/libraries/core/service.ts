import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";
import { validateEditLibrary, validateId, validateLatitude, validateLongitude, validatePostLibrary } from "@/backend/features/shared/zod/valueValidation";
import { libraryRepository, libraryService, deafultLibaryPhotoName, LibaryPhotoName, postLibraryData } from "@/backend/types/library";
import { libraryPhoto } from "@/db/base64backups";


export function createLibraryService(repository: libraryRepository): libraryService {
    const imagehandler = singletonMaster.imageService
    return {
        async listLibraries() {
            const result=await repository.getLibraries()
            return result
        },
        // it will find the libary and then retrun it with its own photo or a base photo
        async getLibraryWithId(id:string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate library id.")
            const result=await repository.getLibraryById(id)
            // it will check the result and read make sure it got some data back succesfully it will also return the libary photo
            if (result.data && result.data.length !== 0) {
                // it will return the libary with the base library photo
                if (result.data[0].photos == undefined || result.data[0].photos == "0") {
                    const img = await imagehandler.getImage(deafultLibaryPhotoName)
                    if(img.data != undefined)return { success: result.success, data: { img: img.data, data:result.data[0] } }
                    // defaults to a base64 string of userimg as backup
                    else return { success: result.success, data:{ img: libraryPhoto,data:result.data[0] } }
                }
                //it will return the library with its own picture
                else if (result.data[0].photos == "1") {
                    const img = await imagehandler.getImage(result.data[0].id + LibaryPhotoName)
                    if(img.data != undefined)return { success: result.success, data:{ img: img.data,data:result.data[0] } }
                    // defaults to a base64 string of userimg as backup
                    else return { success: result.success, data:{ img: libraryPhoto,data:result.data[0] } }
                }
                // defaults to a base64 string of userimg as backup we do this do to issues with seeding r2 with photos as redwoodskd has not implmentet a file system
            }
            
            return { success: false}
        },
        async listLibraryWithUserId(id:string) {
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result=await repository.getLibraryByUserId(id)
            return result
        },
        // return a list of all libarays within 0.40 cords and is visable we decided the scale to be static as thats the best for our use at the moment
        async listLibraryWithCords(lat:number,long:number) {
            if (!validateLatitude.safeParse(lat)) return Promise.reject("Failed to validate latitude.")
            if (!validateLongitude.safeParse(long)) return Promise.reject("Failed to validate longitude.")

            const result=await repository.getLibraryByCords(lat,long)
            return result
        },
        async createLibrary( formdata: any ) {
            if (!validatePostLibrary(formdata)) return Promise.reject("Failed to validate library.")
            //get the file and then removes it from formdata
            const file=formdata.get("file")
            formdata.delete("file")
            const dataObject  = Object.fromEntries(formdata.entries());
            const librarydata =dataObject as unknown as postLibraryData
            if(file !==null){
               librarydata.photos="1"
            }
            const createdAt = new Date().toString()
            const result = await repository.createLibrary({...librarydata, createdAt: createdAt, isVisible: true})
            //chekcs if a file was uploaded and if so checks if it mange to post libary and will then upload the photo to our r2 database
            if(file !==null){
                if (result.success && result.data){
                        const key= result.data[0].id+LibaryPhotoName
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
                    const key= result.data[0].id+LibaryPhotoName
                    await imagehandler.putImage(key,file)
                }
            }
            // just incase it will alwayst try to delete the photo here if photos is = 0
            else if(librarydata.photos)if(librarydata.photos=="0"){
                if (result.success && result.data){
                    const key= result.data[0].id+LibaryPhotoName
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

