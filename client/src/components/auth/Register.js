import React, { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [text, setText] = useState(false);
  const [ptext, setPText] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      console.log("enter same password");
      setPText(true);
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        cPassword,
      });

      if (res && res.data.success) {
        setText(true);
        setPText(false);
        
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        console.log(res.data);
        // navigate("/");
      } else {
        console.log("error rgister");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["div-styling"]}>
      <form onSubmit={handleSubmit} className={styles["form-styling"]}>
        <h4 className={styles.heading}>REGISTER FORM</h4>
        <div className={styles.inner}>
          <div className={styles["input-div"]}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className={styles.input}
              required
              autoFocus
            />
          </div>
          <div className={styles["input-div"]}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email "
              className={styles.input}
              required
            />
          </div>
          <div className={styles["input-div"]}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className={styles.input}
              required
            />
          </div>
          <div className={styles["input-div"]}>
            <input
              type="password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              placeholder="Confirm Password"
              className={styles.input}
              required
            />
          </div>
          {text && (
            <div className={styles.success}>
              Successfully registered! Please check your email for verification.
            </div>
          )}
          {ptext && (
            <div className={styles.error}>
              Please enter same password
            </div>
          )}
          <button type="submit" className={styles.btn}>
            REGISTER
          </button>
          <button
          type="button"
          className={styles.loginBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Already have account?Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
