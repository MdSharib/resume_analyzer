import React, { useState } from 'react'
import axios  from 'axios';


const Home = () => {
    const [file , setFile] = useState(null);

    const uploadHandler = async(e) => {
        e.preventDefault();
        if(!file){
            console.log("please upload a file to upload");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        // console.log(file);
        try {
            const res = await axios.post("/upload", 
              formData,
            );
            if (res.ok === true) {
              
            //   console.log(res.data.user);
            //   console.log(res.data.token);
            } else {
              console.log(res.data.message);
            }
          } catch (error) {
            console.log(error);
          }
    }

  return (
      <div>
        <input type='file' onChange={(e) => { setFile(e.target.files[0])}}/>
        <button type='button' onClick={uploadHandler}> Upload pdf</button>
      </div>
  )
}

export default Home;