import React from 'react'
import { useNavigate } from 'react-router-dom'



const Unauthorized = () => {
const navigate = useNavigate();
    const btnHandler = () => {
        navigate("/");
    }

  return (
    <div>
    <div>Unauthorized Acces! Please Verify your email first.</div>
    <button onClick={btnHandler}>Go back to Login page</button>
    </div>
  )
}

export default Unauthorized