import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/v1/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/v1/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/v1/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Navigation buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/add-test")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          ➕ Add Test
        </button>
        <button
          onClick={() => navigate("/admin/test-list")}
          className="px-4 py-2 bg-yellow-600 text-white rounded"
        >
          📑 Manage Tests
        </button>
        <LogoutButton />
      </div>

      {/* User Management Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border">
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">
                <select
                  value={u.role}
                  onChange={(e) => changeRole(u._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
