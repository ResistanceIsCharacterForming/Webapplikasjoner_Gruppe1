"use client"
import { Rapports } from "../components/rapports";
import { JSX, useEffect, useState } from "react";
import { report, responeReport } from "@/types/reports";
import { getReports } from "../hooks/getRapports";
import { deleteReport } from "../hooks/adminActions";
import AdminNav from "../components/adminNav";

export default  function DashboardScreen() {
   const [reports, setReports] = useState<report[]>()
   const [showcare, setshowcase] = useState<JSX.Element[]>()
   const [sort, settsort] = useState("newest")
   const [reportlevel, settreportlevel] = useState("all")

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

   type inputFields = {
    label: string, name: string, type: string
   }
    type selectOption = {
    type: string, value: string
   }
   const sortOptions: selectOption[] = [
      {type:"newest",value:"newest"},
      {type:"oldest",value:"oldest"},
      {type:"level",value:"level"},
      {type:"type",value:"type"},
   ]
   const levelOptions: selectOption[] = [
      {type:"all",value:"all"},
      {type:"1",value:"1"},
      {type:"2",value:"2"},
      {type:"3",value:"3"},
   ]
   const field: inputFields = { label: "search", name: "search", type: "search" }
   
   const buttonstyle="text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow  border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"

   async function listReports(type:string|void,level:number|void)  {
      if (type && level){
         const reportres: responeReport = await getReports(type,level)
         setReports(reportres.data)
      }
      else if (type){
         const reportres: responeReport = await getReports(type)
         setReports(reportres.data)
      }
      else if (level){
         const reportres: responeReport = await getReports(undefined,level)
         setReports(reportres.data)
      }
      else{
         const reportres: responeReport = await getReports()
         setReports(reportres.data)
      }
   }
   async function showReports(reportslist?: report[]) {
      if (reportslist) {
         const listreports = reportslist.map(report =>
            <Rapports {...report} />
         )
         setshowcase(listreports)
      }
      else if (reports) {
         const listreports = reports.map(report =>
            <Rapports {...report} />
         )
         setshowcase(listreports)
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
            const filteredItems = reports.filter(reports => reports.reportLevel == Number(level));
            const listreports = filteredItems.map(report =>
               <div key={report.id}>
                  <Rapports {...report} />
               </div>
            )
            setshowcase(listreports)
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
      if (reports !== undefined) {
         const searchItems = reports.filter(report =>
            report.text?.toLowerCase().includes(search.toLowerCase())
         )
         showReports(searchItems)
      }
   }
   const getallreports = () => {
      listReports()
   };
   const getAllReportsAboutReviews = () => {
      listReports("review")
   };
   const getAllReportsAboutUsers = () => {
      listReports("User")
   };
   const getAllReportsAboutLibaries = () => {
      listReports("libary")
   };

   return (
      <main className="grid grid-cols-5 grid-rows-17 gap-0 bg-oldRose h-screen">
         <AdminNav />
         <article className=" col-span-5 row-start-2 col-span-2 bg-oldRose flex h-100%">
            <button onClick={getallreports} className={buttonstyle}> all</button>
            <button onClick={getAllReportsAboutReviews} className={buttonstyle}> review</button>
            <button onClick={getAllReportsAboutUsers} className={buttonstyle}> user</button>
            <button onClick={getAllReportsAboutLibaries} className={buttonstyle}> libary</button>
            <button className={buttonstyle}> idk</button>
         </article>
         <article className="bg-oldRose grid grid-cols-10  row-start-3 col-span-5 border-blackChocolate border-1">
            <article className="col-start-1 col-span-5 grid grid-cols-10">
               <input
                  className="w-full bg-lotion border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md col-span-6 ml-2"
                  placeholder="søk her"
                  type={field.type}
                  id={field.type}
                  name={field.type}
                  onChange={(e) => search(e.target.value)}
               />
            </article>
            <article className="col-span-2 col-start-6 flex gap-5 justify-center place-items-center">
               <label className="">sort options:</label>
               <select name="sort_options" value={sort} onChange={e => settsort(e.target.value)}>
                  {sortOptions.map((option) => (
                     <option value={option.value}>{option.type}</option>
                  ))}
               </select>

               <label className="">level</label>
               <select name="level_options" value={reportlevel} onChange={e => sortbylevel(e.target.value)}>
                  {levelOptions.map((option) => (
                     <option value={option.value}>{option.type}</option>
                  ))}
               </select>
            </article>

         </article>
         <div className="col-span-5 row-span-14 col-start-1 row-start-4 bg-oldLace overflow-hidden overflow-y-auto">
            {showcare}
         </div>
         <footer className="col-span-5 col-start-1 row-start-17 bg-lotion">
            foooooooooooooooooooooter
         </footer>
      </main>


   )


}
