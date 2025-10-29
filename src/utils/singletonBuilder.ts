import { createLibraryController } from "@/features/library/controller"
import { createLibraryService } from "@/features/library/service"
import { createUserController } from "@/features/user/controller"
import { createUserService } from "@/features/user/service"
import { createReportController } from "@/features/report/controller"
import { createReportService } from "@/features/report/service"
import { createReviewController } from "@/features/review/controller"
import { createReviewService } from "@/features/review/service"

export const singletonMaster = ({
    libraryController: createLibraryController(createLibraryService()),
    userController: createUserController(createUserService()),
    reportController: createReportController(createReportService()),
    reviewController: createReviewController(createReviewService())
})