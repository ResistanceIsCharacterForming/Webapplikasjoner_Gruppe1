"use server"

import { singletonMaster } from "@/utils/singletonBuilder"

const report = singletonMaster.reportService
const user = singletonMaster.userService
const library = singletonMaster.libraryService
const review = singletonMaster.reviewService
const image = singletonMaster.ImageService
const token =singletonMaster.tokensService



export async function getLibrariesOfArea(lat:number,long:number) {
    const result = await library.listLibraryWithCords(lat,long)
    return result
}

export async function getLibraries() {
    const result = await library.listLibraries()
    return result
}

export async function createLibrary(data:FormData) {
    const result = await library.createLibrary(data)
    return result
}

export async function getLibrary(id:string) {
    const result = await library.getLibraryWithId(id)
    return result
    
}

export async function editLibrary(id:string,data:FormData) {
    const result = await library.editLibrary(id,data)
    return result
}


export async function getUser(id:string) {
     const result = await user.getUserById(id)
    return result
}


export async function getReview(id:number) {
    const result = await review.getReviewById(id)
    return result
}


