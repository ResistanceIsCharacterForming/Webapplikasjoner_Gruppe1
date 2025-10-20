// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";

import { users,reviews,reviewUsefullness,reports,libraries,favoritLibraries,admins } from "./schema";

export default defineScript( async ({ env }) => {
  try {
    const db = drizzle(env.bokkroken);
   
    await db.delete(users);
    await db.delete(libraries);
    await db.delete(admins);
    await db.delete(reviews);
    await db.delete(reviewUsefullness);
    await db.delete(favoritLibraries);
    await db.delete(reports);  
      // Insert a user


    await db.insert(users).values({
        name: "user",
        email: "email",
        password: "safe",
        settings: "test",
        createdAt: new Date().toISOString(),
    });
   
     const newUserId = await db.select({id: users.id}).from(users).limit(1)


      // Insert a library
    await db.insert(libraries).values({
        userId: newUserId[0].id,
        name: "halden skole",  
        text: "dette er test bibliotek",
        cordinats: "lat=59.129280 & lon=11.353732",
        books: "it for dummies, javascript for dummies, learning python",
        createdAt: new Date().toISOString(),
    });


    // Insert an admin
    await db.insert(admins).values({
        userId: newUserId[0].id,
        adminLevel: 1,
        createdAt: new Date().toISOString(),
    });


    const newLibaryId = await db.select({id: libraries.id}).from(libraries).limit(1)  
    // Insert a review
    await db.insert(reviews).values({
        userId: newUserId[0].id,
        libaryId: newLibaryId[0].id,  
        text: "dette er en test anmeldelse",
        reviewsPoints: 5,
        createdAt: new Date().toISOString(),
    });


      const newReviewId = await db.select({id: reviews.id}).from(reviews).limit(1)
    // Insert a review usefulness


    await db.insert(reviewUsefullness).values({  
        userId: newUserId[0].id,
        reviewId: newReviewId[0].id,
    });


    // Insert a favorit library
    await db.insert(favoritLibraries).values({
        userId: newUserId[0].id,
        libaryId: newLibaryId[0].id,  
    });


    // Insert a rapport
    await db.insert(reports).values({
        userId: newUserId[0].id,  
        raportType: "User",
        raportLevel: 1,
        text: "dette er en test rapport",
        createdAt: new Date().toISOString(),
    });




   
    // Verify the insert by selecting all users
    const result = await db.select().from(users).all();


    console.log("🌱 Finished seeding");


    return Response.json(result);

   
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database",
    });
  }
});
