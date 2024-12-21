// changes have been made here
import { useSearchParams } from 'react-router-dom';
import { BottomWarning } from '../components/BottomWarning';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState(""); // State to store transfer message
    const [username, setUsername] = useState(""); // State for username input
    const [password, setPassword] = useState(""); // State for password input
    const [balance, setBalance] = useState(""); // State for balance display

    // Function to handle money transfer
    const handleTransfer = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            // Display success message with transferred amount
            setMessage(`${amount} Transfer Successfully!`);
        } catch (error) {
            setMessage("Transfer failed");
        }
    };

    // Function to handle balance view
    const handleViewBalance = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/balance", {
                username,
                password
            });

            // Display the balance
            setBalance(`Your balance is ${response.data.balance}`);
        } catch (error) {
            setBalance("Failed to retrieve balance");
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                            {/* Display transfer message */}
                            {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                            <div><BottomWarning label={"back to dashboard"} buttonText={"Back"} to={"/dashboard"} /></div>
                        </div>
                    </div>
                    
                </div>
                 
            </div>
        </div>
    );
};
