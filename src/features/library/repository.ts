import {eq,and, lte, gte} from "drizzle-orm";
import {libraries,library } from "../../db/schema";
import { singletonMaster } from "@/utils/singletonBuilder"
import { databaseLibraryData, libraryRepository } from "@/types/library";

export function createLibraryRepository(db:any):libraryRepository{
  return{
    
    async getLibraries(){
  try {
    const result: library[] = await db.select().from(libraries);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting libraries' }
  }
},

  async createLibrary(data: databaseLibraryData) {
    try {
      /*console.log(data)*/
      const result: library[] = await db.insert(libraries).values(data).returning();
      return { success: true, data: result }
    } catch (error) {
      console.error("createLibrary error: ", error)
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

  async getLibraryBycords(cordlat:number,cordlon:number){
  try {
    const result : library[]  =  await db.select().from(libraries).where(
      and(
          gte(libraries.cordlat, cordlat-0.40),
          lte(libraries.cordlat, cordlat+0.40),
          gte(libraries.cordlon, cordlon-0.40),
          lte(libraries.cordlon, cordlon+0.40),
      ));
    return{success: true,data:result}
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



