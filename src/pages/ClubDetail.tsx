import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClubService } from "../services/club.service";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

interface Member {
  id: number;
  role: string;
  user: { id: number; name: string };
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description?: string;
  publishedAt: string;
  coverUrl?: string;
  idCategory?: number | null;
  canReview?: boolean;
  idUser: number;
  averageRating?: number;
}

interface ClubBook {
  id: number;
  book: Book;
  selected: boolean;
  month: string | null;
}

interface Club {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  admin: { id: number; name: string };
  members: Member[];
  books: ClubBook[];
}

function ClubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState<Club | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ClubService.getById(Number(id))
      .then(setClub)
      .catch(() => setError("Error cargando el club"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleJoin = async () => {
    if (!window.confirm("¿Estás seguro que quieres unirte a este club?")) return;
    try {
      await ClubService.joinClub(Number(id));
      toast.success("¡Te has unido al club!");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
    } catch {
      toast.error("Error al unirse al club");
    }
  };

  const handleLeave = async () => {
    if (!window.confirm("¿Estás seguro que quieres salir del club?")) return;
    try {
      await ClubService.leaveClub(Number(id));
      toast.success("Has salido del club.");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
    } catch {
      toast.error("Error al salir del club");
    }
  };

  const handleGoToChat = () => {
    navigate(`/clubs/${id}/chat`);
  };

  const handleSelectBook = async (bookId: number) => {
    try {
      await ClubService.selectBook(Number(id), bookId);
      toast.success("¡Libro del mes actualizado!");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
    } catch {
      toast.error("Error al seleccionar el libro del mes");
    }
  };

  const isMember = user && club?.members.some((m) => m.user.id === user.id);
  const isAdmin = user && club?.admin.id === user.id;

  const getBookOfTheMonth = () => {
    if (!club || !club.books.length) return "Aún no se ha seleccionado un libro del mes.";
    const selectedBook = club.books.find((cb) => cb.selected);
    if (!selectedBook) return "Aún no se ha seleccionado un libro del mes.";
    return `${selectedBook.book.title} — ${selectedBook.book.author}`;
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!club) return <div>Club no encontrado</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold text-primary-90">{club.name}</h1>
      <p className="mt-2 text-primary-85">{club.description}</p>

      {/* 📚 Libro del mes */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-primary-85">📚 Libro del mes</h2>
        <p className="mt-2">{getBookOfTheMonth()}</p>
      </div>

      {/* 📚 Seleccionar libro del mes (solo para admin) */}
      {isAdmin && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-primary-85">📚 Seleccionar libro del mes</h2>
          {club.books.length ? (
            <ul className="list-disc list-inside text-primary-70 mt-2">
              {club.books.map((cb) => (
                <li key={cb.id}>
                  {cb.book.title} — {cb.book.author}
                  {!cb.selected && (
                    <button
                      onClick={() => handleSelectBook(cb.book.id)}
                      className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
                    >
                      Seleccionar como libro del mes
                    </button>
                  )}
                  {cb.selected && (
                    <span className="ml-2 text-green-600 font-semibold">(Actual)</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-primary-70">No hay libros registrados aún.</p>
          )}
        </div>
      )}

      {/* 👥 Miembros */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-primary-85">👥 Miembros</h2>
        <ul className="list-disc list-inside text-primary-70 mt-2">
          {club.members.map((m: Member) => (
            <li key={m.id}>
              {m.user.name} {m.role === "admin" && "(admin)"}
            </li>
          ))}
        </ul>
      </div>

      {/* Botones de acciones */}
      <div className="mt-6 flex flex-wrap gap-4">
        {isMember && (
          <button
            onClick={handleGoToChat}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            Ir al chat del club
          </button>
        )}
        {isMember ? (
          <button
            onClick={handleLeave}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Salir del club
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Unirse al club
          </button>
        )}
      </div>
    </div>
  );
}

export default ClubDetail;
