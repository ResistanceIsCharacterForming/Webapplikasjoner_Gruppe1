"use client"
import { report } from "@/types/reports"
import { useState } from "react"
import { deleteLibraryFromReport, deleteReport, deleteReviewFromReport, deleteUserFromReport, RemoveLibraryImage, setNotVisibleLibraryFromReport, setNotVisibleUserFromReport, settUserProfileToBasic } from "../hooks/adminActions"


const buttonstyle = "text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

export const Reports = (report: report) => {
    const [ishidden, setIsHidden] = useState<boolean>(false)
    const [expand, setexpand] = useState("utvid")


    let typebuttons
    let typeid
    if (report.reportType.toLowerCase() == "user" && report.userId != null) {
        const targetid = report.userId
        typeid = targetid
        typebuttons = (
            <>
                <button className={buttonstyle} onClick={() => deleteUserFromReport(targetid)}>slett rapportert bruker</button>
                <button className={buttonstyle} onClick={() => setNotVisibleUserFromReport(targetid)}>sett rapportert bruker som usynlig</button>
                <button className={buttonstyle} onClick={() => settUserProfileToBasic(targetid)}>nullstill brukernavn og bilde</button>
            </>
        )
    }
    if (report.reportType.toLowerCase() == "library" && report.libraryId != null) {
        const targetid = report.libraryId
        typeid = targetid
        typebuttons = (
            <>
                <button className={buttonstyle} onClick={() => deleteLibraryFromReport(targetid)}>slett rapportert Bibliotek</button>
                <button className={buttonstyle} onClick={() => setNotVisibleLibraryFromReport(targetid)}>sett rapportert Bibliotek usynlig</button>
                <button className={buttonstyle} onClick={() => RemoveLibraryImage(targetid)}>fjern bilde</button>
            </>
        )
    }
    if (report.reportType.toLowerCase() == "review" && report.reviewId != null) {
        const targetid = report.reviewId
        typeid = targetid
        typebuttons = (
            <>
                <button className={buttonstyle} onClick={() => deleteReviewFromReport(targetid)}>slett rapportert Anmeldelse</button>
            </>
        )
    }

    const handleExpand = () => {
        setIsHidden(!ishidden)
        if (ishidden) setexpand("utvid")
        else setexpand("lukk")
    }

    return (
        <article className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
            <p className="col-span-1 col-start-2">{report.id}</p>
            <p className="col-span-1">{report.reportLevel}</p>
            <p className="col-span-1">{report.reportType}</p>
            <p className="col-span-3">{report.createdAt}</p>
            <p className="col-span-5">{report.submitterUserId}</p>
            <p className="col-span-5">{typeid}</p>
            <button className="col-start-18" onClick={() => handleExpand()}>{expand}</button>
            {ishidden && (
                <div className="col-start-6 col-span-8">
                    <p>rapport tekst:</p>
                    <p>{report.text}</p>
                    <label>adminhandlinger: <br /></label>
                    {typebuttons}
                    <button className={buttonstyle} onClick={() => deleteReport(report.id)}>delete rapport</button>
                </div>)}
        </article>


    )


}