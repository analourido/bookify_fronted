import { useEffect, useState } from "react";
import { UserService } from "../services/user.services";
import User from "../models/User";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nombreUs, setNombreUs] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userData = await UserService.getProfile();
        setUser(userData);

        // pone las iniciales del nombre y apellido, si no AB
        if (userData && userData.name && userData.surname) {
          setNombreUs((userData.name[0] + userData.surname[0]).toLocaleUpperCase());
        } else {
          setNombreUs("AB")
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-lg overflow-hidden bg-[rgba(43,54,114,0.13)] border border-primary-65">
      <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-500 rounded-full">
          <span className="font-medium text-white">{nombreUs}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-6 text-primary-90">
            Perfil de Usuario
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-primary-70">
            Información detallada del usuario.
          </p>
        </div>
      </div>
      <div className="px-4 py-2">
        <dl className="divide-y divide-primary-65">
          {loading && (
            <div className="py-4">
              <dt className="text-sm font-medium text-primary-70">
                Cargando...
              </dt>
            </div>
          )}
          {error && (
            <div className="py-4">
              <dt className="text-sm font-medium text-primary-70">
                Error:
              </dt>
              <dd className="mt-1 text-sm text-red-500">{error}</dd>
            </div>
          )}
          {user && (
            <>
              <div className="py-4">
                <dt className="text-sm font-medium text-primary-70">
                  Nombre
                </dt>
                <dd className="mt-1 text-sm text-primary-85">{user.name}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-primary-70">
                  Apellidos
                </dt>
                <dd className="mt-1 text-sm text-primary-85">{user.surname}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-primary-70">
                  Correo Electrónico
                </dt>
                <dd className="mt-1 text-sm text-primary-85">{user.email}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-primary-70">
                  Rol
                </dt>
                <dd className="mt-1 text-sm text-primary-85">{user.role}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-primary-70">
                  Activado
                </dt>
                <dd className="mt-1 text-sm text-primary-85">{user.active ? 'Sí' : 'No'}</dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-medium text-primary-70">
                  Recibe notificaciones por email
                </dt>
                <dd className="mt-1 text-sm text-primary-85">{user.acceptNotifications ? 'Sí' : 'No'}</dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}

export default Profile;
