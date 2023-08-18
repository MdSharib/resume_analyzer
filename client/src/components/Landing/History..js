import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./history.module.css";
import axios from "axios";

const History = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || auth.isVerified !== 1) {
      navigate("/unauthorized");
    } else {
      const getHistory = async () => {
        try {
          const res = await axios.get("/api/v1/auth/history");
          setSummary(res.data.summary);
          console.log(res.data.summary);
        } catch (error) {
          console.log(error.message);
        }
      };
      getHistory();
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className={styles.div}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => {
            navigate("/home");
          }}
        >
          {" "}
          back
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => {
            navigate("/history");
          }}
        >
          {" "}
          History
        </button>
        <button className={styles.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className={styles.result}>
        <div className={styles.summaryHeading}>History of Summary -</div>
        {!summary && <div className={styles.summary}>Loading...</div>}
        {summary &&
          summary.map((val, i) => {
            return (
              <div className={styles.summary} key={i}>
                {i + 1} {val.summary}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
