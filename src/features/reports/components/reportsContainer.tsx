"use client"

import { report } from "@/types/reports"
import { JSX, useEffect, useState } from "react"
import { Reports } from "./reports"
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

export const ReportsContainer = (props: { category: string}) => {
    const [currentcategory,setCurrentcategory] = useState("")
    const [reports, setReports] = useState<report[]>()
    const [showcase, setShowcase] = useState<JSX.Element[]>()
    const [reportlevel, settreportlevel] = useState(levelOptions[0].value)
    const [sort, setSorting] = useState(sortOptions[0].value)
    const [searchSetting, setSearchSetting] = useState(searchOptions[0].value)
    if(props.category!=currentcategory){
            setCurrentcategory(props.category)
            listReports(props.category)
    }
       useEffect(() => {
          if (reports) {
             settSorting(sort)
             showReports()
          }
          else listReports(props.category)
             
       },[reports])
    
    
       useEffect(() => {
          settSorting(sort)
       }, [sort])
    
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
    function search(search: string) {
      if (search == "") showReports()
      else if (reports !== undefined) {
         if (searchSetting == "text") {
            const searchItems = reports.filter(report =>
               report.text?.toLowerCase().includes(search.toLowerCase())
            )
            showReports(searchItems)
         }
         else if (searchSetting == "rapportert id") {
            const searchItems = reports.filter(report =>
               report.userId?.toLowerCase().includes(search.toLowerCase()) ||
               report.libraryId?.toLowerCase().includes(search.toLowerCase()) ||
               report.reviewId == Number(search)
            )
            showReports(searchItems)

         }
         else if (searchSetting == "submitter") {
            const searchItems = reports.filter(report =>
               report.submitterUserId?.toLowerCase().includes(search.toLowerCase())
            )
            showReports(searchItems)
         }
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
    return(
    <>
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
               <select name="search_options" value={searchSetting} onChange={e => setSearchSetting(e.target.value)} className="w-full col-start-9 col-span-1">
                 {searchOptions.map((option) => (
                     <option key={option.type} value={option.value}>{option.type}</option>
                  ))}
               </select>
            </article>
            <article className="col-span-2 col-start-6 flex gap-5 justify-center place-items-center">
               <label className="">Sortering:</label>
               <select name="sort_options" value={sort} onChange={e => setSorting(e.target.value)} className="bg-lotion border-blackChocolate border-1 p-1 rounded">
                  {sortOptions.map((option) => (
                     <option key={option.type} value={option.value}>{option.type}</option>
                  ))}
               </select>

               <label className="">Nivå:</label>
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
                  <p className="col-span-1">nivå</p>
                  <p className="col-span-1">type</p>
                  <p className="col-span-3">dato</p>
                  <p className="col-span-5">Rapport-avsender id</p>
                  <p className="col-span-5">rapportert id</p>
               </div>
           {showcase}
           
         </article>
    </>
    )
}