import { review, reviewEndorsement } from "@/db/schema"
import { postEndorsmentData, postReviewData } from "@/types/reviews"
import { imagehandler } from "@/types/image";
import { an } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

export function createReviewService(repository: any,imagehandler:imagehandler) {

    return {
        async getReviews(){
             const result=await repository.getReviews()
             return result
        },
         async createReview(formdata:any){
            const file=formdata.getAll("file")
            formdata.delete("file")
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as postReviewData
            let photos="0"
            if(file !==null){
               photos="1"
            }
            const createdAt = new Date().toUTCString()
            const result=await repository.createReview({data,photos,createdAt})
            if(file !==null){
                if (result.success && result.data){
                    const key= result.data[0].id+"@reviewPicture.png"
                    await imagehandler.putImage(key,file)
                    }   
            }
            return result
        },
         async getReviewById(id:number){
            const result=await repository.getReviewById(id)
            return result
        },
         async getReviewByUserId(id:string){
            const result=await repository.getReviewByUserId(id)
            return result
        },
         async getReviewByLibaryId(id:string){
            const result=await repository.getReviewByLibaryId(id)
            return result
        },
         async editReview(id:number,formdata :any){
            const file=formdata.getAll("file")
            formdata.delete("file")
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as Partial<review>
            if(file !==null){
                data.Photo="1"
                const key= id+"@reviewPicture.png"
                await imagehandler.putImage(key,file)
            }
            const result=await repository.editReview(id,data)
            return result
        },
         async deleteReviewById(id:number){
            const result=await repository.deleteReviewById(id)
            return result
        },
         async deleteReviewByUserId(id:string){
            const result=await repository.deleteReviewByUserId(id)
            return result
        },
         async deleteReviewByLibaryId(id:string){
            const result=await repository.deleteReviewByLibaryId(id)
            return result
        },

        // endorsment
         async getReviewsEndorsements(){
            const result=await repository.getReviewsEndorsements()
            return result
        },
         async createReviewEndorsement(formdata:any){
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as postEndorsmentData
           
            const result=await repository.createReviewEndorsement(data)
            return result
        },
         async getReviewEndorsementById(id:number){
            const result=await repository.getReviewEndorsementById(id)
            return result
        },
         async getReviewEndorsementByUserId(id:string){
            const result=await repository.getReviewEndorsementByUserId(id)
            return result
        },
         async getReviewEndorsementByReviewId(id:number){
            const result=await repository.getReviewEndorsementByReviewId(id)
            return result
        },
         async editReviewEndorsement(id:number,formdata:any){
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as Partial<postEndorsmentData>
            const result=await repository.editReviewEndorsement(id,data)
            return result
        },
         async deleteReviewEndorsementById(id:number){
            const result=await repository.deleteReviewEndorsementById(id)
            return result
        }
    }

}