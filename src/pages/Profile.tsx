import { useEffect, useState } from "react";
import { UserService } from "../services/user.services";
import User from "../models/User";
import { initFlowbite } from "flowbite";
import UserHistory from "../components/UserHistory";
import { Link } from "react-router-dom";

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
        if (userData && userData.email) {
          setNombreUs((userData.email[0]).toLocaleUpperCase());
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



  // inicialoiza Flowbite para el pop
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-lg overflow-hidden bg-[rgba(43,54,114,0.13)] border border-primary-65">
      <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
          <span className="font-medium text-gray-600 dark:text-gray-300">{nombreUs}</span>
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
                <dt className="text-sm font-medium text-primary-70 flex items-center">
                  <p>Rol<button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button" ><svg className="w-4 h-4 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg><span className="sr-only">Show information</span></button></p>
                  <div data-popover id="popover-description" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-100 transition-opacity duration-300 bg-white  rounded-lg shadow-sm opacity-0 w-72 dark:bg-[rgba(43,54,114,0.74)]  dark:text-gray-200" >
                    <div className="p-3 space-y-2">
                      <h3 className="font-semibold text-primary-70 dark:text-white">ROLES</h3>
                      <p>Administrador: Tiene todos los privilegios y control sobre la aplicación.</p>
                      <p>Visitante: No tiene un rol asignado y tiene permisos limitados.</p>
                    </div>
                    <div data-popper-arrow></div>
                  </div>
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
          <Link
            to="/my-reading-lists"
            className="mt-4 inline-block bg-primary-85 hover:bg-primary-90 text-white font-medium py-2 px-4 rounded-lg shadow transition"
          >
            Mis listas de lectura
          </Link>
        </dl>
        {user && <UserHistory />}

      </div>
    </div>
  );
}

export default Profile;
