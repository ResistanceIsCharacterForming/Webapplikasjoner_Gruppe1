import { prefix, route } from "rwsdk/router"

import { isAuthorized } from "./isAuthorized"

export const userRoutes = prefix("/bruker", [
    isAuthorized,
    route("/:brukerId", async (ctx) => {

        const id = ctx.params.brukerId

        return new Response(
            JSON.stringify({
              data: `brukerId ${id}`,
              success: true
            }),
            {
              status: 201,
              headers: {"Content-Type": "application/json"}
            }
          )

    })
])