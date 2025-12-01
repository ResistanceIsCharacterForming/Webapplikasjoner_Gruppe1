/* Libraries */
import { createLibraryController } from "@/features/libraries/controller"
import { createLibraryService } from "@/features/libraries/service"
import { createLibraryRepository } from "@/features/libraries/repository"

/* Users */
import { createUserController } from "@/features/users/controller"
import { createUserService } from "@/features/users/service"
import { createUserRepository } from "@/features/users/repository"

/* Reports */
import { createReportController } from "@/features/reports/controller"
import { createReportService } from "@/features/reports/service"
import { createReportRepository } from "@/features/reports/repository"

/* Reviews */
import { createReviewController } from "@/features/reviews/controller"
import { createReviewService } from "@/features/reviews/service"
import { createReviewRepository } from "@/features/reviews/repository"

/* Tokens */
import { createTokensController } from "@/features/tokens/controller"
import { createTokensService } from "@/features/tokens/service"


/* Database */
import { createDbConnection, createR2Connection } from "@/db/index"

/* image handler*/ 
import { createImageService } from "@/features/images/service"
import { createImageRepository } from "@/features/images/repository"
import { createImageController } from "@/features/images/controller"

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
     _imageService: null as ReturnType<typeof createImageService> | null,
    get imageService(){
        if (!this._imageService){
            this._imageService = createImageService(createImageRepository(this.r2Connection))
        }
        return this._imageService
    },
    _ImageController: null as ReturnType<typeof createImageController> | null,
    get ImageController(){
        if (!this._ImageController){
            this._ImageController = createImageController(createImageService(createImageRepository(this.r2Connection)))
        }
        return this._ImageController
    }
    ,
    _ImageService: null as ReturnType<typeof createImageService> | null,
    get ImageService(){
        if (!this._ImageService){
            this._ImageService = createImageService(createImageRepository(this.r2Connection))
        }
        return this._ImageService
    }
    ,
    _libraryService: null as ReturnType<typeof createLibraryService> | null,
    get libraryService() {
        if (!this._libraryService) {
            this._libraryService = createLibraryService(createLibraryRepository(this.dbConnection))
        }
        return this._libraryService
    },
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
    _reportService: null as ReturnType<typeof createReportService> | null,
    get reportService() {
        if (!this._reportService) {
            this._reportService = createReportService(createReportRepository(this.dbConnection))
        }
        return this._reportService
    },
    _reportController: null as ReturnType<typeof createReportController> | null,
    get reportController() {
        if (!this._reportController) {
            this._reportController = createReportController(createReportService(createReportRepository(this.dbConnection)))
        }
        return this._reportController
    },
      _reviewService: null as ReturnType<typeof createReviewService> | null,
    get reviewService() {
        if (!this._reviewService) {
            this._reviewService = createReviewService(createReviewRepository(this.dbConnection))
        }
        return this._reviewService
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