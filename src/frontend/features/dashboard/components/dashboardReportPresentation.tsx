import { report } from "@/backend/types/reports"
import { JSX } from "react"


export const dashboardReportPresentation = (report: report,typeid:string,buttons:JSX.Element,isExpanded:boolean,expand:string,handleExpand: () => void) => {
    return (
        <article className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
            <p className="col-span-1 col-start-2">{report.id}</p>
            <p className="col-span-1">{report.reportLevel}</p>
            <p className="col-span-1">{report.reportType}</p>
            <p className="col-span-3">{report.createdAt}</p>
            <p className="col-span-5">{report.submitterUserId}</p>
            <p className="col-span-5">{typeid}</p>
            <button className="col-start-18" onClick={() => handleExpand()}>{expand}</button>
            {isExpanded && (
                <div className="col-start-6 col-span-8">
                    <p>rapport tekst:</p>
                    <p>{report.text}</p>
                    <label>adminhandlinger: <br /></label>
                    {buttons}
                </div>)}
        </article>


    )


}