"use client"

import { useState } from "react"
import { deleteUser, makeUserAdmin, removeAdminFromUser, setNotVisibleUser, settUserProfileToBasic } from "../hooks/adminActions"
import { user } from "@/types/user"
import { adminButtonStyle } from "@/styles/tailwind"

export const Users = (user: user) => {
    const [ishidden, setIsHidden] = useState<boolean>(false)
    const [expand, setexpand] = useState("utvid")
    const [hidden, setHiden] = useState("")
    // buttons for users
    let typebuttons = (
        <>
            <button className={adminButtonStyle} onClick={() => { deleteUser(user.id); setHiden("hidden") }}>slett  bruker</button>
            <button className={adminButtonStyle} onClick={() => setNotVisibleUser(user.id)}>sett bruker som usynlig</button>
            <button className={adminButtonStyle} onClick={() => settUserProfileToBasic(user.id)}>nullstill brukernavn og bilde</button>
            <button className={adminButtonStyle} onClick={() => makeUserAdmin(user.id)}>gjør bruker til admin</button>
            <button className={adminButtonStyle} onClick={() => removeAdminFromUser(user.id)}>fjern admin status</button>
        </>
    )
    // handling closeing and opening 
    const handleExpand = () => {
        setIsHidden(!ishidden)
        if (ishidden) setexpand("utvid")
        else setexpand("lukk")
    }

    return (
        <article className={"h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1" + hidden}>
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