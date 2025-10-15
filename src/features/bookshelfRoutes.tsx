import { prefix, route } from "rwsdk/router"
import { isAuthorized } from "./isAuthorized"
import { bookshelfController } from "./bookshelfController"

export const bookshelfRoutes = prefix("/bokhyller", [
    route("/:shelfId", async (ctx) => {

      const method = ctx.request.method.toLowerCase()
      const id = ctx.params.shelfId
      
      // Kall for å se om bruker kan redigere
      if (method === "put") {
        isAuthorized({ ctx })
      }

      switch(method) { 
        case "get":
          return bookshelfController.listBookshelves()
        case "post":
          return bookshelfController.createBookshelf("")
        case "put":
          return bookshelfController.editBookshelf("")
        default:
          return new Response("Method not allowed.", {status: 405})
      }
    }),

    route("/:shelfId/:reviewId", async(ctx) => {
      const method = ctx.request.method.toLowerCase()
      const id = ctx.params.reviewId

      switch(method) { 
        case "get":
          return new Response(
            JSON.stringify({
              data: `reviewId ${id}`,
              success: true
            }),
            {
              status: 201,
              headers: {"Content-Type": "application/json"}
            }
          )
        case "post":
          return
        case "put":
          return
        default:
          return new Response("Method not allowed.", {status: 405})
      }
    })
])