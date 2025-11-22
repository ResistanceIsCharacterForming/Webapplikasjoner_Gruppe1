"use client"
import { Rapports } from "../components/rapports";
import { JSX, useEffect, useState } from "react";
import { responeReport } from "@/types/reports";
import { getReports } from "../hooks/getRapports";
import { deleteReport } from "../hooks/adminActions";
import AdminNav from "../components/adminNav";


 const buttonstyle="text-lg italic text-blackChocolate! hover:text-darkVanilla! bg-oldLace grow "
export default  function DashboardScreen() {
    const [reports, setReports] = useState<responeReport["data"]>()
    const [showcare,setshowcase] = useState<JSX.Element[]>()
     useEffect(() =>{
      if (reports){
         showReports()
      }
      else
         listReports()
      },[reports])
      
async function listReports(type:string|void,level:number|void)  {
   if (type && level){
      const reportres: responeReport = await getReports(type,level)
      setReports(reportres.data)
      showReports()
   }
   else if (type){
      const reportres: responeReport = await getReports(type)
      setReports(reportres.data)
      showReports()
   }
   else if (level){
      const reportres: responeReport = await getReports(undefined,level)
      setReports(reportres.data)
      showReports()
   }
   else{
      const reportres: responeReport = await getReports()
      setReports(reportres.data)
      showReports()
   }
}

async function showReports() {
   if (reports){
    const listreports = reports.map(report =>
         <div key={report.id}>
           <Rapports {...report}/>
         </div>
     )
    setshowcase(listreports)
   }
}
async function sortbylevel()  {
   if (reports){
    const sortedItems = reports.sort((a, b) => a.raportLevel - b.raportLevel)
    setReports(sortedItems)
    showReports()
    }
}

const HandleClick11 = () => {
    listReports()
  };
const HandleClick = () => {
    listReports("review")
  };
const HandleClick2 = () => {
    listReports("User")
  };
const HandleClick3 = () => {
    listReports("libary")
  };
const HandleClick4 = () => {
    sortbylevel()
  };

    return(

<main className="grid grid-cols-5 grid-rows-10 gap-0">
   <AdminNav/>
   <div className="col-span-5 row-start-2 content-center">
      <div className="flex space-x-4">
         <button onClick={HandleClick } className={buttonstyle}> review</button>
         <button onClick={HandleClick2} className={buttonstyle}> user</button>
         <button onClick={HandleClick3} className={buttonstyle}> libary</button>
         <button onClick={HandleClick11} className={buttonstyle}> all</button>   
         <button className={buttonstyle}> idk</button>
      </div>
   </div>
   <div className="col-span-5 col-start-1 row-start-3">10 <button onClick={HandleClick4} className={buttonstyle}> sort</button></div>
   <div className="col-span-5 row-span-6 col-start-1 row-start-4">11 {showcare}</div>
   <div className="col-span-5 col-start-1 row-start-10">12 foooooooooooooooooooooter</div>
</main>
    
      
    )


}
