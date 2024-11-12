// import { betterAuth } from "better-auth";
// import Database from "better-sqlite3";

// export const auth = betterAuth({
//     database: new Database("./sqlite.db"),
//     emailAndPassword: {  
//         enabled: true,
//         requireEmailVerification:false,
//         minPasswordLength:4,
//     },
// })



import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/lib/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
      ...schema
      }
    }),
    emailAndPassword: {  
        enabled: true,
        requireEmailVerification:false,
        minPasswordLength:4,
    },
})