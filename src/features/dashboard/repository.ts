import {eq} from "drizzle-orm";
import {admin,admins} from "../../db/schema";
import { db } from "../../db/index";
import { adminRepository } from "@/types/admins";

export function createAdminRepository():adminRepository{
  return{

  async getAdmins(){
  try {
    const result: admin[] = await db.select().from(admins);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting admins' }
  }
  },

  async createAdmin(userId:string,createdAt:string,adminLevel:number){
  try {
    const result: admin[] = await db.insert(admins).values({
        userId: userId,
        createdAt: createdAt,
        adminLevel: adminLevel,
    }).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed creating admin' }
  }
},

async editAdmin(id: string,data : any){
 try {
    const result : admin[]= await db.update(admins).set(data).where(eq(admins.userId, id)).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed edit admin' }
  }
},

async getAdminById(id: string){
  try {
    const result : admin[] = await db.select().from(admins).where(eq(admins.userId, id));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting admin by id' }
  }
},

async deleteAdminById(id:string){
  try {
    await db.delete(admins).where(eq(admins.userId,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting admin by id' }
    }
},
  }
  
}


