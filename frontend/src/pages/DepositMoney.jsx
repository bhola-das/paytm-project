import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const  DepositMoney=()=> {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDeposit = async () => {
    try {
      const response = await axios.post(
        "https://paytm-project-dxmq.onrender.com/api/v1/account/deposit",
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // token must be stored in localStorage
          },
        }
      );
      setMessage(`${amount} deposited successfully! ✅`);
      //navigate("/"); // back to home
    } catch (err) {
        setMessage(err.response?.data?.message || "Deposit failed ❌");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
      <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-75 md:w-96 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-3xl font-bold text-center">Deposit Money</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enter Amount (in ₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              id="amount"
              placeholder="Enter deposit amount"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={handleDeposit}
            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
          >
            Deposit Money
          </button>

          {message && (
            <p className="text-green-500 text-center mt-4">{message}</p>
          )}

          {/* Optional back button */}
          <div className="pt-4 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-blue-500 underline hover:text-blue-700"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}


