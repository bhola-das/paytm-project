import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Fetch the logged-in user details
        axios
            .get("http://localhost:3000/api/v1/user/getUser", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token from localStorage
                },
            })
            .then((response) => {
                setLoggedInUser(response.data); // Store the logged-in user's details
            })
            .catch((error) => {
                console.error("Error fetching logged-in user:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch the list of users
        axios
            .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token from localStorage
                },
            })
            .then((response) => {
                const fetchedUsers = response.data.user;

                if (loggedInUser) {
                    // Remove the logged-in user from the list
                    const filteredUsers = fetchedUsers.filter(
                        (user) => user._id !== loggedInUser._id
                    );
                    setUsers(filteredUsers);
                } else {
                    setUsers(fetchedUsers);
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, [filter, loggedInUser]); // Re-run the effect when filter or loggedInUser changes

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-xl mb-4 text-gray-800">Users</h2>

            <div className="mb-4">
                <input
                    onChange={(e) => setFilter(e.target.value)} // Update filter text
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <div className="space-y-4">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <User key={user._id} user={user} colorIndex={index} />
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

function User({ user, colorIndex }) {
    const navigate = useNavigate();
    const avatarColors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-purple-500", "bg-yellow-500"];
    const userColor = avatarColors[colorIndex % avatarColors.length]; // Different colors for avatar

    return (
        <div className="flex  justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
                <div className={`rounded-full h-10 w-10 ${userColor} text-white flex items-center justify-center text-lg font-bold`}>
                    {user.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="text-lg font-medium text-gray-800">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div >
                <Button className="flex "
                    onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                    label="Send Money"
                />
            </div>
        </div>
    );
}
