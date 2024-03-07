import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:3002/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3002/users/${userId}`);
      apiCall();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center">
        {users && users.length > 1 ? "Utilisateurs" : "Utilisateur"}
      </h1>

      <div className="overflow-y-scroll h-96 my-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Prénom
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                User_Id
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.last_name}
                </td>
                <td className="px-6 py-4">{user.first_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4 gap-x-4">
                  <button
                    className="bg-blue-600 text-white hover:bg-none"
                    onClick={() => setEditingUser(user)}
                  >
                    Editer
                  </button>
                  <button
                    className="bg-red-500 text-white ml-3"
                    onClick={() => deleteUser(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserForm
        apiCall={apiCall}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
    </div>
  );
}

export default App;
