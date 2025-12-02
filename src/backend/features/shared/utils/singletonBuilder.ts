

/* Libraries */
import { createLibraryController } from "@/backend/features/libraries/core/controller"
import { createLibraryService } from "@/backend/features/libraries/core/service"
import { createLibraryRepository } from "@/backend/features/libraries/core/repository"

/* Users */
import { createUserController } from "@/backend/features/users/core/controller"
import { createUserService } from "@/backend/features/users/core/service"
import { createUserRepository } from "@/backend/features/users/core/repository"

/* Reports */
import { createReportController } from "@/backend/features/reports/core/controller"
import { createReportService } from "@/backend/features/reports/core/service"
import { createReportRepository } from "@/backend/features/reports/core/repository"

/* Reviews */
import { createReviewController } from "@/backend/features/reviews/core/controller"
import { createReviewService } from "@/backend/features/reviews/core/service"
import { createReviewRepository } from "@/backend/features/reviews/core/repository"

/* Tokens */
import { createTokensController } from "@/backend/features/tokens/core/controller"
import { createTokensService } from "@/backend/features/tokens/core/service"


/* Database */
import { createDbConnection, createR2Connection } from "@/db/index"

/* image handler*/
import { createImageService } from "@/backend/features/images/core/service"
import { createImageRepository } from "@/backend/features/images/core/repository"
import { createImageController } from "@/backend/features/images/core/controller"

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

    _r2Connection: null as ReturnType<typeof createR2Connection> | null,
    get r2Connection() {
        if (!this._r2Connection) {
            this._r2Connection = createR2Connection()
        }
        return this._r2Connection
    },
    _imageService: null as ReturnType<typeof createImageService> | null,
    get imageService() {
        if (!this._imageService) {
            this._imageService = createImageService(createImageRepository(this.r2Connection))
        }
        return this._imageService
    },
    _ImageController: null as ReturnType<typeof createImageController> | null,
    get ImageController() {
        if (!this._ImageController) {
            this._ImageController = createImageController(createImageService(createImageRepository(this.r2Connection)))
        }
        return this._ImageController
    },
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
            this._libraryController = createLibraryController(this.libraryService)
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