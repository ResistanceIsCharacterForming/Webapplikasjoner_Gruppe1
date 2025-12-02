// src/db/seed.ts
import { singletonMaster } from "@/backend/features/shared/utils/singletonBuilder"
import { hashPassword } from "@/backend/features/users/core/service"
import { admins, libraries, reviews, reviewsEndorsements, favoriteLibraries, reports, users } from "./schema"
import { user } from "@/backend/types/user"
import { library } from "@/backend/types/library"
import { useRandomNameGenerator } from "@/backend/features/shared/utils/useRandomNameGenerator"
import { eq } from "drizzle-orm"
import { review } from "@/backend/types/reviews"


const db = singletonMaster.dbConnection
// a random create date it will always be a newer then user create data
function randomCreateReportData() {
  return "Mon Dec 01 2025 11:59:" + Math.floor(Math.random() * 58 + 1) + " GMT+0100 (Central European Standard Time)"
}

function randomCreateData() {
  return "Mon Dec 01 2025 11:57:" + Math.floor(Math.random() * 58 + 1) + " GMT+0100 (Central European Standard Time)"
}
function randomCreateReviewData() {
  return "Mon Dec 01 2025 11:58:" + Math.floor(Math.random() * 58 + 1) + " GMT+0100 (Central European Standard Time)"
}
function randomCreateUserData() {
  return "Mon Dec 01 2025 11:55:" + Math.floor(Math.random() * 58 + 1) + " GMT+0100 (Central European Standard Time)"
}

function randomLoginData() {
  return "Mon Dec 01 2025 11:57:" + Math.floor(Math.random() * 58 + 1) + " GMT+0100 (Central European Standard Time)"
}
// 59.12187818300706,11.468696594238283
// 60.031929699115615,10.298309326171877
function randomReviews(amount: number, userids: user[], libaraiesids: library[]): Partial<review>[] {
  const list = []
  const randomtekst = ["det er en test annmedelse", "fresh!", "jeg elsker denne bokkroken!", "jeg likte den ikke så mye", "synd den hadde ikke min yndlings book", " jeg synes at bokkroker er et kult konsept men det burde vært litt mer bøker her og kansje en person som kunne vise meg til alle de nye bøkene og sortere det i system med masse hyller og så burde det nok være et tak over det også det kan være ganske nyttig tenker jeg"]
  for (let index = 0; index < amount; index++) {
    list[index] = {
      userId: userids[Math.floor(Math.random() * userids.length)].id,
      libraryId: libaraiesids[Math.floor(Math.random() * libaraiesids.length)].id,
      text: randomtekst[Math.floor(Math.random() * randomtekst.length)],
      reviewsPoints: 0,
      createdAt: randomCreateReviewData(),
    }
  }

  return list
}
function randomlibreryReports(amount:number,userids:user[],libraries:library[]){
  const list = []
  for (let index = 0; index < amount; index++) {
    list[index]={
    libraryId: libraries[Math.floor(Math.random() * libraries.length)].id,
    submitterUserId:userids[Math.floor(Math.random() * userids.length)].id,
    reportType: "library",
    reportLevel: Math.floor(Math.random() *2+1),
    text: "dette er en test rapport",
    createdAt:  randomCreateReportData(),
    }
  }
  return list
}
function randomReviewReports(amount:number,userids:user[],reviewies:review[]){
  const list = []
  for (let index = 0; index < amount; index++) {
    list[index]={
    reviewId: reviewies[Math.floor(Math.random() * reviewies.length)].id,
    submitterUserId:userids[Math.floor(Math.random() * userids.length)].id,
    reportType: "review",
    reportLevel: Math.floor(Math.random() *2+1),
    text: "dette er en test rapport",
    createdAt:  randomCreateReportData(),
    }
  }
  return list
}
function randomUserReports(amount:number,userids:user[]){
  const list = []
  for (let index = 0; index < amount; index++) {
    list[index]={
    userId: userids[Math.floor(Math.random() * userids.length)].id,
    submitterUserId:userids[Math.floor(Math.random() * userids.length)].id,
    reportType: "user",
    reportLevel: Math.floor(Math.random() *2+1),
    text: "dette er en test rapport",
    createdAt:  randomCreateReportData(),
    }
    
  }
  return list
}
function randomReviewEndorsment(amount: number, userids: user[], reviewids: review[]) {
  const list = []
  for (let index = 0; index < amount; index++) {
    list[index] = {
      userId: userids[Math.floor(Math.random() * userids.length)].id,
      reviewId: reviewids[Math.floor(Math.random() * reviewids.length)].id
    }
  }
  return list

}

function randomLibraries(amount: number, userids: user[]): Partial<library>[] {

  const list = []
  const namePartOne = ["popup", "fresh!", "new", "gratis", "låne"]
  const namePartTwo = ["bokkrok", "biblotek", "library"]

  for (let index = 0; index < amount; index++) {
    list[index] = {
      userId: userids[Math.floor(Math.random() * userids.length)].id,
      name: namePartOne[Math.floor(Math.random() * namePartOne.length)] + namePartTwo[Math.floor(Math.random() * namePartTwo.length)],
      text: "dette er test bibliotek for å fylle databasen!",
      cordlat: Math.random() * 2 + 59,
      cordlon: Math.random() * 2 + 10,
      books: "it for dummies, javascript for dummies, learning python",
      createdAt: randomCreateData(),
      photos: "0",
      isVisible: true
    }
  }

  return list
}
function randomUsers(amount: number): Partial<user>[] {
  const userlist = []
  for (let index = 0; index < amount; index++) {
    userlist[index] = {
      name: useRandomNameGenerator(),
      email: "random" + Math.floor(Math.random() * 99999999) + "@gmail.com",
      password: "b60b1b8731dbed62a45d9fbce9afaf90:559246f6eabd22d47bd15c544a66c1a8cc5ecbdcc285118b9e4ab8f275b3bd72ee19e26eb97cfbf3d5557a2b1f2c41fea8dc16f65557840d0528cc567da659c0", // its just 123 in our hashed system
      settings: "{}",
      createdAt: randomCreateUserData(),
      lastLoginAt: randomLoginData(),
      profileImage: "0",
      isVisible: true
    }
  }
  return userlist
}

try {
  //make sure the tables are empty
  await db.delete(admins)
  await db.delete(libraries)
  await db.delete(reviews)
  await db.delete(reviewsEndorsements)
  await db.delete(favoriteLibraries)
  await db.delete(reports)
  await db.delete(users)



  //partial do id is made in the db
  const password = await hashPassword("passowrd@1")
  const madsuser: Partial<user> = {
    name: useRandomNameGenerator(),
    email: "mads.soyland@gmail.com",
    password: password,
    settings: "{}",
    createdAt: randomCreateUserData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  }
  const adminbruker: Partial<user> = {
    name: "free_grass(O.O)",
    email: "administrator@gmail.com",
    password: "6312d419432f8b9ac59c4a01df186004:399bd2ab57d6737f35af01f077385217d67a29dde3842d6861b5673ff9efb70cdced8693238eebf2e21574790f617f4de66e46b1240859f2babd33dee20738b0",
    settings: "{}",
    createdAt: randomCreateUserData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  }
  const normalbruker: Partial<user> = {
    name: "sweet_bee(*-*)",
    email: "ellen.norman@gmail.com",
    password: "200dabc91a6099164f6512bc113e89f2:6915dc1addb7cd6b9504453ded1fda6b7ac615351a7043c3f9f9aa29e40754a2f94658eb66e5f0c7f71390dabe17ed1a47818b138af4815702abef5e1e8dc430",
    settings: "{}",
    createdAt: randomCreateUserData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  }
  const nikolaiuser: Partial<user> = {
    name: useRandomNameGenerator(),
    email: "nikol.lysebraate@hiof.no",
    password: password,
    settings: "{}",
    createdAt: randomCreateUserData(),
    lastLoginAt: randomLoginData(),
    profileImage: "0",
    isVisible: true
  }


  // Insert a user
  await db.insert(users).values(adminbruker)
  await db.insert(users).values(normalbruker)
  await db.insert(users).values(madsuser)
  await db.insert(users).values(nikolaiuser)
  const normalbrukerdb = await db.select().from(users).where(eq(users.email, "ellen.norman@gmail.com"))

  const adminbrukerdb = await db.select().from(users).where(eq(users.email, "administrator@gmail.com"))
  const madsuserdb = await db.select().from(users).where(eq(users.email, "mads.soyland@gmail.com"))
  const nikolaiuserdb = await db.select().from(users).where(eq(users.email, "nikol.lysebraate@hiof.no"))



  console.log("making random users")
  const userRandoms = randomUsers(20)

  for (let index = 0; index < userRandoms.length; index++) {
    await db.insert(users).values(userRandoms[index])
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
    createdAt: randomCreateData(),
    photos: "0",
    isVisible: true
  }

  const halden_brannstasjon: Partial<library> = {
    userId: newUserId[0].id,
    name: "halden brannstasjon",
    text: "dette er test bibliotek",
    cordlat: 59.126407,
    cordlon: 11.35266,
    books: "brannsikerhet v1,brannsikerhet v2, brannsikhert for barn v1",
    createdAt: randomCreateData(),
    photos: "0",
    isVisible: true
  }

  const hiof_studenleiligheter: Partial<library> = {
    userId: newUserId[2].id,
    name: "hiof studenleiligheter",
    text: "dette er test bibliotek",
    cordlat: 59.130680,
    cordlon: 11.35497,
    books: "ringes herre,hunger games,where is waldo",
    createdAt: randomCreateData(),
    photos: "0",
    isVisible: true
  }

  const solbergtårnet: Partial<library> = {
    userId: newUserId[3].id,
    name: "solbergtårnet",
    text: "dette er test bibliotek",
    cordlat: 59.211874,
    cordlon: 11.163802,
    books: "",
    createdAt: randomCreateData(),
    photos: "0",
    isVisible: true
  }
  // Insert a library
  await db.insert(libraries).values(halden_skole)

  await db.insert(libraries).values(halden_brannstasjon)

  await db.insert(libraries).values(hiof_studenleiligheter)

  await db.insert(libraries).values(solbergtårnet)


  console.log("making random libraries")
  const libraryRandoms = randomLibraries(40, newUserId)
  for (let index = 0; index < libraryRandoms.length; index++) {
    await db.insert(libraries).values(libraryRandoms[index])
  }
  console.log("making admins")
  await db.insert(admins).values({
    userId: adminbrukerdb[0].id,
    adminLevel: 0,
    createdAt: randomCreateData(),
  })

  await db.insert(admins).values({
    userId: madsuserdb[0].id,
    adminLevel: 0,
    createdAt: randomCreateData(),
  })

  await db.insert(admins).values({
    userId: nikolaiuserdb[0].id,
    adminLevel: 0,
    createdAt: randomCreateData(),
  })
   
  const newLibraryId = await db.select({ id: libraries.id }).from(libraries)
  console.log("making random review")
  const reviewsRandoms = randomReviews(200, newUserId, newLibraryId)
  for (let index = 0; index < reviewsRandoms.length; index++) {
    await db.insert(reviews).values(reviewsRandoms[index])
  }
  const newReviewId = await db.select({ id: reviews.id }).from(reviews)

  console.log("making random endorsment")
  const endorsementRandoms = randomReviewEndorsment(1000,newUserId,newReviewId)
   for (let index = 0; index < endorsementRandoms.length; index++) {
    await db.insert(reviewsEndorsements).values(endorsementRandoms[index])
  }

  console.log("updating review endorsments on db")
  for (let index = 0; index < newReviewId.length; index++) {
    const id = newReviewId[index].id;
    const endorsements = await db.select().from(reviewsEndorsements).where(eq(reviewsEndorsements.reviewId, id))
    await await db.update(reviews).set({reviewsPoints : endorsements.length}).where(eq(reviews.id, id))
  }


  console.log("making random reports")
  const reportusers = randomUserReports(30,newUserId)

  const reportlibery = randomlibreryReports(30,newUserId,newLibraryId)

  const reportreview = randomReviewReports(30,newUserId,newReviewId)
  console.log("inserting db random reports")
  for (let index = 0; index < reportusers.length; index++) {
     await db.insert(reports).values(reportusers[index])
  }
   for (let index = 0; index < reportlibery.length; index++) {
     await db.insert(reports).values(reportlibery[index])
  }
   for (let index = 0; index < reportreview.length; index++) {
     await db.insert(reports).values(reportreview[index])
  }
 
  console.log("finished seeding")
} catch (error) {
  console.error("Error seeding database:", error)
}

