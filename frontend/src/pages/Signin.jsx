import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import '@fortawesome/fontawesome-free/css/all.min.css';


export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userid,setuserid]=useState("");
  const navigate = useNavigate();

  const handleSignin = () => {
    axios
      .post("https://paytm-project-dxmq.onrender.com/api/v1/user/signin", {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    )
      .catch((error) => {
        console.error("Error during sign-in", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 p-6">
      <div className="container w-96 p-6 md:p-12 bg-gray-200 rounded-lg shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl md:text-5xl mb-4 md:mb-6 text-center font-bold">Sign In</h1>
        <div className="icons flex justify-center items-center gap-4 mt-3">
          <div className="icon cursor-pointer w-12 h-12 flex items-center justify-center p-2 rounded-full shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)] text-xl">
            <i className="fa-brands fa-facebook-f"></i>
          </div>
          <div className="icon cursor-pointer w-12 h-12 flex items-center justify-center p-2 rounded-full shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)] text-xl">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <div className="icon cursor-pointer w-12 h-12 flex items-center justify-center p-2 rounded-full shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)] text-xl">
            <i className="fa-brands fa-instagram"></i>
          </div>
          <div className="icon cursor-pointer w-12 h-12 flex items-center justify-center p-2 rounded-full shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)] text-xl">
            <i className="fa-brands fa-google"></i>
          </div>
        </div>
        <p className="mb-3 text-center mt-3 font-bold">or use your account</p>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-4 outline-none rounded-full bg-gray-200 shadow-[inset_7px_7px_10px_rgba(0,0,0,0.1),_inset_-7px_-7px_10px_white]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-4 outline-none rounded-full bg-gray-200 shadow-[inset_7px_7px_10px_rgba(0,0,0,0.1),_inset_-7px_-7px_10px_white]"
          />
          <div className="flex justify-center items-center mt-2">
            <button
              onClick={handleSignin}
              className="w-44 h-12 rounded-full bg-blue-500 text-white hover:text-red-500 font-bold shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)]"
            >
              Sign In
            </button>
          </div>
        </div>
        <h1 className="text-sm text-center font-bold mt-5 text-gray-400">
          <span className="text-red-300">Note:-</span> Use Email & Password from which you make Account
        </h1>
      </div>
      
    </div>
  );
};
