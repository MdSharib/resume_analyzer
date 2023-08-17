import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        console.log("success login");
        setError(false);
        localStorage.setItem("auth", JSON.stringify(res.data.user));
        navigate("/home");
      } else {
        console.log(res.data.message);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <i />
          <span>Login</span>
        </div>
        <h5>Sign into your account</h5>
        <div>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email "
            required
          />
          <label htmlFor="form2Example17">Email address</label>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            required
          />
          <label htmlFor="form2Example27">Password</label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <p>Invalid Credentials!</p>}
        <button
          type="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          Didnt have an accont?Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
