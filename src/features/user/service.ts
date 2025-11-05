import { User } from "@/db/schema"
import { userRepository } from "@/types/user"
import { scrypt } from "crypto"



export function createUserService(repository: userRepository) {
    const salt="qx5LIDftxlLttSJ6AHS654Y67usOmuQZ"

    async function hashPassword(password:string) {
        const oldpass=password;
         await scrypt(password,salt,32,(err,derivedKey) => {
                    if (err) throw err;
                        password=(derivedKey.toString('hex'));
                    });
        if (oldpass==password)
                return "false"
        return password
    }

    return {
         async listUsers() { 
            const result = await repository.getUsers()
            return result
        },
        async getUserById(id: string) { 
            const result = await repository.getUserById(id)
            return result
        },
        async createUser(name: string, email: string, password: string,settings:string,profileImage:string) {
            const isVisible=true;
            const createdAt = new Date().toUTCString()
            await scrypt(password,salt, 32, (err, derivedKey) => {
                if (err) throw err
                password = (derivedKey.toString('hex'))
            });

            const result = await repository.createUser({name,email,createdAt,password,settings,profileImage,isVisible})
            return result
        },
        async editUser(id: string,data:Partial<User>) {
            if(data.password){
                data.password=await hashPassword(data.password)
            }
            const result = await repository.editUser(id,data)
            return result
        },

        async passwordcheck(id:string,password:string){
            const user = await repository.getUserById(id)
            if(user.data){
                await scrypt(password,salt,32,(err,derivedKey) => {
                    if (err) throw err;
                        password=(derivedKey.toString('hex'));
                    });

                if (user.data[0].password == password){
                    return { success: true, password:true }
                }else{
                    return { success: true, password:false }
                }
                }
                    
                    

            
        }
    }
}