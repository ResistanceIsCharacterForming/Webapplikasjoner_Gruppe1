// src/db/index.ts

import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "./schema";
import { env } from "cloudflare:workers";



	// R2: R2Bucket;
    //     R2Test:R2Bucket;
	// 	bokkroken: D1Database;
    //     testing_bokkroken:D1Database;
	// 	ASSETS: Fetcher;

// async function getWorkerEnv(){
//   try {
//     const { env } = await import("cloudflare:workers");

//     if (!env || !env.bokkroken) {
//       throw new Error("D1 database instance not found in worker environment");
//     }
//     return env
//   } catch (error) {
//     throw new Error(
//       "Failed to get D1 database instance from worker environment"
//     );
//   }
// }


// // Factory function that accepts a D1 database instance
// export function createDatabase(
//   d1Database: D1Database
// ): DrizzleD1Database<typeof schema> {
//   if (!d1Database) {
//     throw new Error("D1 database instance is required");
//   }
//   return drizzle(d1Database, { schema });
// }

// // Setup database with provided D1 instance
// export function setupDb(d1Database: D1Database) {
//   if (dbInstance) {
//     return dbInstance;
//   }
//   dbInstance = createDatabase(d1Database);
//   return dbInstance;
// }

// export async function getDb(): Promise<DrizzleD1Database<typeof schema>> {
//   if (!dbInstance) {
//     dbInstance = createDatabase(await getWorkerEnv());
//   }
//   return dbInstance;
// }



// export function createR2Database(
//   R2Database: R2Bucket
// ){
//   if (!R2Database) {
//     throw new Error("D1 database instance is required");
//   }
//   return drizzle(d1Database, { schema });
// }

// // Setup database with provided D1 instance
// export function setupR2Db(d1Database: D1Database) {
//   if (dbInstance) {
//     return dbInstance;
//   }
//   dbInstance = createR2Database(d1Database);
//   return dbInstance;
// }

// export async function getR2Db(): Promise<DrizzleD1Database<typeof schema>> {
//   if (!dbInstance) {
//     dbInstance = createR2Database(await getWorkerEnv());
//   }
//   return dbInstance;
// }





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