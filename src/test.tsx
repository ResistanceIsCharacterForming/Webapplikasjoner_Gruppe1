import { createLibraryRepository } from "./backend/features/libraries/core/repository";
import { createLibraryService } from "./backend/features/libraries/core/service";
import { singletonMaster } from "./backend/features/shared/utils/singletonBuilder";
import { useGetReviewsFromLibraries } from "./backend/features/shared/utils/universal/review/useGetReviewsFromLibraries";
import { createUserRepository } from "./backend/features/users/core/repository";
import { createUserService } from "./backend/features/users/core/service";
import { libraryPhoto, logo, userPhoto } from "./db/base64backups";
import FileUploadComponent, { ImgboxComponent, Getsingleuser, Getlibraryuser, Getreviewsingle } from "./form";


// REMOVE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const databasescreen = async () => {
  const test5 = useGetReviewsFromLibraries("03a949bd-f33e-4088-a8f9-189f935bccb0")
  const test = singletonMaster.ImageController;
  const user=await createUserService(createUserRepository(singletonMaster.dbConnection))
  const libary=await createLibraryService(createLibraryRepository(singletonMaster.dbConnection))
  const userResult=await user.listUsers()
  const test2=await user.getUserById("858dcdca-f633-459a-8450-f5ff38f9f08b")
  const libarres=await libary.listLibraries()
  test.putImage("test.png",)
  console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
    console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  
    console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  
    console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  console.log(Math.random()*2+59)
  
  
 
  const listItems = userResult.data?.map(user =>
    <tr style={{borderBlock:"groove"}}>
    <td>  {user.id}  </td>
    <td>  {user.email}  </td>
    <td>  {user.name}  </td>
    <td>  {user.password}  </td>
    <td>  {user.createdAt}  </td>
    <td>  {user.lastLoginAt}  </td>
    <td>  {user.is_visible}  </td>
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
       <img src={"data:image/png;base64,"+userPhoto} width="150px" height="100px"></img>
       <img src={"data:image/png;base64,"+libraryPhoto} width="150px" height="100px"></img>
       <img src={"data:image/png;base64,"+logo} width="150px" height="100px"></img>
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
      <ImgboxComponent />
      <Getsingleuser id = "c99f5430-c3a5-42ca-8f77-f3bb0b369e7e"/>
      <Getlibraryuser id="de30cd53-b310-477f-b592-fb9c3e468a6e"/>
      <Getreviewsingle id="12"/>
          </div>
      )
} 