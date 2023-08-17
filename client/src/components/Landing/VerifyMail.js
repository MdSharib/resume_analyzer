import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import URL from "url-parse";

const VerifyMail = () => {
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    const updateInfo = async () => {
      try {
        const res = await axios.get(`/api/v1/auth/verify/${id}`);
      } catch (err) {
        console.log(err);
      }
    };

    updateInfo();
  }, []);

  return <div>Your mail have been verified successfully!</div>;
};

export default VerifyMail;
