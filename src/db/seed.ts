// src/db/seed.ts
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder";
import { hashPassword } from "@/backend/features/users/core/service";
import { admins, libraries, reviews, reviewsEndorsements, favoriteLibraries, reports, users } from "./schema";
import { user } from "@/backend/types/user";
import { library } from "@/backend/types/library";
import { useRandomNameGenerator } from "@/backend/features/shared/utils/useRandomNameGenerator";
const db = singletonMaster.dbConnection

function randomCreateData(){
  return "Mon Dec 01 2025 11:55:"+ Math.floor(Math.random()*58+1)+" GMT+0100 (Central European Standard Time)"
}

function randomLoginData(){
  return "Mon Dec 01 2025 11:57:"+ Math.floor(Math.random()*58+1)+" GMT+0100 (Central European Standard Time)"
}

function randomUsers(amount:number):Partial<user>[]{
  const userlist =[]
  for (let index = 0; index < amount; index++) {
    userlist[index]= {
    name: useRandomNameGenerator(),
    email: "random"+Math.floor(Math.random()*9999)+"@gmail.com",
    password: "b60b1b8731dbed62a45d9fbce9afaf90:559246f6eabd22d47bd15c544a66c1a8cc5ecbdcc285118b9e4ab8f275b3bd72ee19e26eb97cfbf3d5557a2b1f2c41fea8dc16f65557840d0528cc567da659c0", // its just 123 in our hashed system
    settings: "{}",
    createdAt: randomCreateData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  } 
  }
  return userlist
}
try {
  //make sure the tables are empty
  await db.delete(admins);
  await db.delete(libraries);
  await db.delete(reviews);
  await db.delete(reviewsEndorsements);
  await db.delete(favoriteLibraries);
  await db.delete(reports);
  await db.delete(users);



  //partial do id is made in the db
  const password = await hashPassword("passowrd@1")
  const madsuser: Partial<user> = {
    name: useRandomNameGenerator(),
    email: "mads.soyland@gmail.com",
    password: password,
    settings: "{}",
    createdAt: randomCreateData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  };
  const adminbruker: Partial<user> = {
    name: "free_grass(O.O)",
    email: "administrator@gmail.com",
    password: "6312d419432f8b9ac59c4a01df186004:399bd2ab57d6737f35af01f077385217d67a29dde3842d6861b5673ff9efb70cdced8693238eebf2e21574790f617f4de66e46b1240859f2babd33dee20738b0",
    settings: "{}",
    createdAt: randomCreateData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  }
  
  const normalbruker: Partial<user> = {
    name: "sweet_bee(*-*)",
    email: "ellen.norman@gmail.com",
    password: "200dabc91a6099164f6512bc113e89f2:6915dc1addb7cd6b9504453ded1fda6b7ac615351a7043c3f9f9aa29e40754a2f94658eb66e5f0c7f71390dabe17ed1a47818b138af4815702abef5e1e8dc430",
    settings: "{}",
    createdAt: randomCreateData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  }

  const nikolaiuser: Partial<user> = {
    name: useRandomNameGenerator(),
    email: "nikol.lysebraate@hiof.no",
    password: password,
    settings: "{}",
    createdAt: randomCreateData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  };


  // Insert a user
  await db.insert(users).values(adminbruker);

  await db.insert(users).values(normalbruker);

  await db.insert(users).values(madsuser);

  await db.insert(users).values(nikolaiuser)

  const randoms = randomUsers(20)

  for (let index = 0; index < randoms.length; index++) {
    await db.insert(users).values(randoms[index])    
  }



  const newUserId = await db.select({ id: users.id }).from(users)
  // 0 er adminbruker,1 er normalbruker resten burde bli lagde nye

  const halden_skole: Partial<library> = {
    userId: newUserId[0].id,
    name: "halden skole",
    text: "dette er test bibliotek",
    cordlat: 59.129280,
    cordlon: 11.353732,
    books: "it for dummies, javascript for dummies, learning python",
    createdAt: new Date().toISOString(),
    photos: "{}",
    isVisible: true
  }

  const halden_brannstasjon: Partial<library> = {
    userId: newUserId[0].id,
    name: "halden brannstasjon",
    text: "dette er test bibliotek",
    cordlat: 59.126407,
    cordlon: 11.35266,
    books: "brannsikerhet v1,brannsikerhet v2, brannsikhert for barn v1",
    createdAt: new Date().toISOString(),
    photos: "{}",
    isVisible: true
  }

  const hiof_studenleiligheter: Partial<library> = {
    userId: newUserId[2].id,
    name: "hiof studenleiligheter",
    text: "dette er test bibliotek",
    cordlat: 59.130680,
    cordlon: 11.35497,
    books: "ringes herre,hunger games,where is waldo",
    createdAt: new Date().toISOString(),
    photos: "{}",
    isVisible: true
  }

  const solbergtårnet: Partial<library> = {
    userId: newUserId[3].id,
    name: "solbergtårnet",
    text: "dette er test bibliotek",
    cordlat: 59.211874,
    cordlon: 11.163802,
    books: "",
    createdAt: new Date().toISOString(),
    photos: "{}",
    isVisible: true
  }
  // Insert a library
  await db.insert(libraries).values(halden_skole);

  await db.insert(libraries).values(halden_brannstasjon);

  await db.insert(libraries).values(hiof_studenleiligheter);

  await db.insert(libraries).values(solbergtårnet);


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



  const newLibraryId = await db.select({ id: libraries.id }).from(libraries)
  // 0 er hiof,1 er brannstasjon halden,2 hiof studenleigheter,3 er solbergtårnet  
  // Insert a review
  await db.insert(reviews).values({
    userId: newUserId[0].id,
    libraryId: newLibraryId[0].id,
    text: "dette er en test anmeldelse",
    reviewsPoints: 5,
    createdAt: new Date().toISOString(),
  });
  await db.insert(reviews).values({
    userId: newUserId[2].id,
    libraryId: newLibraryId[0].id,
    text: "dette er en test anmeldelse",
    reviewsPoints: 3,
    createdAt: new Date().toISOString(),
  });
  await db.insert(reviews).values({
    userId: newUserId[3].id,
    libraryId: newLibraryId[0].id,
    text: "dette er en test anmeldelse",
    reviewsPoints: 4,
    createdAt: new Date().toISOString(),
  });


  const newReviewId = await db.select({ id: reviews.id }).from(reviews)
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


  // Insert a favorite library
  await db.insert(favoriteLibraries).values({
    userId: newUserId[0].id,
    libraryId: newLibraryId[0].id,
  });
  // Insert a favorite library
  await db.insert(favoriteLibraries).values({
    userId: newUserId[2].id,
    libraryId: newLibraryId[2].id,
  });
  // Insert a favorite library
  await db.insert(favoriteLibraries).values({
    userId: newUserId[3].id,
    libraryId: newLibraryId[3].id,
  });


  // Insert a report
  await db.insert(reports).values({
    userId: newUserId[0].id,
    submitterUserId: newUserId[2].id,
    reportType: "User",
    reportLevel: 1,
    text: "dette er en test rapport",
    createdAt: new Date().toISOString(),
  });
  console.log("finished seeding")
} catch (error) {
  console.error("Error seeding database:", error);
}

