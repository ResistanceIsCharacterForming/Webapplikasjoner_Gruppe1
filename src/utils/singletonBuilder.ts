import { createLibraryController } from "@/features/library/controller"
import { createLibraryService } from "@/features/library/service"
import { createUserController } from "@/features/user/controller"
import { createUserService } from "@/features/user/service"
import { createDashboardController } from "@/features/dashboard/controller"
import { createDashboardService } from "@/features/dashboard/service"
import { createReviewController } from "@/features/review/controller"
import { createReviewService } from "@/features/review/service"

export const singletonMaster = ({
    libraryController: createLibraryController(createLibraryService()),
    userController: createUserController(createUserService()),
    dashboardController: createDashboardController(createDashboardService()),
    reviewController: createReviewController(createReviewService())
})