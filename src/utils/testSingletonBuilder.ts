import { createTestDbConnection, createTestR2Connection } from "@/db"
import { singletonMaster } from "./singletonBuilder"


const bla =singletonMaster

bla._dbConnection= createTestDbConnection()

bla._r2Connection= createTestR2Connection()


export const testsingletonMaster = singletonMaster