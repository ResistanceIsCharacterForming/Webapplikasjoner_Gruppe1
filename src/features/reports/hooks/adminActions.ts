"use server"

import { singletonMaster } from "@/utils/singletonBuilder"
import { useRandomNameGenerator } from "../../tokens/useRandomNameGenerator"

const report = singletonMaster.reportService
const user = singletonMaster.userService
const library = singletonMaster.libraryService
const review = singletonMaster.reviewService


// split this up when refractoring 
export async function deleteReviewFromReport(id: number) {
    const result = await review.deleteReviewById(id)
}

export async function deleteReport(id: number) {
   const result = await report.deleteReport(id)
}

export async function deleteUser(id: string) {
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

export async function setNotVisibleUser(id: string) {
    const data = new FormData
    data.append("isVisible", "0")
    const result = await user.editUserById(id,data)
}

export async function setVisibleUser(id: string) {
    const data = new FormData
    data.append("isVisible", "1")
    const result = await user.editUserById(id,data)
}

export async function settUserProfileToBasic(id: string) {
    const data = new FormData
    data.append("name", useRandomNameGenerator() )
    data.append("profileImage", "0")
    const result = await user.editUserById(id,data)
    const reviewRemove = await review.deleteReviewByUserId(id)
}

export async function RemoveLibraryImage(id: string) {
    const data = new FormData
    data.append("photos", "0")
    library.editLibrary(id,data)

}

export async function makeUserAdmin(id:string) {
    user.createAdmin(id,2)
    
}

export async function removeAdminFromUser(id:string) {
    user.deleteAdmin(id)
    
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