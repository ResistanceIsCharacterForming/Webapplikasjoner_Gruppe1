"use client"
import { report } from "@/types/reports"
import { deleteLibraryFromReport, deleteReport, deleteReviewFromReport, deleteUserFromReport, RemoveLibraryImage, setNotVisibleLibraryFromReport, setNotVisibleUserFromReport, settUserProfileToBasic } from "../hooks/adminActions"
import { useState } from "react"

   const buttonstyle="text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

export const Reports = (report:report) => {
     const [ishidden, setIsHidden] = useState<boolean>(false)
     const [expand, setexpand] = useState("expand")

    const HandleDelete = () => {
        deleteReport(report.id)
    }
    const HandleDeleteOwner = () => {
        if (report.reportType=="User")
            if (report.userId)
                deleteUserFromReport(report.userId)
        if (report.reportType=="library")
             if (report.libraryId)
                deleteLibraryFromReport(report.libraryId)
        if (report.reportType=="review")
             if (report.reviewId)
                deleteReviewFromReport(report.reviewId)
    }
    const HandleSettNotVisableOwner = () => {
        if (report.reportType=="User")
            if (report.userId)
                setNotVisibleUserFromReport(report.userId)
        if (report.reportType=="library")
             if (report.libraryId)
                setNotVisibleLibraryFromReport(report.libraryId)
    }
    const HandleSettUserProfileToBasic = () => {
        if (report.userId) settUserProfileToBasic(report.userId)
    }
    const handleRemoveLibraryImage=() => {
        if(report.libraryId) RemoveLibraryImage(report.libraryId)
    }
    let typebuttons
    let targetid
    if (report.reportType == "User") {
        targetid = report.userId
        typebuttons = (
            <>
                <button className={buttonstyle} onClick={HandleSettNotVisableOwner}>sett target not visable</button>
                <button className={buttonstyle} onClick={HandleSettUserProfileToBasic}>nullstill bruker navn og bilde</button>
            </>
        )
    }
    if (report.reportType == "library") {
        targetid = report.libraryId
        typebuttons = (
            <>
            <button className={buttonstyle} onClick={HandleSettNotVisableOwner}>sett target not visable</button>
            <button className={buttonstyle} onClick={handleRemoveLibraryImage}>remove image</button>
            </>
        )
    }
    if (report.reportType == "review") {
        targetid = report.reviewId
        typebuttons = (
            ""
        )
    }
    
     const handleExpand = () => {
        setIsHidden(!ishidden)
        if (ishidden) setexpand("expand")
        else setexpand("close")
    }
    return( 
        <article className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
        <p className="col-span-1 col-start-2">{report.id}</p>
        <p className="col-span-1">{report.reportLevel}</p>
        <p className="col-span-1">{report.reportType}</p>
        <p className="col-span-3">{report.createdAt}</p>
        <p className="col-span-5">{report.submitterUserId}</p>
        <p className="col-span-5">{targetid}</p>
         <button className="col-start-18" onClick={handleExpand}>{expand}</button>
         {ishidden && (
                    <div className="col-start-6 col-span-8">
                        <p>report:text</p> 
                        <p>{report.text}</p> 
                        <label>admin actions:</label> 
                        <button className={buttonstyle} onClick={HandleDelete}>delete Report</button>
                        <button className={buttonstyle} onClick={HandleDeleteOwner}>delete reported target</button>
                        {typebuttons}
                </div>)}
         </article>               
               
       
    )


}