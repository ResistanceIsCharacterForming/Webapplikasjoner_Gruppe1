"use client";
import { getRandomValues } from 'crypto';
import React, { useEffect, useState } from 'react';

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


export const ImgboxComponent = (imgelement)=>{
  const [imghref, setimghref] = useState("null");
    const handleimage = async () => {
    const url="http://localhost:5173/api/v1/image/defualtProfile.png"
    const test =await fetch(url,{
      method:"Get"
    })
    setimghref(URL.createObjectURL(await test.blob()))
  }
  useEffect(() =>{
   handleimage()
  })
   
   return(
    <div>
      <p>aaaaaaaaaaaaaaaaaaa</p>
      <img src={imghref} alt="img" />
      <p>aaaaaaaaaaaaaaaaaaa</p>
    </div>
   )
}

