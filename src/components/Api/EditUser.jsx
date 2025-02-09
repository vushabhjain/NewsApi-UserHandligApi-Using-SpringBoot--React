import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditUser.css";

function EditUser() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8091/user/get-user-by-username/${username}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8091/user/update-user`, user);
      alert("User updated successfully!");
      navigate("/showUsers");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="edit-user-container">
      <div className="edit-user-card">
        <h2 className="edit-user-title">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label  className="text-dark p-1">First Name:</label>
            <input type="text" name="firstName" value={user.firstName || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label  className="text-dark p-1">Last Name:</label>
            <input type="text" name="lastName" value={user.lastName || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="text-dark p-1">Email:</label>
            <input type="email" name="email" value={user.email || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label  className="text-dark p-1">Role:</label>
            <select name="role" value={user.role || ""} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          <div className="button-group">
            <button type="submit" className="btn update-btn">
              Update
            </button>
            <button type="button" className="btn cancel-btn" onClick={() => navigate("/showUsers")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
