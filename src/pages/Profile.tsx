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

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userData = await UserService.getProfile();
        setUser(userData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Inicializa Flowbite para tooltips
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary">
            Perfil de Usuario
          </h2>
          <p className="text-primary-70">
            Bienvenido a tu espacio personal, revisa y actualiza tus datos.
          </p>

          {loading && (
            <div className="mt-4">
              <span className="loading loading-spinner text-primary"></span> Cargando...
            </div>
          )}

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          {user && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-primary-70 font-medium">Nombre:</span>
                  <p className="text-primary font-semibold">{user.name}</p>
                </div>
                <div>
                  <span className="text-primary-70 font-medium">Apellidos:</span>
                  <p className="text-primary font-semibold">{user.surname}</p>
                </div>
                <div>
                  <span className="text-primary-70 font-medium">Email:</span>
                  <p className="text-primary font-semibold">{user.email}</p>
                </div>
                <div>
                  <span className="text-primary-70 font-medium">Rol:</span>
                  <br />
                  <p className="badge badge-primary capitalize text-amber-50">{user.role || "user"}</p>
                </div>
                <div>
                  <span className="text-primary-70 font-medium">Activado:</span>
                  <br />
                  <p className="badge badge-success">
                    {user.active ? "Sí" : "No"}
                  </p>
                </div>
                <div>
                  <span className="text-primary-70 font-medium">
                    Notificaciones Email:
                  </span>
                  <br />
                  <p className="badge badge-accent">
                    {user.acceptNotifications ? " Sí" : "No"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/my-reading-lists"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Mis listas de lectura
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Historial de lectura */}
      {user && (
        <div className="mt-8">
          <UserHistory />
        </div>
      )}
    </div>
  );
}

export default Profile;
