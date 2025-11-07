import { drizzle } from "drizzle-orm/d1";
import { User, users } from "./db/schema/users-schema";
import { env } from "cloudflare:workers";
import { singletonMaster } from "./utils/singletonBuilder";
import { createUserService } from "./features/user/service";
import { createUserRepository } from "./features/user/repository";

export const databasescreen = async () => {

   const user=await createUserService(createUserRepository())
   const userResult=await user.listUsers()
   const listItems = userResult.data?.map(user =>
    <tr style={{borderBlock:"groove"}}>
    <td>  {user.id}  </td>
    <td>  {user.email}  </td>
    <td>  {user.name}  </td>
    <td>  {user.password}  </td>
    <td>  {user.createdAt}  </td>
    <td>  {user.lastLoginAt}  </td>
    <td>  {user.isVisible}  </td>
    <td>  {user.profileImage}  </td>
    <td>  {user.settings}  </td>
    </tr>
    );

    return (
          <div style={{ padding: "2rem", margin: "0 auto"}}>
            <h1>list element</h1>
            <table>
              <tr>
    <td>id</td>
    <td>email</td>
    <td>name</td>
    <td>password</td>
    <td>createdAt</td>
    <td>last login</td>
    <td>isvisable</td>
    <td>icon</td>
    <td>settings</td>
    </tr>
                {listItems}
                </table>
                
          </div>
      )
} 