import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClubService } from "../services/club.service";
import { BookService } from "../services/book.services";
import { useAuth } from "../contexts/AuthContext";
import librosImg from "../assets/libros01.jpg";
import toast from "react-hot-toast";

interface Member {
  id: number;
  role: string;
  user: { id: number; name: string };
}

interface Review {
  idUser: number;
  idBook: number;
  user: { id: number; name: string };
  content: string;
  rating: number;
  createdAt: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description?: string;
  publishedAt: string;
  coverUrl?: string;
  reviews?: Review[];
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
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState<Club | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<{ [bookId: number]: number }>({});
  const [votedBookId, setVotedBookId] = useState<number | null>(null);




  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ClubService.getById(Number(id))
      .then(async (clubData) => {
        setClub(clubData);
        const selected: ClubBook | undefined = clubData.books.find((cb: ClubBook) => cb.selected);
        if (selected) {
          const bookWithReviews = await BookService.getById(selected.book.id);
          setSelectedBook(bookWithReviews);
        }
      })
      .catch(() => setError("Error cargando el club"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id || !user) return; // ← cambiamos user?.id por user

    ClubService.getVotes(Number(id)).then((data) => {
      const voteCounts: { [bookId: number]: number } = {};
      let userVote: number | null = null;

      data.forEach((vote: { idBook: number; idUser: number }) => {
        voteCounts[vote.idBook] = (voteCounts[vote.idBook] || 0) + 1;
        if (vote.idUser === user.id) {
          userVote = vote.idBook;
        }
      });

      setVotes(voteCounts);
      setVotedBookId(userVote);

      console.log("Votos cargados:", data);
      console.log("Voto del usuario actual:", userVote);
    });
  }, [id, user]); // ← dependemos de user completo


  const handleJoin = async () => {
    if (!window.confirm("¿Estás seguro que quieres unirte a este club?")) return;
    try {
      await ClubService.joinClub(Number(id));
      toast.success("¡Te has unido al club!");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
      const selected: ClubBook | undefined = updatedClub.books.find((cb: ClubBook) => cb.selected);
      if (selected) {
        const bookWithReviews = await BookService.getById(selected.book.id);
        setSelectedBook(bookWithReviews);
      }
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
      const selected: ClubBook | undefined = updatedClub.books.find((cb: ClubBook) => cb.selected);
      if (selected) {
        const bookWithReviews = await BookService.getById(selected.book.id);
        setSelectedBook(bookWithReviews);
      } else {
        setSelectedBook(null);
      }
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
      const bookWithReviews = await BookService.getById(bookId);
      setSelectedBook(bookWithReviews);
    } catch {
      toast.error("Error al seleccionar el libro del mes");
    }
  };

  const handleResetAllBooks = async () => {
    if (!window.confirm("¿Seguro que quieres resetear todos los libros del club?")) return;
    try {
      await ClubService.resetAllBooks(Number(id));
      toast.success("Todos los libros reseteados");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
      setSelectedBook(null);
    } catch {
      toast.error("Error al resetear los libros");
    }
  };

  const handleResetSelectedBook = async () => {
    if (!window.confirm("¿Eliminar solo el libro del mes?")) return;
    try {
      await ClubService.resetSelectedBook(Number(id));
      toast.success("Libro del mes eliminado");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
      setSelectedBook(null);
    } catch {
      toast.error("Error al eliminar el libro del mes");
    }
  };

  const handleDeleteProposedBook = async (clubBookId: number) => {
    if (!window.confirm("¿Eliminar esta propuesta?")) return;
    try {
      await ClubService.deleteProposedBook(clubBookId);
      toast.success("Propuesta eliminada");
      const updatedClub = await ClubService.getById(Number(id));
      setClub(updatedClub);
    } catch {
      toast.error("Error al eliminar la propuesta");
    }
  };

  const handleVoteBook = async (bookId: number) => {
    if (!window.confirm("¿Votar por este libro? Solo se permite 1 voto.")) return;
    try {
      await ClubService.voteBook(Number(id), bookId);
      toast.success("Voto registrado");
      setVotedBookId(bookId);

      // Recargar votos
      const data = await ClubService.getVotes(Number(id));
      const voteCounts: { [bookId: number]: number } = {};
      data.forEach((vote: { idBook: number }) => {
        voteCounts[vote.idBook] = (voteCounts[vote.idBook] || 0) + 1;
      });
      setVotes(voteCounts);
    } catch {
      toast.error("Error al votar");
    }
  };

  const handleRemoveVote = async () => {
    if (!window.confirm("¿Seguro que quieres retirar tu voto?")) return;
    try {
      await ClubService.removeVote(Number(id));
      toast.success("Voto retirado");
      setVotedBookId(null);

      // Recargar votos
      const data = await ClubService.getVotes(Number(id));
      const voteCounts: { [bookId: number]: number } = {};
      data.forEach((vote: { idBook: number }) => {
        voteCounts[vote.idBook] = (voteCounts[vote.idBook] || 0) + 1;
      });
      setVotes(voteCounts);
    } catch {
      toast.error("Error al retirar el voto");
    }
  };


  const isMember = user && club?.members.some((m) => m.user.id === user.id);
  const isAdmin = user && club?.admin.id === user.id;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Día 1 del próximo mes a las 00:00
      const diff = end.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

    };

    updateCountdown(); // Al cargar
    const interval = setInterval(updateCountdown, 1000); // Actualiza cada segundo

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-primary-70">Cargando...</div>;
  if (error) return <div className="text-error">{error}</div>;
  if (!club) return <div className="text-error">Club no encontrado</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8">
      {/* Hero Section */}
      <div
        className="relative rounded-lg overflow-hidden shadow-md"
        style={{
          backgroundImage: `linear-gradient(rgba(254, 245, 217,0.6), rgba(254, 245, 217,0.6)), url(${librosImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-8 text-center text-primary-content">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{club.name}</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto">{club.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Libro del Mes */}
        <div className="lg:col-span-2 bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold text-primary mb-4 border-b border-primary-70 pb-2">
            Libro del Mes
          </h2>
          {selectedBook ? (
            <div className="flex flex-col gap-6">
              {/* Info principal del libro */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                {selectedBook.coverUrl ? (
                  <img
                    src={selectedBook.coverUrl}
                    alt={`Portada de ${selectedBook.title}`}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-32 h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-600">
                    Sin portada
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-primary">{selectedBook.title}</h3>
                  <p className="text-primary-70">{selectedBook.author}</p>
                </div>
              </div>

              {/* Últimas Reseñas */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-primary-85 mb-2 border-b border-primary-70 pb-1">
                  Últimas Reseñas
                </h3>
                {selectedBook.reviews?.length ? (
                  <>
                    <ul className="space-y-2">
                      {selectedBook.reviews
                        .slice(-3)
                        .reverse()
                        .map((review) => (
                          <li
                            key={review.idUser + "-" + review.idBook}
                            className="bg-base-200 p-3 rounded shadow hover:bg-primary-60 hover:text-white transition"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-medium">{review.user.name}</p>
                              <div className="flex gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <span
                                    key={i}
                                    className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-400"}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="italic">{review.content}</p>
                            <p className="text-sm text-primary-70">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </li>
                        ))}
                    </ul>
                    <div className="mt-3 text-right">
                      <button
                        onClick={() => navigate(`/books/${selectedBook.id}`)}
                        className="text-primary-85 hover:text-primary-90 underline transition"
                      >
                        Ver todas las reseñas →
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-primary-70 italic">No hay reseñas aún.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-primary-70 italic">No hay un libro del mes seleccionado aún.</p>
          )}
        </div>

        {/* Contador */}
        <div className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition text-center flex flex-col justify-center items-center">
          <h2 className="text-3xl text-primary-70 mt-2">Elección del próximo libro en</h2>

          {(timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds) > 0 ? (
            <div
              className={`flex flex-col justify-center items-center py-4 text-primary transition-all duration-200 `}
            >
              <div className="text-5xl md:text-6xl font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </div>

            </div>
          ) : (
            <div className="text-success text-lg font-semibold mt-4">
              ¡Es hora de elegir la lectura del mes!
            </div>
          )}
          {isAdmin && (
            <div className="flex flex-col gap-2 mt-4 w-full">
              <button
                onClick={handleResetAllBooks}
                className="btn btn-outline btn-warning btn-sm w-full"
              >
                Resetear todo
              </button>
              <button
                onClick={handleResetSelectedBook}
                className="btn btn-outline btn-error btn-sm w-full"
              >
                Eliminar solo libro del mes
              </button>
            </div>
          )}
        </div>

      </div>
      {/* Libros Propuestos */}
      {isMember && (
        <div className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-primary mb-4 border-b border-primary-70 pb-2">
            Libros propuestos
          </h2>
          {club.books.length ? (
            <ul className="space-y-2">
              {club.books.map((cb) => (
                <li key={cb.id} className="flex justify-between items-center gap-2 flex-wrap">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/books/${cb.book.id}`}
                      className="text-primary-85 font-medium underline hover:text-primary"
                    >
                      {cb.book.title} — {cb.book.author}
                    </Link>

                    <span className="badge badge-outline">
                      {votes[cb.book.id] || 0} votos
                    </span>

                    {!cb.selected && (
                      votedBookId === cb.book.id ? (
                        <button
                          onClick={handleRemoveVote}
                          className="btn btn-outline btn-sm btn-warning"
                        >
                          Quitar voto
                        </button>
                      ) : votedBookId === null ? (
                        <button
                          onClick={() => handleVoteBook(cb.book.id)}
                          className="btn btn-outline btn-sm btn-accent"
                        >
                          Votar
                        </button>
                      ) : (
                        <span className="text-primary-60 italic text-sm">Ya has votado</span>
                      )
                    )}


                    {cb.selected && (
                      <span className="text-success font-semibold">(Actual)</span>
                    )}
                  </div>

                  {/* Solo visible para el admin */}
                  {isAdmin && (
                    <div className="flex gap-2">
                      {!cb.selected && (
                        <button
                          onClick={() => handleSelectBook(cb.book.id)}
                          className="btn btn-outline btn-sm btn-info"
                        >
                          Seleccionar
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteProposedBook(cb.id)}
                        className="btn btn-outline btn-sm btn-error"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-primary-70">No hay libros registrados aún.</p>
          )}
        </div>
      )}

      {/* Top 3 libros más votados */}
      <div className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
        <h2 className="text-xl font-bold text-primary mb-4 border-b border-primary-70 pb-2">
          Top 3 Libros Más Votados
        </h2>
        {club.books.length ? (
          <ul className="space-y-4">
            {[...club.books]
              .sort((a, b) => (votes[b.book.id] || 0) - (votes[a.book.id] || 0))
              .slice(0, 3)
              .map((cb, index) => (
                <li key={cb.id} className="flex gap-4 items-center">
                  <div className="text-3xl font-bold text-primary w-8">{index + 1}.</div>

                  {/* Imagen del libro */}
                  {cb.book.coverUrl ? (
                    <img
                      src={cb.book.coverUrl}
                      alt={`Portada de ${cb.book.title}`}
                      className="w-16 h-24 object-cover rounded-md shadow"
                    />
                  ) : (
                    <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-sm">
                      Sin<br />portada
                    </div>
                  )}

                  {/* Info del libro */}
                  <div className="flex flex-col">
                    <Link
                      to={`/books/${cb.book.id}`}
                      className="text-lg font-semibold text-primary hover:text-primary-90 underline"
                    >
                      {cb.book.title}
                    </Link>
                    <p className="text-primary-70 text-sm mb-1">{cb.book.author}</p>
                    <span className="mt-1 text-sm text-primary-70">
                      {votes[cb.book.id] || 0} votos
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-primary-70">No hay libros registrados aún.</p>
        )}
      </div>


      {/* Miembros */}
      <div className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
        <h2 className="text-xl font-bold text-primary mb-4 border-b border-primary-70 pb-2">
          Miembros
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {club.members.map((m: Member) => (
            <li
              key={m.id}
              className="bg-base-200 rounded px-3 py-2 text-primary-85 font-medium text-center hover:bg-primary-60 hover:text-white transition"
            >
              {m.user.name} {m.role === "admin" && "(admin)"}
            </li>
          ))}
        </ul>
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap gap-4 justify-center">
        {isMember && (
          <button onClick={handleGoToChat} className="btn btn-primary">
            Ir al Chat
          </button>
        )}
        {isMember ? (
          <button onClick={handleLeave} className="btn btn-error">
            Salir del Club
          </button>
        ) : (
          <button onClick={handleJoin} className="btn btn-success">
            Unirse al Club
          </button>
        )}
      </div>
    </div>
  );
}

export default ClubDetail;
