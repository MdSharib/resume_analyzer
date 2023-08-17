import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

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
    <div className={styles.div}>
      <div className={styles.header}>
      <input
        type="file"
        className={styles.input}
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button type="button" className={styles.btn} onClick={uploadHandler}>
        {" "}
        Upload pdf
      </button>
      <button className={styles.btn}>Logout</button>
      </div>
      <div className={styles.result}>
      <div className={styles.summary}>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>
    </div>
    </div>
  );
};

export default Home;
