import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Balance = () => {
    const [balance, setBalance] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const balanceResponse = await axios.get(
                    "http://localhost:3000/api/v1/account/balance",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );

                const userResponse = await axios.get(
                    "http://localhost:3000/api/v1/user/profile",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );

                setBalance(balanceResponse.data.balance);
                setFirstName(userResponse.data.firstName);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch user data", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
                <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-lg font-medium">Hello, {firstName}!</h3>
                    <p className="text-lg">Your balance is <span className="font-bold">₹{balance.toFixed(2)}</span></p>
                </div>
                <div className="flex justify-end  pt-4" >
                    <button className="bg-blue-800 text-white text-sm px-2 py-2 rounded-md"  
                     onClick={() => navigate("/deposit")} 
                     >Deposit money</button>
               </div>
            </div>
            
        </div>
        
    );
};
