import { useEffect, useState } from "react";
import type {
  EditableUser,
  NewUser,
  Role,
  User,
  UserRoleMap,
} from "../types/user";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import AddUserForm from "./AddUserForm";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<UserRoleMap>({});

  useEffect(() => {
    setLoading(true);

    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (updated: EditableUser) => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updated } : user
      )
    );
  };

  const handleAddUser = (newUser: NewUser) => {
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const createUser = { id: newId, ...newUser };
    setUsers((prev) => [...prev, createUser]);
  };

  const handleChangeRole = (userId: number, newRole: Role) => {
    setUserRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <AddUserForm onAdd={handleAddUser} />
      <h2 className="text-xl mb-4 font-bold">사용자 목록</h2>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <select
              value={userRoles[user.id] || "viewer"}
              onChange={(e) =>
                handleChangeRole(user.id, e.target.value as Role)
              }
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </td>
          <td>
            <button
              onClick={() => setSelectedUser(user)}
              className="text-blue-600"
            >
              수정
            </button>
          </td>
        </tr>
      ))}

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onSave={handleUpdate}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
