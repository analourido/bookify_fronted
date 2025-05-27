import { useEffect, useState } from 'react'
import { UserService } from '../services/user.services'

interface User {
  id: number
  name: string
  surname: string
  role: string
  email: string
  active: boolean
  acceptNotifications: boolean
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function call() {
      try {
        console.log('Fetching users...')
        const userList = await UserService.getAll()
        console.log('Users fetched:', userList)
        setUsers(userList)
      } catch (error) {
        console.error('Error fetching users:', error)
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        setMessage(msg)
      } finally {
        setLoading(false)
      }
    }
    call()
  }, [])

  if (loading) return <div>Loading...</div>

  // Filtrar usuarios activos
  const activeUsers = users.filter(user => user.active)

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="bg-[rgba(43,54,114,0.13)] border border-primary-65 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold text-primary-90 p-4">
          Lista de Usuarios Activos
        </h2>
        {message && <p className="text-center text-red-500 py-2">{message}</p>}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-primary-85">
            <thead className="text-xs text-primary-70 uppercase bg-[rgba(43,54,114,0.05)]">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Apellido
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.map(user => (
                <tr key={user.id} className="hover:bg-[rgba(43,54,114,0.05)] border-b border-primary-65">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-primary-85 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.surname}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.active ? (
                      <span className="text-green-700 font-bold">Activo</span>) :
                      (<span className="text-red-700 font-bold">Inactivo</span>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="font-semibold text-primary-90 bg-[rgba(43,54,114,0.05)]">
              <tr>
                <th scope="row" className="px-6 py-3 text-base">
                  Nº de usuarios activos
                </th>
                <td className="px-6 py-3">{activeUsers.length}</td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserList
