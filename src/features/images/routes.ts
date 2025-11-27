import { singletonMaster } from "@/utils/singletonBuilder"
import { route } from "rwsdk/router"

export const imageRoutes = [
  route("image/:id", async (ctx) => {
    const method = ctx.request.method.toLowerCase()
    const controller = singletonMaster.ImageController
    const imageKey = ctx.params?.id ?? undefined
    if (imageKey === undefined) return new Response("No Id", { status: 401 })
    if (method === "get") {
      const response = await controller.getImage(imageKey)
      return response
    }
    if (method === "post") {
      if (imageKey !== "") {
        try {
          const data = await ctx.request.body
          const response = await controller.putImage(imageKey, data)
          return new Response("sendt?" + imageKey.toString() + " id", { status: 404 })
        } catch {
          return new Response("Bad Request " + imageKey.toString(), { status: 404 })
        }
      }
    }
    if (method === "delete") {
      if (imageKey !== "") {
        try {
          const response = await controller.deleteImage(imageKey)
          return new Response("deleted img: " + imageKey.toString(), { status: 404 })
        } catch {
          return new Response("failed Request to delete " + imageKey.toString(), { status: 404 })
        }
      }
    }
  })
]


