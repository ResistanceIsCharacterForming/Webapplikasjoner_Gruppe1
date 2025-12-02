import { defineApp } from "rwsdk/worker"
import { layout, prefix, render, route } from "rwsdk/router"
import { Document } from "@/app/Document"
import { setCommonHeaders } from "./app/headers"

import { authCheck, hasAdminRights, isAdmin } from "@/middleware/authHandler"

import { APIv1 } from "@/backend/features/shared/utils/routesAPI"
import { user } from "@/backend/types/user"
import LoginScreen from "@/frontend/features/auth/components/Login"
import RegisterScreen from "@/frontend/features/auth/components/Register"
import DashboardScreen from "@/frontend/features/dashboard/components/dashboard"
import Landing from "@/frontend/features/landing/Landing"
import MapSafeGuard from "@/frontend/features/map/components/MapSafeguard"
import { FrontLayout } from "@/frontend/features/shared/components/layouts/FrontLayout"
import { MainLayout } from "@/frontend/features/shared/components/layouts/MainLayout"
/*import { MainLayout } from "./features/tokens/layouts/Layout"*/




export interface Env {
  bokkroken: D1Database;
}

export type AppContext = {
  user: user | undefined;
  authUrl: string;
}

export default defineApp([
  setCommonHeaders(),

  authCheck,

  prefix("/api/v1/", APIv1),

  render(Document, [

    route("/", Landing),

    layout(FrontLayout, [
      route("/login", LoginScreen),
      route("/register", RegisterScreen),
      
    ]),

    layout(MainLayout, [
      hasAdminRights,
      route("/home", MapSafeGuard),
    ])
    ,route("/dashboard", [isAdmin, DashboardScreen])

  ])
])