import { createLibraryController } from "@/features/library/controller"
import { createLibraryService } from "@/features/library/service"
import { createUserController } from "@/features/user/controller"
import { createUserService } from "@/features/user/service"
import { createReportController } from "@/features/report/controller"
import { createReportService } from "@/features/report/service"
import { createReviewController } from "@/features/review/controller"
import { createReviewService } from "@/features/review/service"
import { createLibraryRepository } from "@/features/library/repository"
import { createDbConnection, createR2Connection } from "@/db/index"
import { createUserRepository } from "@/features/user/repository"
import { createReportRepository } from "@/features/report/repository"
import { createReviewRepository } from "@/features/review/repository"
import { createTokensController } from "@/features/token/controller"
import { createTokensService } from "@/features/token/service"
import { createImageHandler } from "@/features/image/imagehandler"

/* https://www.typescriptlang.org/docs/handbook/basic-types.html */


/* Lazy loader for alle singletons. */
export const singletonMaster = {
    /* Privat property. Set som null, altså blank når objektet lages. Bruk ReturnType for å matche typen til hva createDbConnection gir oss. */
    _dbConnection: null as ReturnType<typeof createDbConnection> | null,
    /* Getter. Objektet blir "kjøprt" på denne måten: singletonMaster.dbConnection */
    get dbConnection() {
        /* Er den private property "initaiswert" */
        if (!this._dbConnection) {
            /* Lag ny singleton */
            this._dbConnection = createDbConnection()
        }
        /* Send tilbake privat property */
        return this._dbConnection
    },
    _r2Connection:null as ReturnType<typeof createR2Connection> |null,
    get r2Connection(){
        if(!this._r2Connection){
            this._r2Connection = createR2Connection()
        }
        return this._r2Connection
    },

    _ImageController: null as ReturnType<typeof createImageHandler> | null,
    get ImageController(){
        if (!this._ImageController){
            this._ImageController = createImageHandler()
        }
        return this._ImageController
    }
    ,

    _libraryController: null as ReturnType<typeof createLibraryController> | null,
    get libraryController() {
        if (!this._libraryController) {
            this._libraryController = createLibraryController(createLibraryService(createLibraryRepository(this.dbConnection)))
        }
        return this._libraryController
    },

    _userService: null as ReturnType<typeof createUserService> | null,
    get userService() {
        if (!this._userService) {
            this._userService = createUserService(createUserRepository(this.dbConnection))
        }
        return this._userService
    },

    _userController: null as ReturnType<typeof createUserController> | null,
    get userController() {
        if (!this._userController) {
            this._userController = createUserController(this.userService)
        }
        return this._userController
    },

    _reportController: null as ReturnType<typeof createReportController> | null,
    get reportController() {
        if (!this._reportController) {
            this._reportController = createReportController(createReportService(createReportRepository(this.dbConnection)))
        }
        return this._reportController
    },

    _reviewController: null as ReturnType<typeof createReviewController> | null,
    get reviewController() {
        if (!this._reviewController) {
            this._reviewController = createReviewController(createReviewService(createReviewRepository(this.dbConnection)))
        }
        return this._reviewController
    },

    _tokensService: null as ReturnType<typeof createTokensService> | null,
    get tokensService() {
        if (!this._tokensService) {
            this._tokensService = createTokensService()
        }
        return this._tokensService
    },

    _tokensController: null as ReturnType<typeof createTokensController> | null,
    get tokensController() {
        if (!this._tokensController) {
            this._tokensController = createTokensController(this.tokensService)
        }
        return this._tokensController
    }
}