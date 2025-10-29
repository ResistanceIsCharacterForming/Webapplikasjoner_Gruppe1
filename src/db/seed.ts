// src/db/seed.ts

import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";

import { users,reviews,reviewsEndorsements,reports,libraries,favoritLibraries,admins } from "./schema";
import { db } from "./index";

export  const seed = async () =>{
  try { 
    await db.delete(users);
    await db.delete(libraries);
    await db.delete(admins);
    await db.delete(reviews);
    await db.delete(reviewsEndorsements);
    await db.delete(favoritLibraries);
    await db.delete(reports); 

      // Insert a user
    await db.insert(users).values({
        name: "madsuser",
        email: "mads.soyland@gmail.com",
        password: "tempnothashed",
        settings: "{}",
        createdAt: new Date().toISOString(),
        profileImage:""
    });

      await db.insert(users).values({
        name: "madsuser2",
        email: "mjsoylan@hiof.no",
        password: "tempnothashed",
        settings: "{}",
        createdAt: new Date().toISOString(),
        profileImage:""
    });

     await db.insert(users).values({
        name: "nikolaiuser",
        email: "nikol.lysebraate@hiof.no",
        password: "tempnothashed",
        settings: "{}",
        createdAt: new Date().toISOString(),
        profileImage:""
    });

    
     await db.insert(users).values({
        name: "mathias",
        email: "mathias.hem@hiof.no",
        password: "tempnothashed",
        settings: "{}",
        createdAt: new Date().toISOString(),
        profileImage:""
    });
   
     const newUserId = await db.select({id: users.id}).from(users)

      // 0 er mads,1 er mads2,2 er nikolai,3 er mathias
      // Insert a library
    await db.insert(libraries).values({
        userId: newUserId[0].id,
        name: "halden skole",  
        text: "dette er test bibliotek",
        cordlat:"59.129280",
        cordlon:"11.353732",
        books: "it for dummies, javascript for dummies, learning python",
        createdAt: new Date().toISOString(),
        photos:"{}"
    });

     await db.insert(libraries).values({
        userId: newUserId[0].id,
        name: "halden brannstasjon",  
        text: "dette er test bibliotek",
        cordlat:"59.126407",
        cordlon:"11.35266",
        books: "brannsikerhet v1,brannsikerhet v2, brannsikhert for barn v1",
        createdAt: new Date().toISOString(),
        photos:"{}"
    });

    await db.insert(libraries).values({
        userId: newUserId[2].id,
        name: "hiof studenleiligheter",  
        text: "dette er test bibliotek",
        cordlat:"59.130680",
        cordlon:"11.35497",
        books: "ringes herre,hunger games,where is waldo",
        createdAt: new Date().toISOString(),
        photos:"{}"
    });

      await db.insert(libraries).values({
        userId: newUserId[3].id,
        name: "solbergtårnet",  
        text: "dette er test bibliotek",
        cordlat:"59.211874",
        cordlon:"11.163802",
        books: "",
        createdAt: new Date().toISOString(),
        photos:"{}"
    });


    // Insert an admin
    await db.insert(admins).values({
        userId: newUserId[0].id,
        adminLevel: 0,
        createdAt: new Date().toISOString(),
    });
    await db.insert(admins).values({
        userId: newUserId[2].id,
        adminLevel: 0,
        createdAt: new Date().toISOString(),
    });
    await db.insert(admins).values({
        userId: newUserId[3].id,
        adminLevel: 1,
        createdAt: new Date().toISOString(),
    });
    


    const newLibaryId = await db.select({id: libraries.id}).from(libraries)
    // 0 er hiof,1 er brannstasjon halden,2 hiof studenleigheter,3 er solbergtårnet  
    // Insert a review
    await db.insert(reviews).values({
        userId: newUserId[0].id,
        libaryId: newLibaryId[0].id,  
        text: "dette er en test anmeldelse",
        reviewsPoints: 5,
        createdAt: new Date().toISOString(),
    });
      await db.insert(reviews).values({
        userId: newUserId[2].id,
        libaryId: newLibaryId[0].id,  
        text: "dette er en test anmeldelse",
        reviewsPoints: 3,
        createdAt: new Date().toISOString(),
    });
      await db.insert(reviews).values({
        userId: newUserId[3].id,
        libaryId: newLibaryId[0].id,  
        text: "dette er en test anmeldelse",
        reviewsPoints: 4,
        createdAt: new Date().toISOString(),
    });


      const newReviewId = await db.select({id: reviews.id}).from(reviews)
    // Insert a review usefulness
    await db.insert(reviewsEndorsements).values({  
        userId: newUserId[0].id,
        reviewId: newReviewId[0].id,
    });

    await db.insert(reviewsEndorsements).values({  
        userId: newUserId[2].id,
        reviewId: newReviewId[0].id,
    });

  await db.insert(reviewsEndorsements).values({  
        userId: newUserId[3].id,
        reviewId: newReviewId[0].id,
    });


    // Insert a favorit library
    await db.insert(favoritLibraries).values({
        userId: newUserId[0].id,
        libaryId: newLibaryId[0].id,  
    });
     // Insert a favorit library
    await db.insert(favoritLibraries).values({
        userId: newUserId[2].id,
        libaryId: newLibaryId[2].id,  
    });
     // Insert a favorit library
    await db.insert(favoritLibraries).values({
        userId: newUserId[3].id,
        libaryId: newLibaryId[3].id,  
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


    return;

   
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json({
      success: false,
      error: "Failed to seed database",
    });
  }
};
