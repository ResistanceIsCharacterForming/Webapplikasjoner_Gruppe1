import { defineApp } from "rwsdk/worker"
import { layout, prefix, render, route } from "rwsdk/router"
import { Document } from "@/app/Document"
import { setCommonHeaders } from "./app/headers"
import { env } from "cloudflare:workers"

import { user, users } from "@/db/schema/"
import { MapScreen } from "./features/libraries/pages/mapScreen";

import { authCheck, isAdmin } from "@/middleware/authHandler"
/*import { MainLayout } from "./features/tokens/layouts/Layout"*/

import { APIv1 } from "./utils/routesAPI"

import RegisterScreen from "./features/tokens/pages/Register"
import LoginScreen from "./features/tokens/pages/Login"
import DashboardScreen from "./features/reports/pages/dashboard"
import { FrontLayout } from "./features/tokens/layouts/FrontLayout"
import { databasescreen } from "./test"
import Landing from "./features/libraries/pages/Landing"

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
      route("/register", RegisterScreen)
    ]),

    /*layout(MainLayout, [*/
      route("/home", MapScreen),
      route("/db",databasescreen),
      route("/dashboard", [isAdmin, DashboardScreen])
    /*])*/
  ])
])