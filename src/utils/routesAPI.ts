import { tokensRoutes } from "@/features/token/routes"
import { librariesRoutes } from "@/features/library/routes"
import { usersRoutes } from "@/features/user/routes"
import { Route } from "rwsdk/router"


export const APIv1: Route[] = [...librariesRoutes, ...usersRoutes, ...tokensRoutes]