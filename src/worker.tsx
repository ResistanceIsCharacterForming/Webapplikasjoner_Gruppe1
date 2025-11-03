import { defineApp } from "rwsdk/worker"
import { render, route } from "rwsdk/router"
import { Document } from "@/app/Document"
import { setCommonHeaders } from "./app/headers"
import { isAuthenticated } from "@/middleware/authentication"
import { apiHandler } from "@/utils/apiHandler"
import { pageHandler } from "@/utils/pageHandler"
import {  User } from "./db/schema";

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
