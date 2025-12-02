"use client"
import { useEffect, useState } from "react"
import { deleteUser, setNotVisibleUser, settUserProfileToBasic, makeUserAdmin, removeAdminFromUser } from "@/backend/features/reports/utils/adminActions"
import { user } from "@/backend/types/user"
import { DashboardUserPresentation } from "./dashboardUserPresentation"

export const DashboardUserContainer = (user: user) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [expand, setexpand] = useState("utvid")
    const [hidden, setHiden] = useState(false)

    // buttons for users
    let typebuttons = (
        <>
            <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
             onClick={() => { deleteUser(user.id); handlehidden() }}>slett  bruker</button>
            <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
             onClick={() => setNotVisibleUser(user.id)}>sett bruker som usynlig</button>
            <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
             onClick={() => settUserProfileToBasic(user.id)}>nullstill brukernavn og bilde</button>
            <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
             onClick={() => makeUserAdmin(user.id)}>gjør bruker til admin</button>
            <button className={"text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"}
             onClick={() => removeAdminFromUser(user.id)}>fjern admin status</button>
        </>
    )
    // handling closeing and opening 
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
        if (isExpanded) setexpand("utvid")
        else setexpand("lukk")
    }
    // handle when need to hide to report do to action
    const handlehidden = () => {
        setHiden(true)
    }
    

    return (
        <>{!hidden && <DashboardUserPresentation user={user} buttons={typebuttons} isExpanded={isExpanded} expand={expand} handleExpand={handleExpand} /> }</>
    )
}