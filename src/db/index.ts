
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "./schema";

import { env } from "cloudflare:workers"

export const createDbConnection =  (): drizzle => {
    return drizzle(env.bokkroken, { schema })
}

export const createR2Connection = ():R2Bucket =>{
    return env.R2
}

export const createTestDbConnection =  ():drizzle => {
    return drizzle(env.testing_bokkroken, {schema})
}

export const createTestR2Connection = ():R2Bucket =>{
    return env.R2Test
}