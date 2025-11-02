import {eq,and, lte, gte} from "drizzle-orm";
import {libraries,library } from "../../db/schema";
import { singletonMaster } from "@/utils/singletonBuilder"
import { libraryRepository } from "@/types/library";

export function createLibraryRepository():libraryRepository{

  const db = singletonMaster.dbConnection

  return{
    
    async getLibraries(){
  try {
    const result: library[] = await db.select().from(libraries);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting libraries' }
  }
},

  async createLibrary(userId:string,name: string,text: string,cordlat: number,cordlon: number,books: string,createdAt:string,photos:string){
  try {
    const result: library[] = await db.insert(libraries).values({
        userId: userId,
        name: name,
        text: text,
        cordlat: cordlat,
        cordlon: cordlon,
        books: books,
        createdAt: createdAt,
        photos: photos,  
    }).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed creating library' }
  }
},

  async editLibrary(id: string,data : Partial<library>){
 try {
    const result : library[]= await db.update(libraries).set(data).where(eq(libraries.id, id)).returning();
    return { success :true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed edit library' }
  }
},

  async getLibraryById(id: string){
  try {
    const result : library[] = await db.select().from(libraries).where(eq(libraries.id, id));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting library by id' }
  }
},

  async getLibraryByUserId(id:string){
  try {
    const result : library[] = await db.select().from(libraries).where(eq(libraries.userId, id));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting library by id' }
  }
},

  async getLibraryBycords(maxlon:number,minlon:number,maxlat:number,minlat:number){
  try {
    const result : library[]  =  await db.select().from(libraries).where(
      and(
          gte(libraries.cordlat, minlat),
          lte(libraries.cordlat, maxlat),
          gte(libraries.cordlon, minlon),
          lte(libraries.cordlon, maxlon),
      ));
    return{success: true,result}
  }
  catch (error){
    return{success:false,error:"failed getting review by id"}
  }
},

  async deleteLibraryById(id:string){
  try {
    await db.delete(libraries).where(eq(libraries.id,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting library by id' }
    }
},

  async deleteLibrariesByUserId(id: string){
  try {
    await db.delete(libraries).where(eq(libraries.userId, id)); 
    return { success: true }
    } catch (error) {
    return { success: false, error: 'Failed deleting library by user id' }
    }
},


}

}



