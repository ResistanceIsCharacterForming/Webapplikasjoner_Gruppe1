
import { report } from "@/types/reports"
import { deleteLibaryFromReport, deleteReport, deleteReviewFromReport, deleteUserFromReport, setNotVisableLibaryFromReport, setNotVisableUserFromReport } from "../hooks/adminActions";

export const Rapports = (report:report) => {
    
    const HandleDelete = () => {
        deleteReport(report.id)
    };
    const HandleDeleteOwner = () => {
        if (report.reportType=="User")
            if (report.userId)
                deleteUserFromReport(report.userId)
        if (report.reportType=="libary")
             if (report.libraryId)
                deleteLibaryFromReport(report.libraryId)
        if (report.reportType=="review")
             if (report.reviewId)
                deleteReviewFromReport(report.reviewId)
    };
    const HandleSettNotVisableOwner = () => {
        if (report.reportType=="User")
            if (report.userId)
                setNotVisableUserFromReport(report.userId)
        if (report.reportType=="libary")
             if (report.libraryId)
                setNotVisableLibaryFromReport(report.libraryId)
    };
    let notVisableButton 
    if (report.reportType == "User" || report.reportType=="libary"){
       notVisableButton = (<button onClick={HandleSettNotVisableOwner}>[notvisable]</button>)
    }
  
  
    return(
            <article  className="flex py-4 first:pt-0 last:pb-0 justify-self-center">
                <p>id:{report.id} text:{report.text} level:{report.reportLevel} type:{report.reportType}</p>
                <button onClick={HandleDelete}>[kill]</button><button onClick={HandleDeleteOwner}>[kill owner]</button>{notVisableButton}
            </article>       
    )


}