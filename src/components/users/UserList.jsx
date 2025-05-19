import React from "react";
import { useUserList } from "../../shared/hooks/useUserList";
import "../../style/User.css";

export default function UserList() {
  const { users, handleRolChange } = useUserList();

  const getRoleClass = (role) => {
    if (role === "ADMIN_ROLE") return "role-badge role-admin";
    if (role === "HOTEL_ROLE") return "role-badge role-hotel";
    return "role-badge role-client";
  };

  return (
    <div className="user-container">
      <h2 className="user-title">Gestión de Usuarios</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <span className={getRoleClass(u.role)}>
                  {u.role.replace("_ROLE", "")}
                </span>
              </td>
              <td>
                <button onClick={() => handleRolChange(u._id, u.role)} className="btn-role">
                  Cambiar Rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
