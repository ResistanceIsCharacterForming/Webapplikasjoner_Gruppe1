
import { report } from "@/types/reports"
import { deleteLibaryFromReport, deleteReport, deleteReviewFromReport, deleteUserFromReport } from "../hooks/adminActions";

export const Rapports = (report:report) => {
    
    const HandleDelete = () => {
        deleteReport(report.id)
    };
     const HandleDeleteOwner = () => {
        if (report.raportType=="User")
            if (report.userId)
                deleteUserFromReport(report.userId)
        if (report.raportType=="libary")
             if (report.libaryId)
                deleteLibaryFromReport(report.libaryId)
        if (report.raportType=="review")
             if (report.reviewId)
                deleteReviewFromReport(report.reviewId)
    };
  
    return(
            <div  className="flex py-4 first:pt-0 last:pb-0">
            <p>id:{report.id} text:{report.text} level:{report.raportLevel} type:{report.raportType}</p>
            <button onClick={HandleDelete}>[kill]</button><button onClick={HandleDeleteOwner}>[kill owner]</button>
            </div>       
    )


}