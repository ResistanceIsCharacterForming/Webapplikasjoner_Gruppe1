"use client" 
import { Reports } from "../components/reports"
import { JSX, useEffect, useState } from "react"
import { report} from "@/types/reports"

import AdminNav from "../components/adminNav"
import { getReports } from "../hooks/adminActions"
import { ReportsContainer } from "../components/reportsContainer"
import { UserContainer } from "../components/userContainer"

type inputFields = {
   label: string, name: string, type: string
}
type selectOption = {
   type: string, value: string
}

const levelOptions: selectOption[] = [
   { type: "all", value: "all" },
   { type: "1", value: "1" },
   { type: "2", value: "2" },
   { type: "3", value: "3" },
]
const sortOptions: selectOption[] = [
   { type: "nyeste", value: "newest" },
   { type: "eldste", value: "oldest" },
   { type: "nivå", value: "level" },
   { type: "type", value: "type" },
]
const searchOptions: selectOption[] = [
   { type: "text", value: "text" },
   { type: "id", value: "id" },
   { type: "submitter", value: "submitter" },
]
const field: inputFields = { label: "search", name: "search", type: "search" }
const buttonstyle = "text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

export default  function DashboardScreen() {
   const [children, setChildren] = useState( <ReportsContainer category={""}/>)
   const [type, settype] = useState("")
   

   function setReportContainerBody(type:string){
      setChildren(<ReportsContainer category={type}/>)
   }

   function setUserContainerBody(){
      setChildren(<UserContainer/>)
   }
   return (
      <main className="grid grid-cols-5 grid-rows-17 gap-0 bg-oldRose h-screen">
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


   )


}
