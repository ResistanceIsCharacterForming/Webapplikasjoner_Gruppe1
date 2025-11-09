import { defineApp } from "rwsdk/worker"
import { layout, prefix, render, route } from "rwsdk/router"
import { Document } from "@/app/Document"
import { setCommonHeaders } from "./app/headers"
import { env } from "cloudflare:workers"

import { pageHandler } from "@/utils/pageHandler"

import { User, users } from "@/db/schema/"
import { MapScreen } from "./features/library/pages/mapScreen";

import { seed } from "./db/seed";
import { admins, libraries, reviews } from "./db/schema";
import { createReportService } from "./features/report/service";
import { createReportRepository } from "./features/report/repository";


  /*
  route("/hi", () => {
    return new Response("Logged in", {
      headers: {
        "Set-Cookie": "token=YOUR_JWT; HttpOnly; Path=/; Secure; SameSite=Lax",
        "Content-Type": "text/plain",
      }
    })
  }),

  route("/u", (ctx) => {
    
    const cookieHeader = ctx.request.headers.get("cookie")
    const cookieHeader = ctx.request.headers.getSetCookie()
 
    console.log(cookieHeader)


  }),
  */
  

import { authCheck } from "@/middleware/authHandler"
import { extractParams } from "./utils/params"
import { MainLayout } from "./features/token/layouts/Layout"

import { APIv1 } from "./utils/routesAPI"

import { singletonMaster } from "@/utils/singletonBuilder"
import { librariesRoutes } from "./features/library/routes"
import RegisterScreen from "./features/token/pages/Register"
import LoginScreen from "./features/token/pages/Login"
import DashboardScreen from "./features/report/pages/Dashboard"

export interface Env {
  bokkroken: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
}



export default defineApp([
  setCommonHeaders(),

  
  authCheck,

  prefix("/api/v1/", APIv1),

  render(Document, [
   /* layout(MainLayout, [*/
      route("/home", MapScreen),
      route("/login", LoginScreen),
      route("/register", RegisterScreen),
      route("/dashboard", DashboardScreen)
    /*])*/
  ])

])