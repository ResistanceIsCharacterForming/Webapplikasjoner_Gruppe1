
import { report } from "@/types/reports"
import { deleteLibraryFromReport, deleteReport, deleteReviewFromReport, deleteUserFromReport, setNotVisibleLibraryFromReport, setNotVisibleUserFromReport } from "../hooks/adminActions";

export const Reports = (report:report) => {
    
    const HandleDelete = () => {
        deleteReport(report.id)
    };
    const HandleDeleteOwner = () => {
        if (report.reportType=="User")
            if (report.userId)
                deleteUserFromReport(report.userId)
        if (report.reportType=="library")
             if (report.libraryId)
                deleteLibraryFromReport(report.libraryId)
        if (report.reportType=="review")
             if (report.reviewId)
                deleteReviewFromReport(report.reviewId)
    };
    const HandleSettNotVisableOwner = () => {
        if (report.reportType=="User")
            if (report.userId)
                setNotVisibleUserFromReport(report.userId)
        if (report.reportType=="library")
             if (report.libraryId)
                setNotVisibleLibraryFromReport(report.libraryId)
    };
    let notVisibleButton 
    if (report.reportType == "User" || report.reportType=="library"){
       notVisibleButton = (<button onClick={HandleSettNotVisableOwner}>[notvisible]</button>)
    }
  
  
    return(
            <article  className="flex py-4 first:pt-0 last:pb-0 justify-self-center">
                <p>id:{report.id} text:{report.text} level:{report.reportLevel} type:{report.reportType}</p>
                <button onClick={HandleDelete}>[kill]</button><button onClick={HandleDeleteOwner}>[kill owner]</button>{notVisibleButton}
            </article>       
    )


}