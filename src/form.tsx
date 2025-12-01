"use client";
import { getRandomValues } from 'crypto';
import React, { JSX, useEffect, useState } from 'react';
import { apiuserdataRespone } from './types/user';
import { libraries, library, review, user } from './db/schema';
import { useGetReviewsFromLibraries } from "./backend/features/shared/utils/universal/useGetReviewsFromLibraries";
import { reviewComponentData } from './types/reviews';
// REMOVE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const FileUploadComponent =  () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imghref, setimghref] = useState("null"); // For single file
  const [selectedFiles, setSelectedFiles] = useState([]); // For multiple files  
   
  const handleFileChange = async (event: { target: { files: React.SetStateAction<null>[]; }; }) => {
    // For single file upload
    setSelectedFile(event.target.files[0]);
    const img=event.target.files[0]
    const url="http://localhost:5173/api/v1/image/test5.png"
    const test =await fetch(url,{
      method:"POST",
      headers: {'Content-Type': 'application/json',},body:img});
    // For multiple file upload
    // setSelectedFiles(Array.from(event.target.files));
  }
  


  const handleimage = async () => {
    const imges=["imgtest.png","imgtest1.png","imgtest2.png","test5.png"]
    const randomElement = imges[Math.floor(Math.random() * imges.length)];
    const url="http://localhost:5173/api/v1/image/"+randomElement
    const test =await fetch(url,{
      method:"Get"
    })
    setimghref(URL.createObjectURL(await test.blob()))
  }

  return (
    <div>
      <img src={imghref} width="150px" height="100px"></img>
      <button onClick={handleimage}>cliiiiiiiiiiiiiiiiick me</button>
      <input type="file" onChange={handleFileChange} />
      {/* For multiple file selection */}
      {/* <input type="file" multiple onChange={handleFileChange} /> */}
      
    </div>
  );
};

export default FileUploadComponent;


export const ImgboxComponent = ()=>{
  const [imghref, setimghref] = useState("null");
    const handleimage = async () => {
    const url="http://localhost:5173/api/v1/users/c99f5430-c3a5-42ca-8f77-f3bb0b369e7e"
    const test =await fetch(url,{
      method:"Get"
    })
    const json :any= await test.json()
    setimghref("data:image/png;base64,"+json.data.img)
  }
  useEffect(() =>{
   handleimage()
  })
   
   return(
    <div>
      <img src={imghref} alt="img" width="100px" height="100px"/>
      <p>aaaaaaaaaaaaaaaaaaa</p>
    </div>
   )
}

// bad temp code just to show how to grab a single of thes with images and so on ^^
export const Getsingleuser = ({id})=>{
  const [imghref, setimghref] = useState("null");
   const [text, settText] = useState<JSX.Element>()
    const getuser = async () => {
    const url="http://localhost:5173/api/v1/users/"+id
    const test =await fetch(url,{
      method:"Get"
    })
    const json :any= await test.json()
    const userdata :user = json.data[0]
    const text = <p>{userdata.id} {userdata.name}</p>
  
    settText(text)
    setimghref("data:image/png;base64,"+json.data.img)
  }
  useEffect(() =>{
   getuser()
  },[imghref])
   
   return(
    <div>
      {text}
      <img src={imghref} alt="img" width="100px" height="100px"/>
    </div>
   )
}


export const Getlibraryuser = ({id})=>{
  const [imghref, setimghref] = useState("null");
   const [text, settText] = useState<JSX.Element>()
    const getuser = async () => {
    const url="http://localhost:5173/api/v1/libraries/"+id
    const test =await fetch(url,{
      method:"Get"
    })
    const json :any= await test.json()
    const data :library = json.data[0]
    const text = <p>{data.id} {data.name}</p>
    if(data.photos == "1" )setimghref("data:image/png;base64,"+json.data.img)
  
    settText(text)
  }
  useEffect(() =>{
   getuser()
  },[imghref])
   
   return(
    <div>
      {text}
      <img src={imghref} alt="img" width="100px" height="100px"/>
    </div>
   )
}


export const Getreviewsingle = (props: { id: any; })=>{
  let id = props.id
  const [imghref, setimghref] = useState("null");
   const [text, settText] = useState<JSX.Element[]>()
    const getuser = async () => {
    const url="http://localhost:5173/api/v1/reviews/"+id
    const test =await fetch(url,{
      method:"Get"
    })
    const json :any= await test.json()
    const data :review = json.data[0]
    const testcase=await useGetReviewsFromLibraries("03a949bd-f33e-4088-a8f9-189f935bccb0","c99f5430-c3a5-42ca-8f77-f3bb0b369e7e")
    const newdata=testcase
    const asdadas=newdata.map(value=>
      <IDK {...value}/>
    )
    settText(asdadas)
    
  }
  useEffect(() =>{
   getuser()
  },[imghref])
   
   return(
    <div>
      {text}
      <img src={imghref} alt="img" width="100px" height="100px"/>
    </div>
   )
}

const IDK = (review: reviewComponentData)=>{
  let img =(<p>no img</p>)
  if(review.reviewPhotos) img=(<img src={"data:image/png;base64,"+review.reviewPhotos} className="w-50 h-50"></img>)
  else img=(<p>no img</p>)
  let img2 =(<p>no img</p>)
  if(review.userProfilePhoto) img2=(<img src={"data:image/png;base64,"+review.userProfilePhoto} className="w-50 h-50"></img>)
  else img2=(<p>no img</p>)
  return (
    <> 
    {review.id}
    {img}
    <>{review.userName}</>
    <>{img2}</>
    </>
  )
}
