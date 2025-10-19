/* This is a lightweight helper function to take a url and parse any query parameter inside it. */
/* ctx is the same as used for routing. We need it to get the url. params is a array of strings, this is the keys we are expecting. */
export const filterQueryParams = (ctx: any, params: string[]) => {
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
    /* Two controll variables. */
    let lock: boolean = false
    let index: number = 0
    /* If the url has more or less params than what we expect, return early. */
    if (paramsFromUrl.length !== params.length) return []
    /* We run map for each param inside paramsFromUrl, building a array of strings, these are the values from the url.  */
    let values: (string | undefined)[] = paramsFromUrl.map((param: string) => {
        /* Each param must have one equal sign, otherwise we cant safely turn the param into an array and destruct it. */
        if ((param.split("=").length - 1) > 1) lock = true
        /* Destruct the key (id) and value (949494) from the params we extracted before (id=949494).  */
        const [ parmaKey, paramValue ] = param.split("=") as [string, string]
        /* If the paraKey is expected, meaning inside params, proceed. */
        if (params.includes(parmaKey)) {
            /* If the lock isn't turned on, and the key matches the next expected key, proceed. Otherwise turn lock on to return nothing after map is finished. */
            if (lock !== true && parmaKey !== params[index]) lock = true
            index++
            /* Add the value from the param to the values array. */
            return paramValue
        }
    })
    /* Since you can't break from a map this is my solution to force an exact match of key value pairs from the url. We return a empty array if lock is turned on. Meaning if anything went wrong after we entered the map, lock is set to true. Before this we can do an early return. I don't know if this is more wasteful than doing a for-loop, however it feels cleanier to work with map, in terms of building the values array. */
    return lock === false ? values : []
}