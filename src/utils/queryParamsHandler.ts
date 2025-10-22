/* MERK: Jeg skal skrive om alt her for å bruke URL -- https://developer.mozilla.org/en-US/docs/Web/API/URL/URL -- kjente ikke til den før. */



/* This is a lightweight helper function to take a url and parse any query parameter inside it. Example of how to use this function: const [ id, test ] = filterQueryParams(ctx, ["id", "test"]) */
/* ctx is the same as used for routing. We need it to get the url. params is a array of strings, this is the keys we are expecting. */
export const filterQueryParams = (ctx: any, params: string[]) => {
    if (!ctx.request.url.includes("?")) return []
    /* We get the entire url. Example: http://localhost:5173/api/v1/bookshelf?id=949494&test=iffi */
    let url: string[] = ctx.request.url.split("/")
    /* At the same time we turn the url into an array of strings. */
    /*[
    'http:',
    '',
    'localhost:5173',
    'api',
    'v1',
    'bookshelf?id=949494&test=iffi'
    ]*/
    /* Isolate the part we want: bookshelf?id=949494&test=iffi */
    const tail: string = url[url.length - 1]
    /* Part of a series of operations to extract the key value pairs. [ 'bookshelf', 'id=949494&test=iffi' ] is what we have now. */
    let paramsFromUrlRaw: string[] = tail.split("?")
    /* We have now removed the first element: [ 'id=949494&test=iffi' ] */
    paramsFromUrlRaw = paramsFromUrlRaw.slice(1)
    /* If something went wrong and paramsFromUrlRaw is empty, return early. */
    if (!paramsFromUrlRaw[0]) return []
    /* A bit convoluted however we have extracted the key value pair:  [ 'id=949494', 'test=iffi' ] */
    const paramsFromUrl: string[] = paramsFromUrlRaw[0].split("&")
    /* One controll variables. */
    let index: number = 0
    /* We run map for each param inside paramsFromUrl, building a array of strings, these are the values from the url.  */
    let values: (string | undefined)[] = paramsFromUrl.map((param: string) => {
        /* Each param must have one equal sign, otherwise we cant safely turn the param into an array and destruct it. */
        if ((param.split("=").length - 1) > 1) return ""
        /* Destruct the key (id) and value (949494) from the params we extracted before (id=949494).  */
        const [ parmaKey, paramValue ] = param.split("=") as [string, string]
        /* If the paraKey is expected, meaning inside params, proceed. */
        if (params.includes(parmaKey)) {
            index++
            /* Add the value from the param to the values array. */
            return paramValue
        }
    })
    /* Send back the new values. */
    return values
}