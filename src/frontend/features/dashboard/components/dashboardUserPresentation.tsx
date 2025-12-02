import { user } from "@/backend/types/user"
import { JSX } from "react";

export const DashboardUserPresentation = (props:{user: user,buttons: JSX.Element,isExpanded:boolean,expand:string,handleExpand: () => void}) => {
    return (
        <article className="h-2em w-full grid grid-cols-18  border-blackChocolate border-1 p-1" >
            <p className="col-span-4 col-start-2">{props.user.id}</p>
            <p className="col-span-3">{props.user.name}</p>
            <p className="col-span-3">{props.user.email}</p>
            <p className="col-span-5 ">{props.user.createdAt}</p>
            <button className="col-start-18" onClick={() => props.handleExpand()}>{props.expand}</button>
            {props.isExpanded && (
                <div className="col-start-6 col-span-8">
                    <label>adminhandlinger: <br /></label>
                    {props.buttons}
                </div>)}
        </article>
    )


}