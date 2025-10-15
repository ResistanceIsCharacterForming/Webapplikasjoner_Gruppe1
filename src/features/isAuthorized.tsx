// Check if the user is authenticated. Reads from context (ctx) from RedwoodSDK's ...
export function isAuthorized({ ctx }) {

    console.log("isAuthorized")
    console.log(ctx)

  // Ensure that this user is authenticated

  /*
  if (!ctx.user) {

    return new Response("Unauthorized", { status: 401 })

  }*/

}