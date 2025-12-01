/* This is a lightweight helper function to take a url and parse any query parameter inside it. Example of how to use this function: const [ id, test ] = filterQueryParams(ctx, ["id", "test"]) */
/* ctx is the same as used for routing. We need it to get the url. params is a array of strings, this is the keys we are expecting. */

export const filterQueryParam = (ctx: any, param: string) => {
    // early check to see if it even includes the param 
    if (!ctx.request.url.includes("?")) return 
    let url: string[] = ctx.request.url.split("/")
    const tail: string = url[url.length - 1]
    // early check to see if it even includes the param since if not no reason to check more as it does not have it
    if (!tail.includes(param + "=")) return 
    let paramsFromUrlRaw: string[] = tail.split("?")
    paramsFromUrlRaw = paramsFromUrlRaw.slice(1)
    // early return here if the raw is empty and that means no params
    if (!paramsFromUrlRaw[0]) return 
    const paramsFromUrl: string[] = paramsFromUrlRaw[0].split("&")
    // checks all tha params if their are muliple or just one and will compare the param and then send its value back if it match
    for (let index = 0; index < paramsFromUrl.length; index++) {
        const parameter = paramsFromUrl[index];
        let returnvalue = parameter.split("=")
        if (returnvalue[0] === param) {
            return returnvalue[1]
        }
    }
    // returns here since the param was not completly the same
    return 
}