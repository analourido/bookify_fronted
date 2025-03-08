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
        console.log('Fetching users...');
        const userList = await UserService.getAll()
        console.log('Users fetched:', userList);
        setUsers(userList)
      } catch (error) {
        console.error('Error fetching users:', error);
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        setMessage(msg)
      } finally {
        setLoading(false)
      }
    }
    call()
  }, [])

  if (loading) return <div>Loading...</div>

  console.log('Users state before rendering:', users);
  return (


    <div className="relative overflow-x-auto">
      {message}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Apellido
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </th>
              <td className="px-6 py-4">
                {user.surname}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {user.role}
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>

  )
}

export default UserList