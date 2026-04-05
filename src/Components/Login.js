import React, { useState } from "react";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = () => {
        if (!username.trim()) {
            setErrorMessage("Please enter a user name.");
            return;
        }
        if (!accountNumber || accountNumber.toString().length !== 10 || isNaN(accountNumber)) {
            setErrorMessage("Account number must be exactly 10 digits.");
            return;
        }
        setErrorMessage("");
        setUser({ name: username, accountNumber: accountNumber, role: "viewer" });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Enter user name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setAccountNumber(newValue);
                        if (newValue.length === 10 && username.trim()) {
                            handleLogin();
                        }
                    }}
                    onKeyDown={handleKeyDown}
                />
                {errorMessage && <p style={{ color: "red", margin: "10px 0" }}>{errorMessage}</p>}
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div> 
    );
}

export default Login;