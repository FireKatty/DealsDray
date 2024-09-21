
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [emailExistsError, setEmailExistsError] = useState("");

    // Validate password function
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        } else if (!passwordRegex.test(password)) {
            setErrorMessage("Password at least 8 characters, with uppercase, lowercase, numbers, and symbols.");
            return false;
        }

        setErrorMessage(""); // Clear previous error
        return true;
    };

    // Handle form submission
    const datacollect = async (e) => {
        e.preventDefault(); // Prevent page reload
        if (validatePassword()) {
            try {
                console.log(fullName, userName, password, confirmPassword);

                // Check if the email already exists
                let checkEmailResult = await fetch("http://localhost:9876/api/auth/check_email", {
                    method: 'POST',
                    body: JSON.stringify({ userName }),
                    headers: { "Content-Type": "application/json" }
                });
                
                checkEmailResult = await checkEmailResult.json();

                // Handle email already registered case
                if (checkEmailResult.exists) {
                    setEmailExistsError("Email is already registered.");
                    return;
                } else {
                    setEmailExistsError(""); // Clear previous email error
                }

                // Proceed with signup if email is not registered
                let result = await fetch("http://localhost:9876/api/auth/signup", {
                    method: 'POST',
                    body: JSON.stringify({ fullName, userName, password, confirmPassword }),
                    headers: { "Content-Type": "application/json" }
                });

                result = await result.json();
                console.log(result.auth);

                // Handle signup success
                if (result.auth) {
                    localStorage.setItem("user", JSON.stringify(result));
                    localStorage.setItem('token', JSON.stringify(result.auth));
                
                    navigate("/");
                } else {
                    setErrorMessage("Failed to sign up. Please try again.");
                }

            } catch (error) {
                console.error('Fetch error:', error);
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={datacollect}>
            <div>
                <h1 className="title">Register Page</h1>

                <div className="lebel">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter Name"
                        required
                    />
                </div>

                <div className="lebel">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                </div>
                {emailExistsError && <div style={{ color: "red", marginBottom: "10px" }}>{emailExistsError}</div>}

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
                <div style={{ fontSize: "12px", color: "gray", marginBottom: "10px" }}>
                    Password must be at least 8 characters, with uppercase, lowercase, numbers, and symbols.
                </div>

                <div className="lebel">
                    <label htmlFor="retypePassword">Retype Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Retype Password"
                        required
                    />
                </div>
                {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}

                <div className="button-container">
                    <button className="submit-button" type="submit">Sign Up</button>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
