import {and, eq} from "drizzle-orm";
import {report,reports} from "../../db/schema";
import { singletonMaster } from "@/utils/singletonBuilder"
import { reportRepository } from "@/types/reports";

export function createReportRepository(db: any): reportRepository{

  return{

  async getReports(){
  try {
    const result: report[] = await db.select().from(reports);
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting reports' }
  }
},

  async createReport(data :any){
  try {
    const result: report[] = await db.insert(reports).values(data).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed creating report' }
  }
},

 async editReport(id: number,data : any){
 try {
    const result : report[]= await db.update(reports).set(data).where(eq(reports.id, id)).returning();
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed edit report' }
  }
},

async getReportById(id: number){
  try {
    const result : report[] = await db.select().from(reports).where(eq(reports.id, id));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by id' }
  }
},

async getReportByType(type: string){
  try {
    const result : report[] = await db.select().from(reports).where(eq(reports.reportType, type));
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by type' }
  }
},

 async getReportByTypeAndLevel(type: string,level: number){
  try {
    const result : report[] = await db.select().from(reports).where(
        and(
            eq(reports.reportType, type),
            eq(reports.reportLevel, level)
        )
    );
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by type and level' }
  }
},

 async getReportByLevel(level: number){
  try {
    const result : report[] = await db.select().from(reports).where(eq(reports.reportLevel, level), );
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed getting report by level' }
  }
},

 async deleteReportById(id:number){
  try {
    await db.delete(reports).where(eq(reports.id,id)); 
    return { success: true }
    } catch (error) {
    return { success: false, error: 'Failed deleting report by id' }
    }
},

  }
}

