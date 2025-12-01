"use client"

import { useState } from "react"
import { adminButtonStyle } from "@/frontend/styles/tailwind"
import AdminNav from "@/frontend/features/dashboard/components/adminNav"
import { ReportsContainer } from "@/frontend/features/dashboard/components/reportsContainer"
import { UserContainer } from "@/frontend/features/dashboard/components/userContainer"

// the dashborad screen with 5 buttons 4 of them is to swape between report types and one is to list user and do actions on users
export default function DashboardScreen() {
   const [children, setChildren] = useState(<ReportsContainer category={""} />)
   function setReportContainerBody(type: string) {
      setChildren(<ReportsContainer category={type} />)
   }

   function setUserContainerBody() {
      setChildren(<UserContainer />)
   }
   return (

      <main className="grid grid-cols-5 grid-rows-17 gap-0 bg-oldRose h-screen ">
         <AdminNav />
         <article className=" col-span-5 row-start-2 col-span-2 bg-oldRose flex h-100%">
            <button onClick={() => setReportContainerBody("")} className={adminButtonStyle}> alle</button>
            <button onClick={() => setReportContainerBody("review")} className={adminButtonStyle}> anmeldelse</button>
            <button onClick={() => setReportContainerBody("User")} className={adminButtonStyle}> bruker</button>
            <button onClick={() => setReportContainerBody("library")} className={adminButtonStyle}> bibliotek</button>
            <button onClick={() => setUserContainerBody()} className={adminButtonStyle}> liste av brukere</button>
         </article>
         {children}
      </main>

   )


}
