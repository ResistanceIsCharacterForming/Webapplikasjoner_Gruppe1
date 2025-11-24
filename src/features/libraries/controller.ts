import { libraryService, postLibraryData } from "@/types/library";

export function createLibraryController(libraryService: libraryService) {
  /* Alle disse funksjonene skal til slutt kalle funksjoner / bruke services til å hente data. Men de kommer selv til å bygge ferdi Reponse objekt og sende det tilbake som svar for at API-kall / route.  */
  return {
    async listLibraries() {
      const result = await libraryService.listLibraries();
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    async getLibraryById(id: string): Promise<Response> {
      const result = await libraryService.getLibraryWithId(id);
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    async getLibraryByUserId(id: string): Promise<Response> {
      const result = await libraryService.listLibraryWithUserId(id)
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    async listLibraryWithCords(lat:number,long:number): Promise<Response> {
      const result = await libraryService.listLibraryWithCords(lat,long)
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    async createLibrary(data: postLibraryData) {
      const result = await libraryService.createLibrary(data)
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      )
    },
    async editLibrary(id: string, data:any) {
       const result = await libraryService.editLibrary(id,data)
      return new Response(
        JSON.stringify({
         data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    async deleteLibrary(id: string) {
      const result = await libraryService.deleteLibraryWithId(id)
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        })
  },
     async deleteLibraryByUserId(id: string) {
      const result = await libraryService.deleteLibraryWithUserId(id)
      return new Response(
        JSON.stringify({
          data: result.data,
          success: result.success,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        })
  }
}
}