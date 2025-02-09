import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios";

function GetDetails() {

  const [data1, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setData(response.data))
      .catch(error => console.error("Error:", error));
  }, []);


  return (
    <>
     {/* Add margin to avoid content being hidden under the fixed navbar */}
     <div className="container mt-5 pt-5">
        <h2 className="my-4 text-center">User Data</h2>

        {/* Responsive Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
  {data1.map(user => (
    <tr key={user.id}>
      <td data-label="ID">{user.id}</td>
      <td data-label="Name">{user.name}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Username">{user.username}</td>
      <td data-label="Phone">{user.phone}</td>
      <td data-label="Website">
        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">  
          {user.website}
        </a>
      </td>
    </tr>
  ))}
</tbody>
          </table>

          </div>
          </div>
    </>
  )
}

export default GetDetails
