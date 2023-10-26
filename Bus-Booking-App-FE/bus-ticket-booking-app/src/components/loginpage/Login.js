import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file
import SignupModal from "./SignUpModal"; // Import the SignupModal component

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false); // State to control the signup modal
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Credentials Cannot be Blank");
      return; // Don't proceed with login if fields are blank
    }
  
    // Create the login credentials object
    const loginCredentials = {
      username,
      password,
    };
  
    try {
      // Make a POST request to the login API
      const response = await fetch("http://localhost:8002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });
  
      if (response.ok) {
        // Parse the response JSON
        const data = await response.json();
  
        if (data.role === "USER") {
          // Store the customerData in local storage
          sessionStorage.setItem('customerData', JSON.stringify(data));
  
          // Navigate to the user route with the username and customer ID as URL parameters
          navigate(`/user?username=${data.customerName}&customerId=${data.customerId}`);
        } else if (data.role === "ADMIN") {
          // Navigate to the admin route with the username as a URL parameter
          sessionStorage.setItem('adminData', JSON.stringify(data));
          navigate(`/admin?username=${data.adminname}`);
        } else {
          // Handle unknown role or other scenarios
          alert("Unknown role or error in response");
        }
      } else {
        // Handle authentication error
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Invalid username or password");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Don't have an account?{" "}
          <span
            className="signup-link"
            onClick={() => setShowSignupModal(true)}
          >
            Sign Up
          </span>
        </p>
      </div>
      {/* Render the SignupModal component */}
      <SignupModal
        show={showSignupModal}
        handleClose={() => setShowSignupModal(false)}
      />
    </div>
  );
};

export default Login;
