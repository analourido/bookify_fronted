import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { fetchAPI } from "../utils/FetchAPI";
import { ClubService } from "../services/club.service";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

interface Club {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  admin: { id: number; name: string };
}

function ClubList() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async (query = "") => {
    setLoading(true);
    try {
      const url =
        import.meta.env.VITE_API_URL_BASE +
        `/clubs/all${query ? `?search=${encodeURIComponent(query)}` : ""}`;
      const data = await fetchAPI(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // Filtrar clubs creados por el usuario autenticado
      const filteredClubs = user
        ? data.filter((club: Club) => club.admin.id !== user.id)
        : data;

      setClubs(filteredClubs);
    } catch {
      setError("Error al cargar los clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    loadClubs(value);
  };

  const handleJoinClub = async (clubId: number) => {
    try {
      await ClubService.joinClub(clubId);
      toast.success("Te has unido al club correctamente");
      loadClubs(searchQuery);
    } catch {
      toast.error("Error al unirse al club");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-primary mb-4">Lista de Clubs</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          className="input input-bordered w-full md:w-1/2"
          placeholder="Buscar por nombre o creador"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex gap-2">
          <Link
            to="/clubs/create"
            className="btn btn-primary"
          >
            + Crear club
          </Link>
        </div>
      </div>

      {loading && <p className="text-primary">Cargando...</p>}
      {error && <p className="text-error">Error: {error}</p>}
      {clubs.length === 0 && !loading && (
        <p className="text-primary">No hay clubs disponibles.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition">
            <div className="card-body">
              <h3 className="card-title text-primary">{club.name}</h3>
              <p className="text-primary-70">
                {club.description ? truncate(club.description, 20) : "Sin descripción"}
              </p>
              <p className="text-primary-60 text-sm mt-1">
                Creado por: {club.admin.name}
              </p>
              <p className="text-primary-60 text-xs mt-1">
                {new Date(club.createdAt).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/clubs/${club.id}`}
                >
                  Ver detalles
                </Link>
                {user && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleJoinClub(club.id)}
                  >
                    Unirse
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function truncate(text: string, maxWords = 20) {
    const words = text.split(" ");
    return words.slice(0, maxWords).join(" ") + (words.length > maxWords ? "..." : "");
  }
}

export default ClubList;
