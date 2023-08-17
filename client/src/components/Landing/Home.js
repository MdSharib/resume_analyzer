import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

const Home = (props) => {
  const navigate = useNavigate();
 const [text, setText] = useState("")

  const [file, setFile] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || auth.isVerified !== 1) {
      navigate("/unauthorized");
    }else {
      const phone = auth.phone;
      
      const sendPhone = async() => {
        try{

          const res = await axios.post("/phone", {
            phone
          });
        } catch (error) {
          console.log(error.message)
        }
      }
      sendPhone()
      
      // console.log(auth.phone)
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('auth');
    navigate("/");
  }


  // for history of results
  // useEffect(() => {

  // }, [text])

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
        setText(res.data.text);
        // console.log(res.data.text);
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
      <button type="button" className={styles.btn} onClick={() => {navigate("/history")}}>
        {" "}
        History
      </button>
      <button className={styles.btn} onClick={() => {logoutHandler}}>Logout</button>
      </div>
      <div className={styles.result}>
        <div className={styles.summaryHeading}>Your Result Summary here-</div>
      {text && <div className={styles.summary}>{text}</div>}
    </div>
    </div>
  );
};

export default Home;
