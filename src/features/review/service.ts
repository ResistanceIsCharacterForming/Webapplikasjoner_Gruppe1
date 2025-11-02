import { review, reviewEndorsement } from "@/db/schema";
import { reviewRepository, reviewService } from "@/types/reviews";

export function createReviewService(repository:reviewRepository):reviewService {

    return {
        async getReviews(){
             const result=await repository.getReviews()
             return result
        },
         async createReview(userId:string,libaryId:string,text:string,reviewsPoints:number,photos:string){
            const createdAt = new Date().toUTCString()
            const result=await repository.createReview({userId,libaryId,text,reviewsPoints,photos,createdAt})
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
         async editReview(id:number,data :Partial<review>){
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
         async createReviewEndorsement(userId:string,reviewId:number){
            const result=await repository.createReviewEndorsement({userId,reviewId})
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
         async editReviewEndorsement(id:number,data: Partial<reviewEndorsement>){
            const result=await repository.editReviewEndorsement(id,data)
            return result
        },
         async deleteReviewEndorsementById(id:number){
            const result=await repository.deleteReviewEndorsementById(id)
            return result
        }
    }

}