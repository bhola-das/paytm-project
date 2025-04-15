import { useEffect, useState } from "react";
import axios from "axios";

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("https://paytm-project-dxmq.onrender.com/api/v1/account/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions", err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map((txn, idx) => (
              <li key={idx} className="border rounded-md p-4 bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-semibold capitalize">{txn.type}</span>
                  <span className="text-sm text-gray-500">{new Date(txn.timestamp).toLocaleString()}</span>
                </div>
                <div className="mt-1">Amount: ₹{txn.amount}</div>
                {txn.to && (
                  <div className="text-sm text-gray-600">
                    To: {txn.to.firstName} {txn.to.lastName}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
