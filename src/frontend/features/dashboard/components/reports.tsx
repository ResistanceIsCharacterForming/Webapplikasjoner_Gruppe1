"use client"
import { useState } from "react"
import { report } from "@/backend/types/reports"
import { deleteUser, setNotVisibleUser, settUserProfileToBasic, 
    deleteLibraryFromReport, setNotVisibleLibraryFromReport, 
    RemoveLibraryImage, deleteReviewFromReport, deleteReport } from "@/backend/features/reports/utils/adminActions"


export const Reports = (report: report) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [expand, setexpand] = useState("utvid")
    const [hidden, setHiden] = useState("")

    // buttons for each type of report there is as they each have their own actions
    let typebuttons
    let typeid
    if (report.reportType.toLowerCase() == "user" && report.userId != null) {
        const targetid = report.userId
        typeid = targetid
        typebuttons = (
            <>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => { deleteUser(targetid); setHiden("hidden") }}>slett rapportert bruker</button>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => setNotVisibleUser(targetid)}>sett rapportert bruker som usynlig</button>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => settUserProfileToBasic(targetid)}>nullstill brukernavn og bilde</button>
                 <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                     onClick={() => { deleteReport(report.id); setHiden("hidden") }}>delete rapport</button>
            </>
        )
    }
    if (report.reportType.toLowerCase() == "library" && report.libraryId != null) {
        const targetid = report.libraryId
        typeid = targetid
        typebuttons = (
            <>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => { deleteLibraryFromReport(targetid); setHiden("hidden") }}>slett rapportert Bibliotek</button>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => setNotVisibleLibraryFromReport(targetid)}>sett rapportert Bibliotek usynlig</button>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => RemoveLibraryImage(targetid)}>fjern bilde</button>
                 <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                     onClick={() => { deleteReport(report.id); setHiden("hidden") }}>delete rapport</button>
            </>
        )
    }
    if (report.reportType.toLowerCase() == "review" && report.reviewId != null) {
        const targetid = report.reviewId
        typeid = targetid
        typebuttons = (
            <>
                <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                 onClick={() => { deleteReviewFromReport(targetid); setHiden("hidden") }}>slett rapportert Anmeldelse</button>
                 <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                     onClick={() => { deleteReport(report.id); setHiden("hidden") }}>delete rapport</button>
            </>
        )
    }
    // handle the close and opening of report
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
        if (isExpanded) setexpand("utvid")
        else setexpand("lukk")
    }
    return (
        <article className={"h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1" + hidden}>
            <p className="col-span-1 col-start-2">{report.id}</p>
            <p className="col-span-1">{report.reportLevel}</p>
            <p className="col-span-1">{report.reportType}</p>
            <p className="col-span-3">{report.createdAt}</p>
            <p className="col-span-5">{report.submitterUserId}</p>
            <p className="col-span-5">{typeid}</p>
            <button className="col-start-18" onClick={() => handleExpand()}>{expand}</button>
            {isExpanded && (
                <div className="col-start-6 col-span-8">
                    <p>rapport tekst:</p>
                    <p>{report.text}</p>
                    <label>adminhandlinger: <br /></label>
                    {typebuttons}
                    <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
                     onClick={() => { deleteReport(report.id); setHiden("hidden") }}>delete rapport</button>
                </div>)}
        </article>


    )


}