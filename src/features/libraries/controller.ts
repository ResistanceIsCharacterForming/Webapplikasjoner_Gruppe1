import { libraryService, postLibraryData } from "@/types/library";

export function createLibraryController(libraryService: libraryService) {
  /* Alle disse funksjonene skal til slutt kalle funksjoner / bruke services til å hente data. Men de kommer selv til å bygge ferdi Reponse objekt og sende det tilbake som svar for at API-kall / route.  */
  return {
    async listLibraries() {
      const result = await libraryService.listLibraries();
      if (result.success === true) {

        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async getLibraryById(id: string): Promise<Response> {
      const result = await libraryService.getLibraryWithId(id);
      if (result.success === true) {

        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async getLibraryByUserId(id: string): Promise<Response> {
      const result = await libraryService.listLibraryWithUserId(id)
      if (result.success === true) {

        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async listLibraryWithCords(lat: number, long: number): Promise<Response> {
      const result = await libraryService.listLibraryWithCords(lat, long)
      if (result.success === true) {
        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async createLibrary(data: postLibraryData) {
      const result = await libraryService.createLibrary(data)
       if (result.success === true) {
        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async editLibrary(id: string, data: any) {
      const result = await libraryService.editLibrary(id, data)
       if (result.success === true) {
        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async deleteLibrary(id: string) {
      const result = await libraryService.deleteLibraryWithId(id)
       if (result.success === true) {
        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    },
    async deleteLibraryByUserId(id: string) {
      const result = await libraryService.deleteLibraryWithUserId(id)
       if (result.success === true) {
        return new Response(
          JSON.stringify({
            data: result.data,
            success: true,
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
        )

      } else {

        return new Response(null, { status: 300 })

      }
    }
  }
}