import { review, reviewEndorsement } from "@/db/schema";
import { apiResponse } from "./api";


export interface postReviewData  {
    text: string | null;
    userId: string;
    libaryId: string;
    file:File|null;
}
export interface postEndorsmentData  {
    userId: string;
    reviewId: number;
}

export interface reviewRepository {
  getReviews(): Promise<apiResponse<review[]>>;
  createReview(data : any): Promise<apiResponse<review[]>>;
  getReviewById(id:number): Promise<apiResponse<review[]>>;
  getReviewByUserId(id: string): Promise<apiResponse<review[]>>;
  getReviewByLibaryId(id: string): Promise<apiResponse<review[]>>;
  editReview(id:number,data:Partial<review>): Promise<apiResponse<review[]>>;
  deleteReviewById(id: number): Promise<apiResponse<void>>;
  deleteReviewByUserId(id: string): Promise<apiResponse<void>>;
  deleteReviewByLibaryId(id: string): Promise<apiResponse<void>>;
  // reviews endorsments
  getReviewsEndorsements(): Promise<apiResponse<reviewEndorsement[]>>;
  createReviewEndorsement(data : any): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementById(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByUserId(id: string): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByReviewId(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  editReviewEndorsement(id: number,data:Partial<reviewEndorsement>): Promise<apiResponse<reviewEndorsement[]>>;
  deleteReviewEndorsementById(id: number): Promise<apiResponse<void>>;
}

export interface reviewService {
  getReviews(): Promise<apiResponse<review[]>>;
  createReview(data:any): Promise<apiResponse<review[]>>;
  getReviewById(id:number): Promise<apiResponse<review[]>>;
  getReviewByUserId(id: string): Promise<apiResponse<review[]>>;
  getReviewByLibaryId(id: string): Promise<apiResponse<review[]>>;
  editReview(id:number,data:any): Promise<apiResponse<review[]>>;
  deleteReviewById(id: number): Promise<apiResponse<void>>;
  deleteReviewByUserId(id: string): Promise<apiResponse<void>>;
  deleteReviewByLibaryId(id: string): Promise<apiResponse<void>>;
  // reviews endorsments
  getReviewsEndorsements(): Promise<apiResponse<reviewEndorsement[]>>;
  createReviewEndorsement(data:any): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementById(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByUserId(id: string): Promise<apiResponse<reviewEndorsement[]>>;
  getReviewEndorsementByReviewId(id: number): Promise<apiResponse<reviewEndorsement[]>>;
  editReviewEndorsement(id: number,data:Partial<reviewEndorsement>): Promise<apiResponse<reviewEndorsement[]>>;
  deleteReviewEndorsementById(id: number): Promise<apiResponse<void>>;
}
