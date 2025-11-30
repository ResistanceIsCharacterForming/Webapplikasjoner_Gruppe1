
import { reviews } from "@/db/schema";
import { apiResponse } from "./api";
import { reviewsEndorsements } from "@/db/schema/reviewsEndorsement-schema";


export interface postReviewData  {
    text: string | null;
    userId: string;
    libraryId: string;
    reviewsPoints: number;
    createdAt:string|null
    file:File|null;
    photo:string|null
}
export interface postEndorsementData  {
    userId: string;
    reviewId: number;
}

export interface reviewRepository {
  getReviews(): Promise<apiResponse<review[]>>;
  createReview(data : any): Promise<apiResponse<review[]>>;
  getReviewById(id:number): Promise<apiResponse<review[]>>;
  getReviewByUserId(id: string): Promise<apiResponse<review[]>>;
  getReviewByLibraryId(id: string): Promise<apiResponse<review[]>>;
  editReview(id:number,data:Partial<review>): Promise<apiResponse<review[]>>;
  deleteReviewById(id: number): Promise<apiResponse<void>>;
  deleteReviewByUserId(id: string): Promise<apiResponse<void>>;
  deleteReviewByLibraryId(id: string): Promise<apiResponse<void>>;
  // reviews endorsements
  getReviewsEndorsements(): Promise<apiResponse<reviewEndorsement[]>>;
  createReviewEndorsement(data : any): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementById(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByUserId(id: string): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByReviewId(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByReviewIdAndUserId(reviewid:number,userid:string):Promise<apiResponse<void>>;
  editReviewEndorsement(id: number,data:Partial<reviewEndorsement>): Promise<apiResponse<reviewEndorsement[]>>;
  deleteReviewEndorsementById(id: number): Promise<apiResponse<void>>;
  deleteReviewEndorsementByReviewIdAndUserId(reviewid:number,userid:string):Promise<apiResponse<void>>;
}

export interface reviewService {
  getReviews(): Promise<apiResponse<review[]>>;
  createReview(data:any): Promise<apiResponse<review[]>>;
  getReviewById(id:number): Promise<apiResponse<{img:string,data:review}>>;
  getReviewByUserId(id: string): Promise<apiResponse<review[]>>;
  getReviewByLibraryId(id: string): Promise<apiResponse<review[]>>;
  editReview(id:number,data:any): Promise<apiResponse<review[]>>;
  deleteReviewById(id: number): Promise<apiResponse<void>>;
  deleteReviewByUserId(id: string): Promise<apiResponse<void>>;
  deleteReviewByLibraryId(id: string): Promise<apiResponse<void>>;
  // reviews endorsments
  getReviewsEndorsements(): Promise<apiResponse<reviewEndorsement[]>>;
  createReviewEndorsement(data:any): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementById(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByUserId(id: string): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByReviewId(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByReviewIdAndUserId(reviewid:number,userid:string):Promise<apiResponse<void>>;
  editReviewEndorsement(id: number,data:Partial<reviewEndorsement>): Promise<apiResponse<reviewEndorsement[]>>;
  deleteReviewEndorsementById(id: number): Promise<apiResponse<void>>;
  deleteReviewEndorsementByReviewIdAndUserId(reviewid:number,userid:string):Promise<apiResponse<void>>;
}

export type review = typeof reviews.$inferSelect;
export type reviewEndorsement = typeof reviewsEndorsements.$inferSelect

export type reviewComponentData =  review & {
    reviewPhotos:string,
    liked:boolean,
    userName:string,
    userProfilePhoto:string,
}


export const reviewPhotoName="@reviewPicture.png"
