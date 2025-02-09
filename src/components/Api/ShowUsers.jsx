import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button';
import { Link } from 'react-router-dom';

;
import {  useNavigate } from "react-router-dom";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Used to navigate to edit page
  const url = "http://localhost:8091/user/get-all-user";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (username) => {
    try {
      await axios.delete(`http://localhost:8091/user/delete-user-by-username?username=${username}`);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div>
        <h2>User List</h2>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#007bff", color: "white" }}>
              <th>Sr. No</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* Edit Button */}
                    <button 
                      onClick={() => navigate(`/updateUser/${user.username}`)} 
                      style={{ background: "#28a745", color: "white", padding: "5px 10px", marginRight: "5px", border: "none", cursor: "pointer" }}>
                      Edit
                    </button>
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => deleteUser(user.username)} 
                      style={{ background: "#dc3545", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="container mx-auto p-4 flex items-center justify-center">
        <Link to="/registerUser">
          <Button style={{ background: "#007bff", color: "white", padding: "10px 15px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
            Add User
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ShowUsers;
