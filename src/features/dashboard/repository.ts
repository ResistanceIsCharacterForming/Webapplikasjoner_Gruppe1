import {eq} from "drizzle-orm";
import {admin,admins} from "../../db/schema";
import { db } from "../../db/index";


//admins
export const getAdmins = async () => {
  try {
    const result: admin[] = await db.select().from(admins);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting admins' }
  }
}

export const createAdmin = async (data : any) => {
  try {
    const result: admin[] = await db.insert(admins).values({
        userId: data.userId,
        createdAt: data.createdAt,
        adminLevel: data.adminLevel,
    }).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed creating admin' }
  }
}

export const editAdmin = async (id: string,data : any) => {
 try {
    const result : admin[]= await db.update(admins).set(data).where(eq(admins.userId, id)).returning();
    return { succes :true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed edit admin' }
  }
}

export const getAdminById = async (id: string) => {
  try {
    const result : admin[] = await db.select().from(admins).where(eq(admins.userId, id));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting admin by id' }
  }
}

export const deleteAdminById = async (id:string) => {
  try {
    await db.delete(admins).where(eq(admins.userId,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting admin by id' }
    }
}
