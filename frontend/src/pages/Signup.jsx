
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-full bg-gray-200 p-4">
            <div className=" container w-96 p-4 md:p-8 bg-gray-200 rounded-lg shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-center flex-col gap-1">
                <div className="flex flex-col justify-center h-full ml-4">
         <div className="w-full">
         <img src="https://www.shutterstock.com/image-vector/kerala-india-may-08-2023-260nw-2304421791.jpg" alt="" />
         </div>
        </div>
                <Heading label={"Sign up"} />
                <p className="pb-5 text-gray-600 ">Enter your information to create an account!</p>
                </div>
                
                {/* Input Fields with CSS */}
                <div>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full mb-4 p-3 outline-none rounded-full bg-gray-200 shadow-[inset_7px_7px_10px_rgba(0,0,0,0.1),_inset_-7px_-7px_10px_white]"
                    />
                    <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full mb-4 p-3 outline-none rounded-full bg-gray-200 shadow-[inset_7px_7px_10px_rgba(0,0,0,0.1),_inset_-7px_-7px_10px_white]"
                    />
                    <input
                        type="email"
                        placeholder="Email something@gmail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-4 p-3 outline-none rounded-full bg-gray-200 shadow-[inset_7px_7px_10px_rgba(0,0,0,0.1),_inset_-7px_-7px_10px_white]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 p-3 outline-none rounded-full bg-gray-200 shadow-[inset_7px_7px_10px_rgba(0,0,0,0.1),_inset_-7px_-7px_10px_white]"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center items-center mt-2">
                    <Button
                        onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        }}
                        label={"Sign up"}
                        className="w-44 h-12 rounded-full bg-blue-500 text-white hover:text-red-500 font-bold shadow-[7px_7px_10px_white,-7px_-7px_10px_rgba(0,0,0,0.1)]"
                    />
                </div>

                {/* Bottom Warnings */}
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                <BottomWarning label={"Visit Dashboard"} buttonText={"Dashboard"} to={"/dashboard"} />
            </div>
        </div>
    );
};
