import {and, eq} from "drizzle-orm";
import {report,reports} from "../../db/schema";
import { db } from "../../db/index";

// raports
export const getReports = async () => {
  try {
    const result: report[] = await db.select().from(reports);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting reports' }
  }
}

export const createReport = async (data : any) => {
  try {
    const result: report[] = await db.insert(reports).values(data).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed creating report' }
  }
}

export const editReport = async (id: number,data : any) => {
 try {
    const result : report[]= await db.update(reports).set(data).where(eq(reports.id, id)).returning();
    return { succes :true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed edit report' }
  }
}

export const getReportById = async (id: number) => {
  try {
    const result : report[] = await db.select().from(reports).where(eq(reports.id, id));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by id' }
  }
}

export const getReportByType = async (type: string) => {
  try {
    const result : report[] = await db.select().from(reports).where(eq(reports.raportType, type));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by type' }
  }
}

export const getReportByTypeAndLevel = async (type: string,level: number) => {
  try {
    const result : report[] = await db.select().from(reports).where(
        and(
            eq(reports.raportType, type),
            eq(reports.raportLevel, level)
        )
    );
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by type and level' }
  }
}

export const getReportByLevel = async (level: number) => {
  try {
    const result : report[] = await db.select().from(reports).where(eq(reports.raportLevel, level), );
    return { success: true, data: result }
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

