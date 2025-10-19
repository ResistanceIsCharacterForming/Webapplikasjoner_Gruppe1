import { defineApp } from "rwsdk/worker"
import { render, route, prefix } from "rwsdk/router"
import { Document } from "@/app/Document"

import { User, users } from "./db/schema/user-schema"
import { setCommonHeaders } from "./app/headers"
import { env } from "cloudflare:workers"
import { drizzle } from "drizzle-orm/d1"

import { adminRoutes } from "./features/adminRoutes"
import { userRoutes } from "./features/userRoutes"
import { isAuthenticated } from "./features/isAuthenticated"

import { apiHandler } from "@/features/apiHandler"
import Home from "./home"

export interface Env {
  DB: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
}

export default defineApp([
  setCommonHeaders(),
  
  isAuthenticated,

  render(Document, [
    route("/", Home)
  ]),

  route("/api/v*/*/", (ctx) => {return apiHandler(ctx)})
])