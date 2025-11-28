"use client"
import { Reports } from "../components/reports"
import { JSX, useEffect, useState } from "react"
import { report} from "@/types/reports"

import AdminNav from "../components/adminNav"
import { getReports } from "../hooks/adminActions"

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
   { type: "newest", value: "newest" },
   { type: "oldest", value: "oldest" },
   { type: "level", value: "level" },
   { type: "type", value: "type" },
]
const serachOptions: selectOption[] = [
   { type: "text", value: "text" },
   { type: "id", value: "id" },
   { type: "submiter", value: "submiter" },
]
const field: inputFields = { label: "search", name: "search", type: "search" }


export default  function DashboardScreen() {
   const [reports, setReports] = useState<report[]>()
   const [showcase, setShowcase] = useState<JSX.Element[]>()
   const [reportlevel, settreportlevel] = useState(levelOptions[0].value)
   const [sort, settsort] = useState(sortOptions[0].value)
   const [serachSetting, settSerachSetting] = useState(serachOptions[0].value)

   useEffect(() => {
      if (reports) {
         settSorting(sort)
         showReports()
      }
      else
         listReports()
   }, [reports])


   useEffect(() => {
      settSorting(sort)
   }, [sort])


   const buttonstyle="text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

   async function listReports(type:string|void,level:number|void)  {
      if (type && level){
         const reports = await getReports(type,level)
         setReports(reports)
      }
      else if (type){
         const reports = await getReports(type)
         setReports(reports)
      }
      else if (level){
         const reports = await getReports(undefined,level)
         setReports(reports)
      }
      else{
         const reports = await getReports()
         setReports(reports)
      }
   }
   async function showReports(reportslist?: report[]) {
      if (reportslist) {
         const listreports = reportslist.map(report =>
            <Reports  key={report.id}{...report} />
         )
         setShowcase(listreports)
      }
      else if (reports) {
         const listreports = reports.map(report =>
            <Reports  key={report.id}{...report} />
         )
         setShowcase(listreports)
      }
   }
   async function sortbylevel(level: string) {
      settreportlevel(level)
      if (reports) {
         if (level == "all") {
            settSorting(sort)
            showReports()
         }
         else {
            const filteredItems = reports.filter(reports => reports.reportLevel == Number(level))
            const listreports = filteredItems.map(report =>
               <Reports key={report.id}{...report} />
             
            )
            setShowcase(listreports)
         }
      }
   }
   async function settSorting(sorting: string) {
      if (reports !== undefined) {
         if (sorting === "newest") {
            const sortedItems = reports.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
           
            showReports(sortedItems)
         }
         else if (sorting === "oldest") {
            const sortedItems = reports.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            
            showReports(sortedItems)
         }
         else if (sorting === "level") {
            const sortedItems = reports.sort((a, b) => a.reportLevel - b.reportLevel)
            
            showReports(sortedItems)
         }
         else if (sorting === "type") {
            const sortedItems = reports.sort((a, b) => a.reportType.localeCompare(b.reportType))
            
            showReports(sortedItems)
         }
      }
   }
   function search(search: string) {
      if (search == "") showReports()
      else if (reports !== undefined) {
         if (serachSetting == "text") {
            const searchItems = reports.filter(report =>
               report.text?.toLowerCase().includes(search.toLowerCase())
            )
            showReports(searchItems)
         }
         else if (serachSetting == "id") {
            const searchItems = reports.filter(report =>
               report.userId?.toLowerCase().includes(search.toLowerCase()) ||
               report.libraryId?.toLowerCase().includes(search.toLowerCase()) ||
               report.reviewId == Number(search)
            )
            showReports(searchItems)

         }
         else if (serachSetting == "submiter") {
            const searchItems = reports.filter(report =>
               report.submitterUserId?.toLowerCase().includes(search.toLowerCase())
            )
            showReports(searchItems)
         }
      }
   }
 

   return (
      <main className="grid grid-cols-5 grid-rows-17 gap-0 bg-oldRose h-screen">
         <AdminNav />
         <article className=" col-span-5 row-start-2 col-span-2 bg-oldRose flex h-100%">
            <button onClick={()=>listReports()} className={buttonstyle}> all</button>
            <button onClick={()=>listReports("review")} className={buttonstyle}> review</button>
            <button onClick={()=>listReports("User")} className={buttonstyle}> user</button>
            <button onClick={()=>listReports("libary")} className={buttonstyle}> libary</button>
         </article>
         <article className="bg-oldRose grid grid-cols-10  row-start-3 row-span-1 col-span-5 border-blackChocolate border-1">
            <article className="w-full bg-lotion border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md col-span-4 ml-2 grid 10">
               <input
                  className="w-full col-span-8"
                  placeholder="søk her"
                  type={field.type}
                  id={field.type}
                  name={field.type}
                  onChange={(e) => search(e.target.value)}
                
               /> 
               <select name="search_options" value={serachSetting} onChange={e => settSerachSetting(e.target.value)} className="w-full col-start-9 col-span-1">
                 {serachOptions.map((option) => (
                     <option key={option.type} value={option.value}>{option.type}</option>
                  ))}
               </select>
            </article>
            <article className="col-span-2 col-start-6 flex gap-5 justify-center place-items-center">
               <label className="">sort options:</label>
               <select name="sort_options" value={sort} onChange={e => settsort(e.target.value)} className="bg-lotion border-blackChocolate border-1 p-1 rounded">
                  {sortOptions.map((option) => (
                     <option key={option.type} value={option.value}>{option.type}</option>
                  ))}
               </select>

               <label className="">level:</label>
               <select name="level_options" value={reportlevel} onChange={e => sortbylevel(e.target.value)} className="bg-lotion border-blackChocolate border-1 p-1 rounded">
                  {levelOptions.map((option) => (
                     <option key={option.type} value={option.value}>{option.type}</option>
                  ))}
               </select>
            </article>

         </article>
         <article className="col-span-5 row-span-14 col-start-1 row-start-4  overflow-hidden overflow-y-auto  h-full w-full bg-lotion">
               <div className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
                  <p className="col-span-1 col-start-2">id</p>
                  <p className="col-span-1">level</p>
                  <p className="col-span-1">type</p>
                  <p className="col-span-3">createdAt</p>
                  <p className="col-span-5">submitterUserId</p>
                  <p className="col-span-5">reportedId</p>
               </div>
           {showcase}
           
         </article>
         <footer className="col-span-5 col-start-1 row-start-18 bg-lotion">
            foooooooooooooooooooooter
         </footer>
      </main>


   )


}
