import {eq} from "drizzle-orm";
import {libraries, library} from "../../db/schema";
import { db } from "../../db/index";




export const getlibraries = async () => {
  try {
    const returnlibraries: library[] = await db.select().from(libraries);
    return { success: true, data: returnlibraries }
  } catch (error) {
    return { success: false, error: 'Failed getting libraries' }
  }
}

export const create = async (data : any) => {
  try {
    const libary = await db.insert(libraries).values({
        userId: data.userId,
        name: data.name,
        text: data.text,
        cordinats: data.cordinats,
        books: data.books,
        createdAt: data.createdAt,
    }).returning();
    return { success: true, data: libary }
  } catch (error) {
    return { success: false, error: 'Failed creating libary' }
  }
}


export const edit = async (id: string,data : any) => {
 try {
    return { succes :false}
  } catch (error) {
    return { success: false, error: 'Failed edit' }
  }
}
export const getbyid = async (id: string) => {
  try {
    const libary = await db.select().from(libraries).where(eq(libraries.id, id));
    return { success: true, data: libary }
  } catch (error) {
    return { success: false, error: 'Failed getting libary by id' }
  }
}

export const deletebyid = async (id: string) => {
  try {
    await db.delete(libraries).where(eq(libraries.id, id)); 
    return { success: true }
    } catch (error) {
    return { success: false, error: 'Failed deleting libary by id' }
    }
}