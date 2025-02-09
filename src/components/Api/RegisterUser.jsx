import React, { useState } from "react";
import axios from "axios";
import "./RegisterUser.css"; // Import new CSS

function RegisterUser() {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8091/user/register-user", user);
      if (response.status === 201) {
        setMessage("User registered successfully!");
        setUser({ username: "", firstName: "", lastName: "", email: "", password: "", role: "user" });
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("Error: " + (error.response?.data || "Server error"));
    }
  };

  const handleClear = () => {
    setUser({ username: "", firstName: "", lastName: "", email: "", password: "", role: "user" });
    setMessage("");
    setError("");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>User Registration</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
          <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />

          <select name="role" value={user.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="Developer">Developer</option>
          </select>

          <div className="button-group">
            <button type="submit">Register</button>
            <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
