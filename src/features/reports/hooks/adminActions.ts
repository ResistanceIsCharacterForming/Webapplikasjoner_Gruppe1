"use server"

import { singletonMaster } from "@/utils/singletonBuilder"
import { useRandomNameGenerator } from "./universal/useRandomNameGenerator"

const report = singletonMaster.reportService
const user = singletonMaster.userService
const library = singletonMaster.libraryService

export async function deleteReviewFromReport(id: number) {
    const result = await report.deleteReport(id)
}

export async function deleteReport(id: number) {
   const result = await report.deleteReport(id)
}

export async function deleteUserFromReport(id: string) {
    const result = await user.deleteUserByid(id)
}

export async function deleteLibraryFromReport(id: string) {
    const result = await library.deleteLibraryWithId(id)
}

export async function setNotVisibleLibraryFromReport(id: string) {
    const data = new FormData
    data.append("isVisible", "0")
    const result = await library.editLibrary(id,data)
}

export async function setNotVisibleUserFromReport(id: string) {
    const data = new FormData
    data.append("isVisible", "0")
    const result = await user.editUserById(id,data)
}


export async function settUserProfileToBasic(id: string) {
    const data = new FormData
    data.append("name", useRandomNameGenerator() )
    data.append("profileImage", "0")
    const result = await user.editUserById(id,data)
}

export async function RemoveLibraryImage(id: string) {
    const data = new FormData
    data.append("photos", "0")
    library.editLibrary(id,data)

}

export async function getReports(type?:string,level?:number) {
    if (type && level){
        const result = await report.getReportsWithTypeAndLevel(type,level)
        let reports = result.data
        return reports;
    }
    else if (type){
        const result = await report.getReportsWithType(type)
        let reports = result.data
        return reports;
    }
    else if (level){
        const result = await report.getReportsWithlevel(level)
        let reports = result.data
        return reports;
    }
    else{
        const result = await report.getReports()
        let reports = result.data
        return reports;
    }  
}