import {admin, admins, users,favoriteLibraries,favoriteLibrary} from "../../db/schema"
import {eq} from "drizzle-orm"
import { databaseUserData, user, userRepository } from "@/types/user"

export function createUserRepository(db: any):userRepository{
  return{
    async getUsers(){
      try {
        const result: user[] = await db.select().from(users)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting users' }
      }
    },


    async createUser(data: databaseUserData){
      try {
        const result: user[] = await db.insert(users).values(data).returning()
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed creating user' }
      }
    },

    async editUser(id: string,data : Partial<user>){
    try {
        const result : user[]= await db.update(users).set(data).where(eq(users.id, id)).returning()
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed edit user' }
      }
    },

    async getUserById(id: string){
      try {
        const result : user[] = await db.select().from(users).where(eq(users.id, id))
        if (result.length===0)return { success: false, error: "no user by that id" }
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting user by id' }
      }
    },

    async getUserByEmail(email: string){
      try {
        const result : user[] = await db.select().from(users).where(eq(users.email, email))
        const user = result[0] ?? null
        return { success: true, data: user }
      } catch (error) {
        return { success: false, error: 'Failed getting user by email' }
      }
    },

    async deleteUserById(id:string){
      try {
        await db.delete(users).where(eq(users.id,id)) 
        return { success: true }
        } catch (error) {
        return { success: false, error: 'Failed deleting user by id' }
        }
    },
    // favrit libaraies
    async getFavoriteLibraries(){
      try {
        const result: favoriteLibrary[] = await db.select().from(favoriteLibraries)
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoriteLibraries' }
      }
    },

    async createFavoriteLibrary(data : any){
      try {
        const result: favoriteLibrary[] = await db.insert(favoriteLibraries).values({
            userId: data.userId,
            libaryId:data.libaryId,
        }).returning()
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed creating favoritLibrary' }
      }
    },

    async editFavoriteLibrary(id: number,data : Partial<favoriteLibrary>){
    try {
        const result : favoriteLibrary[]= await db.update(favoriteLibraries).set(data).where(eq(favoriteLibraries.id, id)).returning()
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed edit favoriteLibrary' }
      }
    },

    async getFavoriteLibraryById(id: number){
      try {
        const result : favoriteLibrary[] = await db.select().from(favoriteLibraries).where(eq(favoriteLibraries.id, id))
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoriteLibrary by id' }
      }
    },

    async getFavoriteLibrariesByUserId(id: string){
      try {
        const result : favoriteLibrary[] = await db.select().from(favoriteLibraries).where(eq(favoriteLibraries.userId, id))
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoriteLibrary by user id' }
      }
    },

    async getFavoriteLibrariesByLibraryId(id: string){
      try {
        const result : favoriteLibrary[] = await db.select().from(favoriteLibraries).where(eq(favoriteLibraries.libraryId, id))
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoriteLibrary by libary id' }
      }
    },

    async deleteFavoriteLibraryById(id:number){
      try {
        await db.delete(favoriteLibraries).where(eq(favoriteLibraries.id,id)) 
        return { success: true }
        } catch (error) {
        return { success: false, error: 'Failed deleting favoriteLibrary by id' }
        }
    },

    async deleteFavoriteLibrariesByUserId(id:string){
      try {
        await db.delete(favoriteLibraries).where(eq(favoriteLibraries.userId,id)) 
        return { success: true }
        } catch (error) {
        return { success: false, error: 'Failed deleting favoriteLibrary by id' }
        }
    },

    async deleteFavoriteLibrariesByLibraryId(id:string){
      try {
        await db.delete(favoriteLibraries).where(eq(favoriteLibraries.libraryId,id)) 
        return { success: true }
        } catch (error) {
        return { success: false, error: 'Failed deleting favoriteLibrary by id' }
        }
    },


  async getAdmins(){
    try {
      const result: admin[] = await db.select().from(admins)
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed getting admins' }
    }
    },
    
    async createAdmin(userId:string,createdAt:string,adminLevel:number){
    try {
      const result: admin[] = await db.insert(admins).values({
          userId: userId,
          createdAt: createdAt,
          adminLevel: adminLevel,
      }).returning()
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed creating admin' }
    }
  },
  
  async editAdmin(id: string,Level :admin["adminLevel"] ){
   try {
      const result : admin[]= await db.update(admins).set({adminLevel: Level}).where(eq(admins.userId, id)).returning()
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed edit admin' }
    }
  },
  
  async getAdminById(id: string){
    try {
      const result : admin[] = await db.select().from(admins).where(eq(admins.userId, id))
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed getting admin by id' }
    }
  },
  
  async deleteAdminById(id:string){
    try {
      await db.delete(admins).where(eq(admins.userId,id)) 
      return { success: true }
      } catch (error) {
      return { success: false, error: 'Failed deleting admin by id' }
      }
  },
    }


}
