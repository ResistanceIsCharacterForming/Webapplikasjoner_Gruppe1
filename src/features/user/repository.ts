import {admin, admins, users,User,favoritLibraries,favoritLibrary} from "../../db/schema"
import {eq,and, lte, gte} from "drizzle-orm"
import {libraries,library } from "../../db/schema"

import { userRepository } from "@/types/user"

export function createUserRepository(db: any):userRepository{

  return{

    async getUsers(){
      try {
        const result: User[] = await db.select().from(users);
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting users' }
      }
    },


    async createUser(data: any){
      try {
        const result: User[] = await db.insert(users).values({
            name: data.name,
            email: data.email,
            password: data.password,
            settings: data.settings,
            createdAt: data.createdAt,
            lastLoginAt: data.lastLoginAt,
            profileImage: data.profileImage,
            isVisible: data.isVisible
        }).returning();
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed creating user' }
      }
    },

    async editUser(id: string,data : Partial<User>){
    try {
        const result : User[]= await db.update(users).set(data).where(eq(users.id, id)).returning();
      return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed edit user' }
      }
    },

    async getUserById(id: string){
      try {
        const result : User[] = await db.select().from(users).where(eq(users.id, id));
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting user by id' }
      }
    },

    async deleteUserById(id:string){
      try {
        await db.delete(users).where(eq(users.id,id)); 
        return { success: true }
        } catch (error) {
          console.log(error)
        return { success: false, error: 'Failed deleting user by id' }
        }
    },

    // favrit libaraies
    async getfavoritLibraries(){
      try {
        const result: favoritLibrary[] = await db.select().from(favoritLibraries);
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoritLibraries' }
      }
    },

    async createfavoritLibrary(data : any){
      try {
        const result: favoritLibrary[] = await db.insert(favoritLibraries).values({
            userId: data.userId,
            libaryId:data.libaryId,
        }).returning();
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed creating favoritLibrary' }
      }
    },

    async editfavoritLibrary(id: number,data : Partial<favoritLibrary>){
    try {
        const result : favoritLibrary[]= await db.update(favoritLibraries).set(data).where(eq(favoritLibraries.id, id)).returning();
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed edit favoritLibrary' }
      }
    },

    async getfavoritLibraryById(id: number){
      try {
        const result : favoritLibrary[] = await db.select().from(favoritLibraries).where(eq(favoritLibraries.id, id));
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoritLibrary by id' }
      }
    },

    async getfavoritLibrariesByUserId(id: string){
      try {
        const result : favoritLibrary[] = await db.select().from(favoritLibraries).where(eq(favoritLibraries.userId, id));
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoritLibrary by user id' }
      }
    },

    async getfavoritLibrariesByLibaryId(id: string){
      try {
        const result : favoritLibrary[] = await db.select().from(favoritLibraries).where(eq(favoritLibraries.libaryId, id));
        return { success: true, data: result }
      } catch (error) {
        return { success: false, error: 'Failed getting favoritLibrary by libary id' }
      }
    },

    async deletefavoritLibraryById(id:number){
      try {
        await db.delete(favoritLibraries).where(eq(favoritLibraries.id,id)); 
        return { success: true }
        } catch (error) {
          console.log(error)
        return { success: false, error: 'Failed deleting favoritLibrary by id' }
        }
    },

    async deletefavoritLibrariesByUserId(id:string){
      try {
        await db.delete(favoritLibraries).where(eq(favoritLibraries.userId,id)); 
        return { success: true }
        } catch (error) {
          console.log(error)
        return { success: false, error: 'Failed deleting favoritLibrary by id' }
        }
    },

    async deletefavoritLibrariesByLibaryId(id:string){
      try {
        await db.delete(favoritLibraries).where(eq(favoritLibraries.libaryId,id)); 
        return { success: true }
        } catch (error) {
          console.log(error)
        return { success: false, error: 'Failed deleting favoritLibrary by id' }
        }
    },


  async getAdmins(){
    try {
      const result: admin[] = await db.select().from(admins);
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
      }).returning();
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed creating admin' }
    }
  },
  
  async editAdmin(id: string,data : any){
   try {
      const result : admin[]= await db.update(admins).set(data).where(eq(admins.userId, id)).returning();
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed edit admin' }
    }
  },
  
  async getAdminById(id: string){
    try {
      const result : admin[] = await db.select().from(admins).where(eq(admins.userId, id));
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: 'Failed getting admin by id' }
    }
  },
  
  async deleteAdminById(id:string){
    try {
      await db.delete(admins).where(eq(admins.userId,id)); 
      return { success: true }
      } catch (error) {
        console.log(error)
      return { success: false, error: 'Failed deleting admin by id' }
      }
  },
    }


}
