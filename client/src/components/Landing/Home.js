import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || auth.isVerified !== 1) {
      navigate("/unauthorized");
    }
  }, []);

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("please upload a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    // console.log(file);
    try {
      const res = await axios.post("/upload", formData);
      if (res.ok === true) {
        //   console.log(res.data.user);
        //   console.log(res.data.token);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button type="button" onClick={uploadHandler}>
        {" "}
        Upload pdf
      </button>
    </div>
  );
};

export default Home;
