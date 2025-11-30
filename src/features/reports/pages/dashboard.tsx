"use client" 
import { Reports } from "../components/reports"
import { JSX, useEffect, useState } from "react"
import { report} from "@/types/reports"

import AdminNav from "../components/adminNav"
import { getReports } from "../hooks/adminActions"
import { ReportsContainer } from "../components/reportsContainer"
import { UserContainer } from "../components/userContainer"

const buttonstyle = "text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

// the dashborad screen with 5 buttons 4 of them is to swape between report types and one is to list user and do actions on users
export default  function DashboardScreen() {
   const [children, setChildren] = useState( <ReportsContainer category={""}/>)
   function setReportContainerBody(type:string){
      setChildren(<ReportsContainer category={type}/>)
   }

   function setUserContainerBody(){
      setChildren(<UserContainer/>)
   }
   return (
      <>
      <h1 className="block md:hidden">dashbord er kun ment for desktop</h1>
      <main className="grid grid-cols-5 grid-rows-17 gap-0 bg-oldRose h-screen hidden md:block">
         <AdminNav />
         <article className=" col-span-5 row-start-2 col-span-2 bg-oldRose flex h-100%">
            <button onClick={()=>setReportContainerBody("")} className={buttonstyle}> alle</button>
            <button onClick={()=>setReportContainerBody("review")} className={buttonstyle}> anmeldelse</button>
            <button onClick={()=>setReportContainerBody("User")} className={buttonstyle}> bruker</button>
            <button onClick={()=>setReportContainerBody("library")} className={buttonstyle}> bibliotek</button>
            <button onClick={()=>setUserContainerBody()} className={buttonstyle}> liste av brukere</button>
         </article>
         {children}
      </main>
      </>

   )


}
