// src/db/index.ts

import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";

export const createDbConnection = (): drizzle => {
    return drizzle(env.bokkroken, { schema })
}

export const createR2Connection =():R2Bucket =>{
    return env.R2
}