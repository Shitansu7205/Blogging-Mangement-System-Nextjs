"use client";
import { useEffect, useState } from "react";

const Profile = () => {
    const [email, setEmail] = useState(""); // State to store user email

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("/api/currentuser", {
                method: "GET",
                credentials: "include", // Ensures cookies (JWT token) are sent
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();
            setEmail(data.extractedEmailFromToken); // Set user email in state

        } catch (err) {
            alert('unauthorized..')
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <div>
            <h1>Profile Page</h1>
            <h1>Email is  : {email}</h1>
        </div>
    );
};

export default Profile;
