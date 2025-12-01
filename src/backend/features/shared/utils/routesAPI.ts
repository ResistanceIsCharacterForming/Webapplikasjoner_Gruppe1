import { tokensRoutes } from "@/backend/features/tokens/core/routes"
import { librariesRoutes } from "@/backend/features/libraries/core/routes"
import { usersRoutes } from "@/backend/features/users/core/routes"
import { Route } from "rwsdk/router"
import { imageRoutes } from "@/backend/features/images/core/routes"
import { reviewsRoutes } from "@/backend/features/reviews/core/routes"
import { reportsRoutes } from "@/backend/features/reports/core/routes"


export const APIv1: Route[] = [
    ...librariesRoutes, ...usersRoutes,
    ...tokensRoutes,...imageRoutes,
    ...reviewsRoutes,...reportsRoutes]
