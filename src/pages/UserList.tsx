import { useEffect, useState } from 'react';
import { UserService } from '../services/user.services';

interface User {
  id: number;
  name: string;
  surname: string;
  role: string;
  email: string;
  active: boolean;
  acceptNotifications: boolean;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await UserService.getAll();
        setUsers(userList);
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido';
        setMessage(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-8 text-primary-70">Cargando usuarios...</div>;
  if (message) return <div className="text-center text-red-600">{message}</div>;

  const activeUsers = users.filter(user => user.active);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-primary mb-6">Usuarios Activos</h2>
      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-primary-65">
        <table className="table ">
          <thead className="bg-[rgba(43,54,114,0.05)] text-primary-70 uppercase ">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user, index) => (
              <tr key={user.id} className="hover:bg-[rgba(43,54,114,0.05)]">
                <th className="text-primary-85">{index + 1}</th>
                <td className="font-medium text-primary-85">{user.name}</td>
                <td className="text-primary-70">{user.surname}</td>
                <td className="text-primary-70">{user.email}</td>
                <td className="text-primary-70">{user.role || 'user'}</td>
                <td>
                  <span className={`badge ${user.active ? 'badge-success' : 'badge-error'}`}>
                    {user.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[rgba(43,54,114,0.05)] text-primary-70">
            <tr>
              <th colSpan={2}>Total activos</th>
              <td colSpan={4} className="font-bold">
                {activeUsers.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default UserList;
