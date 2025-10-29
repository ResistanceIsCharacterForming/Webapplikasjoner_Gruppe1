import {and, eq} from "drizzle-orm";
import {admin,admins,report,reports} from "../../db/schema";
import { db } from "../../db/index";



export const getAdmins = async () => {
  try {
    const restult: admin[] = await db.select().from(admins);
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting admins' }
  }
}

export const createAdmin = async (data : any) => {
  try {
    const restult: admin[] = await db.insert(admins).values({
        userId: data.userId,
        createdAt: data.createdAt,
        adminLevel: data.adminLevel,
    }).returning();
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed creating admin' }
  }
}

export const editAdmin = async (id: string,data : any) => {
 try {
    const restult : admin[]= await db.update(admins).set(data).where(eq(admins.userId, id)).returning();
    return { succes :true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed edit admin' }
  }
}

export const getAdminById = async (id: string) => {
  try {
    const restult : admin[] = await db.select().from(admins).where(eq(admins.userId, id));
    return { success: true, data: restult }
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

export const getReports = async () => {
  try {
    const restult: report[] = await db.select().from(reports);
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting reports' }
  }
}

export const createReport = async (data : any) => {
  try {
    const restult: report[] = await db.insert(reports).values(data).returning();
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed creating report' }
  }
}

export const editReport = async (id: number,data : any) => {
 try {
    const restult : report[]= await db.update(reports).set(data).where(eq(reports.id, id)).returning();
    return { succes :true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed edit report' }
  }
}

export const getReportById = async (id: number) => {
  try {
    const restult : report[] = await db.select().from(reports).where(eq(reports.id, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting report by id' }
  }
}

export const getReportByType = async (type: string) => {
  try {
    const restult : report[] = await db.select().from(reports).where(eq(reports.raportType, type));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting report by type' }
  }
}

export const getReportByTypeAndLevel = async (type: string,level: number) => {
  try {
    const restult : report[] = await db.select().from(reports).where(
        and(
            eq(reports.raportType, type),
            eq(reports.raportLevel, level)
        )
    );
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting report by type and level' }
  }
}

export const getReportByLevel = async (level: number) => {
  try {
    const restult : report[] = await db.select().from(reports).where(eq(reports.raportLevel, level), );
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting report by level' }
  }
}


export const deleteReportById = async (id:number) => {
  try {
    await db.delete(reports).where(eq(reports.id,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting report by id' }
    }
}

