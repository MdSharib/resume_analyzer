import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Landing/Home";
import VerifyMail from "./components/Landing/VerifyMail";


import Unauthorized from "./components/Landing/Unauthorized";
import History from "./components/Landing/History.";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/verify" element={<VerifyMail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
