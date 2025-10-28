import {eq} from "drizzle-orm";
import {libraries, library,review,reviews,reviewEndorsement,reviewsEndorsements} from "../../db/schema";
import { db } from "../../db/index";
import { date } from "drizzle-orm/pg-core";



// Libraries
export const getLibraries = async () => {
  try {
    const restult: library[] = await db.select().from(libraries);
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting libraries' }
  }
}

export const createLibrary = async (data : any) => {
  try {
    const restult: library[] = await db.insert(libraries).values({
        userId: data.userId,
        name: data.name,
        text: data.text,
        cordlat: data.cordlat,
        cordlon: data.cordlon,
        books: data.books,
        createdAt: data.createdAt,
        photos: data.photos,  
    }).returning();
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed creating libary' }
  }
}

export const editLibrary = async (id: string,data : any) => {
 try {
    const restult : library[]= await db.update(libraries).set(data).where(eq(libraries.id, id)).returning();
    return { succes :true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed edit' }
  }
}

export const getLibrariesById = async (id: string) => {
  try {
    const restult : library[] = await db.select().from(libraries).where(eq(libraries.id, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting libary by id' }
  }
}

export const getLibrariesByUserId = async (id: string) => {
  try {
    const restult : library[] = await db.select().from(libraries).where(eq(libraries.userId, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting libary by id' }
  }
}

export const deleteLibrariesById = async (id: string) => {
  try {
    await db.delete(libraries).where(eq(libraries.id, id)); 
    return { success: true }
    } catch (error) {
    return { success: false, error: 'Failed deleting libary by id' }
    }
}

export const deleteLibrariesByUserId = async (id: string) => {
  try {
    await db.delete(libraries).where(eq(libraries.userId, id)); 
    return { success: true }
    } catch (error) {
    return { success: false, error: 'Failed deleting libary by user id' }
    }
}


// reveiws 
export const getReviews = async () => {
  try {
    const restult : review[] = await db.select().from(reviews);
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting reviews' }
  }
}

export const createReview = async (data : any) => {
  try {
    const restult : review[]  = await db.insert(reviews).values({
        userId: data.userId,
        libaryId: data.libaryId,
        text: data.text,
        reviewsPoints: data.reviewsPoints,
        createdAt: data.createdAt,
        Photo: data.Photo,
    }).returning();
    return { success: true, data: restult }
  }
    catch (error) {
    return { success: false, error: 'Failed creating review' }
  }
}

export const getReviewById = async (id:number) => {
  try {
    const restult : review[]  =  await db.select().from(reviews).where(eq(reviews.id, id));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting review by id"}
  }
}

export const getReviewByUserId = async (id:string) => {
  try {
    const restult : review[]  =  await db.select().from(reviews).where(eq(reviews.userId, id));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting review by user id"}
  }
}

export const getReviewByLiibaryId = async (id:string) => {
  try {
    const restult : review[]  =  await db.select().from(reviews).where(eq(reviews.libaryId, id));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting review by libary id"}
  }
}

export const editReview = async (id:number,data:any) => {
  try {
    const restult: review[] = await db.update(reviews).set(data).where(eq(reviews.id, id)).returning();
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed to edit reveiw"}
  }
}

export const deleteReviewById = async (id:number) => {
  try {
    await db.delete(reviews).where(eq(reviews.id,id));
    return{success: true}
  }
  catch (error){
    return{success:false,error:"failed to delete review"}
  }
}


// reveiws endorsments
export const getReviewsEndorsements = async () => {
  try {
    const restult:reviewEndorsement[] = await db.select().from(reviewsEndorsements);
    return { success: true, restult: reviewsEndorsements }
  } catch (error) {
    return { success: false, error: 'Failed getting reviewsEndorsements' }
  }
}

export const createReviewEndorsement = async (data : any) => {
  try {
    const restult : reviewEndorsement[] = await db.insert(reviewsEndorsements).values({
       reviewId : data.reviewId,
       userId: data.userId,
       score: data.score
    }).returning();
    return { success: true, data: restult }
  }
    catch (error) {
    return { success: false, error: 'Failed creating reviewEndorsement' }
  }
}

export const getReviewEndorsementById = async (id:number) => {
  try {
    const restult : reviewEndorsement[] =  await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.id, id));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting reviewEndorsement by id"}
  }
}

export const getReviewEndorsementByUserId = async (id:string) => {
  try {
    const restult : reviewEndorsement[] =  await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.userId, id));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting reviewEndorsement by user id"}
  }
}

export const getReviewEndorsementByReviewId = async (id:number) => {
  try {
    const restult : reviewEndorsement[] =  await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.reviewId, id));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting reviewEndorsement by review id"}
  }
}

export const editReviewEndorsement = async (id:number,data:any) => {
  try {
    const restult : reviewEndorsement[] = await db.update(reviewsEndorsements).set(data).where(eq(reviewsEndorsements.id, id)).returning();
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed to edit reviewEndorsement"}
  }
}

export const deleteReviewEndorsementById = async (id:number) => {
  try {
    await db.delete(reviewsEndorsements).where(eq(reviewsEndorsements.id,id));
    return{success: true}
  }
  catch (error){
    return{success:false,error:"failed to delete reviewEndorsement"}
  }
}

