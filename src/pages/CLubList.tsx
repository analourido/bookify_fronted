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
      setClubs(data);
    } catch  {
      setError("Error al cargar los clubes");
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
      loadClubs(searchQuery); // Refrescamos la lista filtrada
    } catch {
      toast.error("Error al unirse al club");
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando clubs...</div>;
  if (error) return <div className="text-center text-red-700">{error}</div>;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary-90">Clubs de lectura</h2>
        <Link
          to="/clubs/create"
          className="bg-red-85 hover:bg-red-90 text-white font-semibold py-2 px-4 rounded shadow transition"
        >
          + Crear club
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o creador"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-primary-65 rounded"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="block bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
          >
            <Link to={`/clubs/${club.id}`}>
              <h3 className="text-xl font-semibold text-primary-85 mb-2">
                {club.name}
              </h3>
              <p className="text-primary-70 text-sm">
                {club.description}
              </p>
              <p className="text-primary-60 text-xs mt-2">
                Creado por: {club.admin.name}
              </p>
              <p className="text-primary-60 text-xs mt-1">
                {new Date(club.createdAt).toLocaleDateString()}
              </p>
            </Link>
            {user && club.admin.id !== user.id && (
              <button
                onClick={() => handleJoinClub(club.id)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              >
                Unirse al club
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubList;
