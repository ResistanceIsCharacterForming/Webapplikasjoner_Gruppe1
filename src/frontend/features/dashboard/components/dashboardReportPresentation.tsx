import { report } from "@/backend/types/reports"
import { JSX } from "react"


export const DashboardReportPresentation = (props:{report: report,typeid:string|number,buttons:JSX.Element,isExpanded:boolean,expand:string,handleExpand: () => void}) => {
    return (
        <article className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1">
            <p className="col-span-1 col-start-2">{props.report.id}</p>
            <p className="col-span-1">{props.report.reportLevel}</p>
            <p className="col-span-1">{props.report.reportType}</p>
            <p className="col-span-3">{props.report.createdAt}</p>
            <p className="col-span-5">{props.report.submitterUserId}</p>
            <p className="col-span-5">{props.typeid}</p>
            <button className="col-start-18" onClick={() => props.handleExpand()}>{props.expand}</button>
            {props.isExpanded && (
                <div className="col-start-6 col-span-8">
                    <p>rapport tekst:</p>
                    <p>{props.report.text}</p>
                    <label>adminhandlinger: <br /></label>
                    {props.buttons}
                </div>)}
        </article>
    )


}