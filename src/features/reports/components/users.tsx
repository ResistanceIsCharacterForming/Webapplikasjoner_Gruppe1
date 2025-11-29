"use client"
import { report } from "@/types/reports"
import { useState } from "react"
import { deleteLibraryFromReport, deleteReport, deleteReviewFromReport, deleteUser, makeUserAdmin, removeAdminFromUser, RemoveLibraryImage, setNotVisibleLibraryFromReport, setNotVisibleUser, settUserProfileToBasic } from "../hooks/adminActions"
import { user } from "@/types/user"


const buttonstyle = "text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

export const Users = (user: user) => {
    const [ishidden, setIsHidden] = useState<boolean>(false)
    const [expand, setexpand] = useState("utvid")

    let typebuttons= (
            <>
                <button className={buttonstyle} onClick={() => deleteUser(user.id)}>slett  bruker</button>
                <button className={buttonstyle} onClick={() => setNotVisibleUser(user.id)}>sett bruker som usynlig</button>
                <button className={buttonstyle} onClick={() => settUserProfileToBasic(user.id)}>nullstill brukernavn og bilde</button>
                <button className={buttonstyle} onClick={() => makeUserAdmin(user.id)}>gjør bruker til admin</button>
                <button className={buttonstyle} onClick={() => removeAdminFromUser(user.id)}>fjern admin status</button>
            </>
        )
    
    const handleExpand = () => {
        setIsHidden(!ishidden)
        if (ishidden) setexpand("utvid")
        else setexpand("lukk")
    }

    return (
        <article className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
            <p className="col-span-4 col-start-2">{user.id}</p>
            <p className="col-span-3">{user.name}</p>
            <p className="col-span-3">{user.email}</p>
            <p className="col-span-5 ">{user.createdAt}</p>
            <button className="col-start-18" onClick={() => handleExpand()}>{expand}</button>
            {ishidden && (
                <div className="col-start-6 col-span-8">
                    <label>adminhandlinger: <br /></label>
                    {typebuttons}
                </div>)}
        </article>
    )


}