import { defineApp } from "rwsdk/worker"
import { render, route, prefix } from "rwsdk/router"
import { Document } from "@/app/Document"

import { setCommonHeaders } from "./app/headers"
import { env } from "cloudflare:workers"

import { isAuthenticated } from "@/middleware/authentication"
import { isAuthorized } from "@/middleware/authorization/authorization"

import { apiHandler } from "@/utils/apiHandler"
import { pageHandler } from "@/utils/pageHandler"

import { User, users } from "@/db/schema/user-schema"
import { MapScreen } from "./features/map/pages/mapScreen";

import { seed } from "./db/seed";
import { admins, libraries, reviews } from "./db/schema";

import { Testing } from "@/test"

export interface Env {
  bokkroken: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
}


export default defineApp([
  setCommonHeaders(),

  isAuthenticated,

  render(Document, [
   
  isAuthenticated,
  
  route("/api/v1/*/", [isAuthenticated, (ctx: any) => {
    return apiHandler(ctx)
  }]),
  
  render(Document, [
    route("/*/", (ctx: any) => {
      return pageHandler(ctx)
    })
  ])
])
])