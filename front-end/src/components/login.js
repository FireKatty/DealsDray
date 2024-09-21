
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    // Redirect to home if already authenticated
    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    // Login function with error handling
    const login = async (e) => {
        e.preventDefault(); // Prevent page reload
        setErrorMessage(''); // Clear any previous errors
        try {
            let result = await fetch('http://localhost:9876/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ userName: email, password }),
                headers: { 'Content-Type': "application/json" }
            });

            // Check for specific status codes
            if (result.status === 400) {
                const errorData = await result.json();
                setErrorMessage("Invalid credentials: " + (errorData.message || "Bad reques"));
                return;
            } else if (result.status === 401) {
                setErrorMessage("Unauthorized: Incorrect email or password.");
                return;
            } else if (result.status === 500) {
                setErrorMessage("Server error. Please try again later.");
                return;
            }

            // If login is successful
            if (result.ok) {
                result = await result.json();
                if (result.auth) {
                    localStorage.setItem('user', JSON.stringify(result));
                    localStorage.setItem('token', JSON.stringify(result.auth));
                    navigate("/"); // Navigate to the home page
                }
            } else {
                setErrorMessage("An unknown error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Request failed:", error);
            setErrorMessage("Network error. Please check your connection.");
        }
    };

    return (
        <form onSubmit={login}>
            <div>
                <h1 className="title">Login Page</h1>

                <div className="lebel">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="lebel">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>

                {errorMessage && (
                    <div className="lebel" style={{ color: 'red' }}>
                        {errorMessage}
                    </div>
                )}

                <div className="button-container">
                    <button className="submit-button" type="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;
