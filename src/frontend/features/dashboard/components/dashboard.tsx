"use client"

import { useState } from "react"
import AdminNav from "@/frontend/features/dashboard/components/adminNav"
import { DashbordReportContent } from "./DashbordReportContent"
import { DashbordUserContent } from "./DashbordUserContent"

// the dashborad screen with 5 buttons 4 of them is to swape between report types and one is to list user and do actions on users
export default function DashboardScreen() {
   const [children, setChildren] = useState(<DashbordReportContent category={""} />)
   function setReportContainerBody(type: string) {
      setChildren(<DashbordReportContent category={type} />)
   }

   function setUserContainerBody() {
      setChildren(<DashbordUserContent />)
   }


   const allButtons: any = [
      ["", "alle"],
      ["review", "anmeldelse"],
      ["user", "bruker"],      
      ["library", "bibliotek"],      
      [null, "liste av brukere"],      
   ]

   return (

      <main className="grid grid-cols-5 grid-rows-17 gap-0 bg-oldRose h-screen ">
         <AdminNav />
         <article className=" col-span-5 row-start-2 col-span-2 bg-oldRose flex h-100%">
            {allButtons.map((thisButton: [string | null, string]) => {
               return <button onClick={
                  () => thisButton[0] !== null ? setReportContainerBody(thisButton[0]) : setUserContainerBody()
               } className="text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"> {thisButton[1]}</button>

            })}
         </article>
         {children}
      </main>

   )


}
