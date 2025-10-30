import {eq,and, lte, gte} from "drizzle-orm";
import {libraries, library} from "../../db/schema";
import { db } from "../../db/index";



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
    return { success: false, error: 'Failed edit libary' }
  }
}

export const getLibraryById = async (id: string) => {
  try {
    const restult : library[] = await db.select().from(libraries).where(eq(libraries.id, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting libary by id' }
  }
}

export const getLibraryByUserId = async (id:string) => {
  try {
    const restult : library[] = await db.select().from(libraries).where(eq(libraries.userId, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting libary by id' }
  }
}

export const getLibraryBycords = async (maxlon:number,minlon:number,maxlat:number,minlat:number) => {
  try {
    const restult : library[]  =  await db.select().from(libraries).where(
      and(
          gte(libraries.cordlat, minlat),
          lte(libraries.cordlat, maxlat),
          gte(libraries.cordlon, minlon),
          lte(libraries.cordlon, maxlon),
      ));
    return{success: true,restult}
  }
  catch (error){
    return{success:false,error:"failed getting review by id"}
  }
}

export const deleteLibraryById = async (id:string) => {
  try {
    await db.delete(libraries).where(eq(libraries.id,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
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

