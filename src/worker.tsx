import { defineApp } from "rwsdk/worker"
import { render, route, prefix } from "rwsdk/router"
import { Document } from "@/app/Document"

import { setCommonHeaders } from "./app/headers"
import { env } from "cloudflare:workers"

import { apiHandler } from "@/utils/apiHandler"
import { pageHandler } from "@/utils/pageHandler"

import { User, users } from "@/db/schema/"
import { MapScreen } from "./features/library/pages/mapScreen";

import { seed } from "./db/seed";
import { admins, libraries, reviews } from "./db/schema";
import { createReportService } from "./features/report/service";
import { createReportRepository } from "./features/report/repository";

import { Testing } from "@/test"

import { authCheck } from "@/middleware/authHandler"

export interface Env {
  bokkroken: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
}


export default defineApp([
  setCommonHeaders(),

  render(Document, [

  authCheck,
  
  route("/api/v1/*/", [(ctx: any) => {
    return apiHandler(ctx)
  }]),

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
  
  render(Document, [
    route("/home", MapScreen )
  ])
])
])
