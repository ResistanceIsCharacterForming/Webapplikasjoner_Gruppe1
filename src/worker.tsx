import { defineApp } from "rwsdk/worker";
import { render, route, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";

import { User, users } from "./db/schema/users-schema";
import { setCommonHeaders } from "./app/headers";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";

import { adminRoutes } from "./features/adminRoutes";
import { userRoutes } from "./features/userRoutes";
import { isAuthenticated } from "./features/isAuthenticated";

import { apiHandler } from "@/utils/apiHandler";
import Home from "./home";

import { MapScreen } from "./features/map/pages/mapScreen";
import { seed } from "./db/seed";
import { libraries } from "./db/schema";

export interface Env {
  bokkroken: D1Database;
}

export type AppContext = {
  user: User | undefined;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),

  isAuthenticated,

  render(Document, [
    route("/", async () => {
      
      console.log("test starting drizzle thang");
      const db = drizzle(env.bokkroken);
      await db.delete(libraries);
      //const seeddatabase = await seed();
      //await db.insert(users).values({name: "user",email: "email",password: "safe",settings: "test",createdAt: new Date().toISOString(),});
      const userResult = await db.select().from(users);
      console.log("test starting drizzle thang");
      console.log();
      return (
        <>
          <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Start</h1>
            <p>Velkommen til eksempel</p>
            <p>Databasen har {userResult.length} brukere</p>
            <p>user id:{userResult[0].id}</p>
            <p>user password:{userResult[0].password}</p>
            <p>user email:{userResult[0].email}</p>
            <p>user name:{userResult[0].name}</p>
            <p>user set:{userResult[0].settings}</p>
            <p>user date:{userResult[0].createdAt}</p>
            <div style={{ margin: "1.5rem 0" }}>
              <a
                href="/home"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#0070f3",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                Go to Home Page
              </a>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              Note: The home page is protected and requires authentication. You
              will be redirected to login if you're not signed in.
            </p>
          </div>
        </>
      );
    }),
    route("/home", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/" },
          });
        }
      },
      Home,
    ]),
  ]),

  route("/api/v*/*/", (ctx) => {
    return apiHandler(ctx);
  }),
  route("/map", MapScreen),
]);
