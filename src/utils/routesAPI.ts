import { tokensRoutes } from "@/features/tokens/routes"
import { librariesRoutes } from "@/features/libraries/routes"
import { usersRoutes } from "@/features/users/routes"
import { Route } from "rwsdk/router"
import { imageRoutes } from "@/features/images/routes"


export const APIv1: Route[] = [...librariesRoutes, ...usersRoutes, ...tokensRoutes,...imageRoutes]