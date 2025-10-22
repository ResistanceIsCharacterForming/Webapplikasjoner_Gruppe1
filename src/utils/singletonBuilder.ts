import { createLibraryController } from "@/features/library/controller"
import { createLibraryService } from "@/features/library/service"

export const singletonMaster = ({
    libraryController: createLibraryController(createLibraryService())
})