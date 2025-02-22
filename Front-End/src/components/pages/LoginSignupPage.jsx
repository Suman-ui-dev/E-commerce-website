import React, { useState } from "react";
import '../../css/style.css';

const LoginSignup = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true); // Start with Login form
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [savedUser, setSavedUser] = useState(null); // Store user after signup

    // Email Validation Function
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Password Validation Function (at least 6 characters, includes letter & number)
    const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required!");
            return;
        }

        if (!savedUser) {
            setError("You must sign up first!");
            return;
        }

        if (email !== savedUser.email || password !== savedUser.password) {
            setError("Invalid email or password!");
            return;
        }

        setError("");
        alert("Login successful!");
        onClose(); // Close modal after login
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (!email || !password || !username || !confirmPassword) {
            setError("All fields are required!");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format!");
            return;
        }
       if(!isValidPassword(password)){
        setError("Invalid password format!");
       }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setSavedUser({ email, password }); // Save user credentials
        setIsLogin(true); // Switch to login form
        setError("");
        alert("Signup successful! Please login.");
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email!");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format!");
            return;
        }

        alert("Password reset link sent to your email.");
        setIsForgotPassword(false);
        setIsLogin(true);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <button className="close-btn" onClick={onClose}>✖</button>

                {!isForgotPassword ? (
                    <>
                        <h2>{isLogin ? "Login" : "Signup"}</h2>
                        {error && <p className="error-message">{error}</p>}

                        <form onSubmit={isLogin ? handleLogin : handleSignup}>
                            {!isLogin && (
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {!isLogin && (
                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            )}
                            <button type="submit" className="click-btn-login">
                                {isLogin ? "Login" : "Signup"}
                            </button>
                        </form>

                        {isLogin ? (
                            <>
                                <p>
                                    Don't have an account?{" "}
                                    <button className="toggle-btn" onClick={() => setIsLogin(false)}>Signup</button>
                                </p>
                                <p>
                                    <button className="forgot-password-btn" onClick={() => setIsForgotPassword(true)}>
                                        Forgot Password?
                                    </button>
                                </p>
                            </>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <button className="toggle-btn" onClick={() => setIsLogin(true)}>Login</button>
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Forgot Password</h2>
                        {error && <p className="error-message">{error}</p>}

                        <form onSubmit={handleForgotPassword}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="click-btn-login">Submit</button>
                        </form>
                        <p>
                            Remember your password?{" "}
                            <button className="toggle-btn" onClick={() => setIsForgotPassword(false)}>Login</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
