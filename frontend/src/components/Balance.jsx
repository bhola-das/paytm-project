
// export const Balance = ({ value }) => {
//     return <div className="flex">
//         <div className="font-bold text-lg">
//             Your balance
//         </div>
//         <div className="font-semibold ml-4 text-lg">
//             Rs {value}
//         </div>
//     </div>
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

export const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const balanceResponse = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") // Use the stored token
          }
        });

        const userResponse = await axios.get('http://localhost:3000/api/v1/user/profile', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") // Use the stored token
          }
        });

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-50">
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">User Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-700">Hello, {firstName}!</h3>
          <p className="text-lg text-gray-600 mt-2">Your balance is ₹{balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  </div>
  );
};
