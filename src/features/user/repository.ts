import {eq} from "drizzle-orm";
import {users,User,favoritLibraries,favoritLibrary} from "../../db/schema";
import { db } from "../../db/index";

// user

export const getUsers = async () => {
  try {
    const restult: User[] = await db.select().from(users);
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting users' }
  }
}

export const createUser = async (data : any) => {
  try {
    const restult: User[] = await db.insert(users).values({
        name: data.name,
        email: data.email,
        password: data.password,
        settings: data.settings,
        createdAt: data.createdAt,
        profileImage: data.profileImage,
    }).returning();
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed creating user' }
  }
}

export const editUser = async (id: string,data : any) => {
 try {
    const restult : User[]= await db.update(users).set(data).where(eq(users.id, id)).returning();
    return { succes :true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed edit user' }
  }
}

export const getUserById = async (id: string) => {
  try {
    const restult : User[] = await db.select().from(users).where(eq(users.id, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting user by id' }
  }
}

export const deleteUserById = async (id:string) => {
  try {
    await db.delete(users).where(eq(users.id,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting user by id' }
    }
}

// favrit libaraies
export const getfavoritLibraries = async () => {
  try {
    const restult: favoritLibrary[] = await db.select().from(favoritLibraries);
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting favoritLibraries' }
  }
}

export const createfavoritLibrary = async (data : any) => {
  try {
    const restult: favoritLibrary[] = await db.insert(favoritLibraries).values({
        userId: data.userId,
        libaryId:data.libaryId,
    }).returning();
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed creating favoritLibrary' }
  }
}

export const editfavoritLibrary = async (id: number,data : any) => {
 try {
    const restult : favoritLibrary[]= await db.update(favoritLibraries).set(data).where(eq(favoritLibraries.id, id)).returning();
    return { succes :true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed edit favoritLibrary' }
  }
}

export const getfavoritLibraryById = async (id: number) => {
  try {
    const restult : favoritLibrary[] = await db.select().from(favoritLibraries).where(eq(favoritLibraries.id, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting favoritLibrary by id' }
  }
}


export const getfavoritLibrariesByUserId = async (id: string) => {
  try {
    const restult : favoritLibrary[] = await db.select().from(favoritLibraries).where(eq(favoritLibraries.userId, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting favoritLibrary by user id' }
  }
}


export const getfavoritLibrariesByLibaryId = async (id: string) => {
  try {
    const restult : favoritLibrary[] = await db.select().from(favoritLibraries).where(eq(favoritLibraries.libaryId, id));
    return { success: true, data: restult }
  } catch (error) {
    return { success: false, error: 'Failed getting favoritLibrary by libary id' }
  }
}

export const deletefavoritLibraryById = async (id:number) => {
  try {
    await db.delete(favoritLibraries).where(eq(favoritLibraries.id,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting favoritLibrary by id' }
    }
}


export const deletefavoritLibrariesByUserId = async (id:string) => {
  try {
    await db.delete(favoritLibraries).where(eq(favoritLibraries.userId,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting favoritLibrary by id' }
    }
}


export const deletefavoritLibrariesByLibaryId = async (id:string) => {
  try {
    await db.delete(favoritLibraries).where(eq(favoritLibraries.libaryId,id)); 
    return { success: true }
    } catch (error) {
      console.log(error)
    return { success: false, error: 'Failed deleting favoritLibrary by id' }
    }
}

