import {eq} from "drizzle-orm";
import {review,reviews,reviewEndorsement,reviewsEndorsements} from "../../db/schema";
import { singletonMaster } from "@/utils/singletonBuilder"
import { postReviewData, reviewRepository } from "@/types/reviews";

export function createReviewRepository(db:any):reviewRepository{
  return{

async getReviews(){
  try {
    const result : review[] = await db.select().from(reviews);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting reviews' }
  }
},

async createReview(data : postReviewData){
  try {
    const result : review[]  = await db.insert(reviews).values(data).returning();
    return { success: true, data: result }
  }
    catch (error) {
    return { success: false, error: 'Failed creating review' }
  }
},

async getReviewById(id:number){
  try {
    const result : review[]  =  await db.select().from(reviews).where(eq(reviews.id, id))
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed getting review by id"}
  }
},


async getReviewByUserId(id:string){
  try {
    const result : review[]  =  await db.select().from(reviews).where(eq(reviews.userId, id));
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed getting review by user id"}
  }
},

async getReviewByLibraryId(id:string){
  try {
    const result : review[]  =  await db.select().from(reviews).where(eq(reviews.libraryId, id));
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed getting review by libary id"}
  }
},

async editReview(id:number,data:Partial<review>){
  try {
    const result: review[] = await db.update(reviews).set(data).where(eq(reviews.id, id)).returning();
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed to edit review"}
  }
},

async deleteReviewById(id:number){
  try {
    await db.delete(reviews).where(eq(reviews.id,id));
    return{success: true}
  }
  catch (error){
    return{success:false,error:"failed to delete review"}
  }
},

async deleteReviewByUserId(id:string){
  try {
    await db.delete(reviews).where(eq(reviews.userId,id));
    return{success: true}
  }
  catch (error){
    return{success:false,error:"failed to delete review"}
  }
},

async deleteReviewByLibraryId(id:string){
  try {
    await db.delete(reviews).where(eq(reviews.libraryId,id));
    return{success: true}
  }
  catch (error){
    return{success:false,error:"failed to delete review"}
  }
},

// reviews endorsements

async getReviewsEndorsements(){
  try {
    const result:reviewEndorsement[] = await db.select().from(reviewsEndorsements);
    return { success: true, data:result }
  } catch (error) {
    return { success: false, error: 'Failed getting reviewsEndorsements' }
  }
},

async createReviewEndorsement(data : any){
  try {
    const result : reviewEndorsement[] = await db.insert(reviewsEndorsements).values({
       reviewId : data.reviewId,
       userId: data.userId,
    }).returning();
    return { success: true, data: result }
  }
    catch (error) {
    return { success: false, error: 'Failed creating reviewEndorsement' }
  }
},

async getReviewEndorsementById(id:number){
  try {
    const result : reviewEndorsement[] =  await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.id, id));
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed getting reviewEndorsement by id"}
  }
},

async getReviewEndorsementByUserId(id:string){
  try {
    const result : reviewEndorsement[] =  await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.userId, id));
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed getting reviewEndorsement by user id"}
  }
},

async getReviewEndorsementByReviewId(id:number){
  try {
    const result : reviewEndorsement[] =  await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.reviewId, id));
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed getting reviewEndorsement by review id"}
  }
},

async editReviewEndorsement(id:number,data:Partial<reviewEndorsement>){
  try {
    const result : reviewEndorsement[] = await db.update(reviewsEndorsements).set(data).where(eq(reviewsEndorsements.id, id)).returning();
    return{success: true,data:result}
  }
  catch (error){
    return{success:false,error:"failed to edit reviewEndorsement"}
  }
},

async deleteReviewEndorsementById(id:number){
  try {
    await db.delete(reviewsEndorsements).where(eq(reviewsEndorsements.id,id));
    return{success: true}
  }
  catch (error){
    return{success:false,error:"failed to delete reviewEndorsement"}
  }
},
  }

}

