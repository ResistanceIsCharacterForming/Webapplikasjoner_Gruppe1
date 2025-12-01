
import { postEndorsementData, postReviewData, review, reviewPhotoName, reviewService } from "@/types/reviews"
import { validateEditEndorsement, validateEditReview, validateId, validateNumberId, validatePostEndorsement, validatePostReview } from "@/utils/valueValidation";
import { singletonMaster } from "@/utils/singletonBuilder";

export function createReviewService(repository: any) :reviewService{
    const imagehandler = singletonMaster.imageService
    return {
        async getReviews(){
             const result=await repository.getReviews()
             return result
        },
        // creates a review with formdata that might have a file with it
         async createReview(formdata:any){
            if (!validatePostReview(formdata)) return Promise.reject("Failed to validate review.")
            //tries to get a file  and then removes it from formdata even if not there it will not affect anything 
            const file=formdata.get("file")
            formdata.delete("file")
            // make object from formdata
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as postReviewData
            // checks if a img exiest
            if(file !==null)data.photo="1"
            else data.photo="0"
            data.createdAt = new Date().toUTCString()
            const result=await repository.createReview(data)
            // checks if there is a file and if so it will upload it here
            if(file !==null){
                if (result.success && result.data){
                    const key= result.data[0].id+reviewPhotoName
                    await imagehandler.putImage(key,file)
                    }   
            }
            return result
        },
         async getReviewById(id:number){
            if (!validateNumberId.safeParse(id)) return Promise.reject("Failed to validate review id.")

            const result=await repository.getReviewById(id)
            //checks if the review has a photo and if so it will collect it
             if (result.data && result.data.length !== 0) {
                if (result.data[0].photo == undefined || result.data[0].photo == "0") {
                    const img = ""
                    return { success: true, data: { img: img, data:result.data } }
                }
                if (result.data[0].photo == "1") {
                    const img = await imagehandler.getImage(result.data[0].id + reviewPhotoName)
                    if(img.data != undefined) return { success: true, data: { img: img.data, data:result.data } }
                }
            }
            return {success:false}
        },
         async getReviewByUserId(id:string){
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result=await repository.getReviewByUserId(id)
            return result
        },
         async getReviewByLibraryId(id:string){
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate library id.")

            const result=await repository.getReviewByLibraryId(id)
            return result
        },
         async editReview(id:number,formdata :any){
            if (!validateEditReview(id, formdata)) return Promise.reject("Failed to validate review.")
            //tries to get a file  and then removes it from formdata even if not there it will not affect anything 
            const file=formdata.get("file")
            formdata.delete("file")
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown as Partial<review>
            // if there is a file it will make a photo and upload it
            if(file !==null){
                data.photo="1"
                const key= id+reviewPhotoName
                await imagehandler.putImage(key,file)
            }
            const result=await repository.editReview(id,data)
            return result
        },
         async deleteReviewById(id:number){
            if (!validateNumberId.safeParse(id)) return Promise.reject("Failed to validate review id.")

            const result=await repository.deleteReviewById(id)
            return result
        },
         async deleteReviewByUserId(id:string){
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result=await repository.deleteReviewByUserId(id)
            return result
        },
         async deleteReviewByLibraryId(id:string){
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate library id.")

            const result=await repository.deleteReviewByLibraryId(id)
            return result
        },

        // endorsment
         async getReviewsEndorsements(){
            const result=await repository.getReviewsEndorsements()
            return result
        },
         async createReviewEndorsement(formdata:any){
            if (!validatePostEndorsement(formdata)) return Promise.reject("Failed to validate endorsement.")
            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as postEndorsementData
            const result=await repository.createReviewEndorsement(data)
            // checks if succesfull and then will update targeted review to get new points
            if (result.succes){
                 const pointscheck = await repository.getReviewEndorsementByReviewId(data.reviewId)
                 const form = new FormData
                 form.append("reviewsPoints",pointscheck)
                if(pointscheck.data) repository.editReview(data.reviewId)
            }
            return result
        },
         async getReviewEndorsementById(id:number){
            if (!validateNumberId.safeParse(id)) return Promise.reject("Failed to validate endorsement id.")

            const result=await repository.getReviewEndorsementById(id)
            return result
        },
         async getReviewEndorsementByUserId(id:string){
            if (!validateId.safeParse(id)) return Promise.reject("Failed to validate user id.")

            const result=await repository.getReviewEndorsementByUserId(id)
            return result
        },
         async getReviewEndorsementByReviewId(id:number){
            const result=await repository.getReviewEndorsementByReviewId(id)
            return result
        },
         async editReviewEndorsement(id:number,formdata:any){
            if (!validateEditEndorsement(id, formdata)) return Promise.reject("Failed to validate endorsement.")

            const dataObject  = Object.fromEntries(formdata.entries());
            const data = dataObject as unknown  as Partial<postEndorsementData>
            const result=await repository.editReviewEndorsement(id,data)
            return result
        },
        async getReviewEndorsementByReviewIdAndUserId(id:number,userid:string){
            const result=await repository.getReviewEndorsementByReviewIdAndUserId(id,userid)
            return result
        },
         async deleteReviewEndorsementById(id:number){
            if (!validateNumberId.safeParse(id)) return Promise.reject("Failed to validate endorsement id.")
            const result=await repository.deleteReviewEndorsementById(id)
            return result
        },
          async deleteReviewEndorsementByReviewIdAndUserId(reviewid:number,userid:string){
            const result=await repository.deleteReviewEndorsementByReviewIdAndUserId(reviewid,userid)
            // checks if succesfull and then will update targeted review to get new points
              if (result.succes){
                 const pointscheck = await repository.getReviewEndorsementByReviewId(reviewid)
                 const form = new FormData
                 form.append("reviewsPoints",pointscheck)
                if(pointscheck.data) repository.editReview(reviewid)
            }
            return result
          }
    }

}