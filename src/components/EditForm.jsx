import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../redux/userSlice";

function EditForm() {
  const { id } = useParams();
  const users = useSelector((state) => state.user.users);
  const user = users.find((u) => u.id === parseInt(id));
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUser({ id: parseInt(id), name, email }));
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 border border-gray-300">
      <h2 className="text-lg font-bold mb-2">Edit User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="btn btn-dark">Update User</button>
    </form>
  );
}

export default EditForm;
