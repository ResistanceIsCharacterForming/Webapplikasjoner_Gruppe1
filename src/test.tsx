
import { singletonMaster } from "./utils/singletonBuilder";
import { createUserService } from "./features/user/service";
import { createUserRepository } from "./features/user/repository";
import { createLibraryService } from "./features/library/service";
import { createLibraryRepository } from "./features/library/repository";
import FileUploadComponent from "./form";


export const databasescreen = async () => {
  const test = singletonMaster.ImageHandler;
  const user=await createUserService(createUserRepository())
  const libary=await createLibraryService(createLibraryRepository(singletonMaster.dbConnection))
  const userResult=await user.listUsers()
  const libarres=await libary.listLibraries()
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
    const listlibary = libarres.data?.map(user =>
    <tr style={{borderBlock:"groove"}}>
    <td>  {user.id}  </td>
    <td>  {user.name}  </td>
    <td>  {user.createdAt}  </td>
    <td>  {user.books}  </td>
    <td>  {user.isVisible}  </td>
    <td>  {user.cordlat}  </td>
    <td>  {user.cordlon}  </td>
     <td> {user.text}  </td>
     <td> {user.photos}  </td>
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
      <table>
        <tr>
          <td>id</td>
          <td>name</td>
          <td>createdAt</td>
          <td>books</td>
          <td>isvisable</td>
          <td>cordlon</td>
          <td>cordlat</td>
        </tr>
          {listlibary}
      </table>
      <FileUploadComponent/>
      
                
          </div>
      )
} 