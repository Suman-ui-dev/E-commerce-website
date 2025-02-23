import React, { useState } from "react";
import axios from "axios";
import '../../css/style.css';

const LoginSignupPage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    if (isLogin) {
      // Login API call
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        console.log(response.data);
        setError(""); // Clear any previous errors
        // Add any additional logic after successful login here
      } catch (error) {
        setError(error.response?.data?.message || "Login failed. Please check your credentials.");
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      // Signup API call
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false); // Reset loading state
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", {
          username,
          email,
          password,
        });
        console.log(response.data);
        setError(""); // Clear any previous errors
        // Add any additional logic after successful signup here
      } catch (error) {
        setError(error.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email: forgotPasswordEmail,
      });
      setForgotPasswordMessage(response.data.message);
      setError(""); // Clear any previous errors
      setShowForgotPassword(false); // Redirect back to login page
    } catch (error) {
      setForgotPasswordMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{showForgotPassword ? "Forgot Password" : isLogin ? "Login" : "Signup"}</h2>
        {error && <p className="error-message">{error}</p>}
        {forgotPasswordMessage && <p className="success-message">{forgotPasswordMessage}</p>}

        {showForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPasswordSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </form>
        ) : (
          // Login/Signup Form
          <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={loading}>{loading ? "Submitting..." : (isLogin ? "Login" : "Signup")}</button>
          </form>
        )}

        {!showForgotPassword && isLogin && (
          <p>
            Don't have an account?{" "}
            <button className="toggle-btn" onClick={() => setIsLogin(false)}>
              Signup
            </button>
            <br />
            Forgot your password?{" "}
            <button className="toggle-btn" onClick={() => setShowForgotPassword(true)}>
              Reset Password
            </button>
          </p>
        )}

        {!showForgotPassword && !isLogin && (
          <p>
            Already have an account?{" "}
            <button className="toggle-btn" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </p>
        )}

        {showForgotPassword && (
          <p>
            Remember your password?{" "}
            <button className="toggle-btn" onClick={() => setShowForgotPassword(false)}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignupPage;