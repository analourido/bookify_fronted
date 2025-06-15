import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookService } from "../services/book.services";
import { ClubService } from "../services/club.service";
import { ReadingListService } from "../services/readingList.service";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Book from "../models/Books";
import AverageRating from "../components/AverageRating";
import { ReadingHistoryService } from "../services/readingHistory.service";

interface Club {
    id: number;
    name: string;
    admin: { id: number; name: string };
}

interface ReadingList {
    id: number;
    name: string;
}

function BookDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
    const [selectedClubId, setSelectedClubId] = useState<number | null>(null);
    const [selectedListId, setSelectedListId] = useState<number | null>(null);
    const [status, setStatus] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState<number>(5);
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        BookService.getById(Number(id))
            .then(setBook)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (user) {
            ClubService.getUserClubs()
                .then((clubs: Club[]) => {
                    const adminClubs = clubs.filter(club => club.admin.id === user.id);
                    setClubs(adminClubs);
                })
                .catch(console.error);

            ReadingListService.getMyLists()
                .then(setReadingLists)
                .catch(console.error);
        }
    }, [user]);

    const handleDeleteReview = async (idUser: number, idBook: number) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/reviews/${idBook}/${idUser}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) throw new Error("Error al eliminar la reseña");
            toast.success("¡Reseña eliminada correctamente!");
            const updatedBook = await BookService.getById(Number(id));
            setBook(updatedBook);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/reviews/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ content, rating }),
            });
            if (!res.ok) throw new Error("Error al enviar la reseña");
            toast.success("¡Reseña añadida con éxito!");
            setShowModal(false);

            const updatedBook = await BookService.getById(Number(id));
            setBook(updatedBook);
            setContent("");
            setRating(5);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const handleAddBookToClub = async () => {
        if (!selectedClubId || !book) {
            toast.error("Selecciona un club para añadir el libro.");
            return;
        }
        try {
            await ClubService.addBookToClub(selectedClubId, book.id);
            toast.success("Libro añadido al club correctamente.");
        } catch {
            toast.error("Error al añadir el libro al club.");
        }
    };

    const handleAddBookToList = async () => {
        if (!selectedListId || !book) {
            toast.error("Selecciona una lista para añadir el libro.");
            return;
        }
        try {
            await ReadingListService.addBookToList(selectedListId, book.id);
            toast.success("Libro añadido a la lista correctamente.");
        } catch {
            toast.error("Error al añadir el libro a la lista.");
        }
    };

    if (loading) return <div className="text-primary-70">Cargando...</div>;
    if (error) return <div className="text-error">Error: {error}</div>;
    if (!book) return <div className="text-center text-primary-70">Libro no encontrado</div>;

    return (
        <div className="max-w-6xl mx-auto my-12 px-4 space-y-12">
            <section className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-52 h-80 bg-base-200 rounded-lg shadow-lg overflow-hidden">
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={`Portada de ${book.title}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary-70">
                            Sin portada
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-extrabold text-primary-90 leading-tight">
                        {book.title}
                    </h1>
                    <p className="text-primary-70 text-lg font-medium">{book.genre}</p>
                    <p className="text-sm text-primary-60">
                        Publicado el {new Date(book.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="text-primary-85 text-base leading-relaxed">
                        {book.description}
                    </p>
                    <AverageRating rating={book.averageRating} />
                </div>
            </section>
            {/* Estado de lectura */}
            {user && (
                <section className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
                    <h2 className="text-2xl font-bold text-primary mb-4">Estado de lectura</h2>
                    <select
                        className="w-full p-2 rounded border border-primary-65"
                        value={status}
                        onChange={async (e) => {
                            const newStatus = e.target.value;
                            await ReadingHistoryService.updateStatus(book.id, newStatus);
                            setStatus(newStatus);
                            toast.success("Estado actualizado");
                        }}
                    >
                        <option value="">Seleccionar estado</option>
                        <option value="Leyendo">Leyendo</option>
                        <option value="Leído">Leído</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </section>
            )}

            {/* Admin: Añadir a Club o Lista */}
            {(clubs.length > 0 || readingLists.length > 0) && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clubs.length > 0 && (
                        <div className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
                            <h2 className="text-xl font-bold text-primary mb-4">
                                Añadir a un club
                            </h2>
                            <select
                                onChange={(e) => setSelectedClubId(Number(e.target.value))}
                                className="w-full p-2 rounded border border-primary-65 mb-2"
                            >
                                <option value="">Selecciona un club</option>
                                {clubs.map((club) => (
                                    <option key={club.id} value={club.id}>
                                        {club.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddBookToClub}
                                className="btn btn-primary w-full"
                            >
                                Añadir al club
                            </button>
                        </div>
                    )}

                    {readingLists.length > 0 && (
                        <div className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition">
                            <h2 className="text-xl font-bold text-primary mb-4">
                                Añadir a una lista
                            </h2>
                            <select
                                onChange={(e) => setSelectedListId(Number(e.target.value))}
                                className="w-full p-2 rounded border border-primary-65 mb-2"
                            >
                                <option value="">Selecciona una lista</option>
                                {readingLists.map((list) => (
                                    <option key={list.id} value={list.id}>
                                        {list.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddBookToList}
                                className="btn btn-primary w-full"
                            >
                                Añadir a la lista
                            </button>
                        </div>
                    )}
                </section>

            )}

            {/* Reseñas */}
            <section className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-60 hover:shadow-lg transition space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-primary">Reseñas</h2>
                    {book.canReview && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-primary"
                        >
                            Añadir Reseña
                        </button>
                    )}
                </div>

                {book.reviews?.length ? (
                    <ul className="space-y-4">
                        {book.reviews.map((review) => (
                            <li
                                key={review.idUser + "-" + review.idBook}
                                className="border border-primary-65 p-4 rounded-lg shadow-md bg-base-200 hover:bg-primary-60 hover:text-white transition flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
                                        <p className="font-semibold">{review.user.name}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="rating">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <input
                                                        key={i}
                                                        type="radio"
                                                        name={`rating-${review.idUser}-${review.idBook}`}
                                                        className={`mask mask-star ${i < review.rating ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                                        aria-label={`${i + 1} estrella${i > 0 ? 's' : ''}`}
                                                        checked={i === review.rating - 1}
                                                        readOnly
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-primary-85">{review.content}</p>
                                    <p className="text-sm text-primary-70 mt-1">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {user && user.id === review.idUser && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => handleDeleteReview(review.idUser, review.idBook)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Eliminar
                                        </ button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-primary-70 italic">
                        Este libro aún no tiene reseñas.
                    </p>
                )}
            </section>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-primary-85">Añadir Reseña</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-primary-85 font-semibold">Puntuación:</label>
                                <div className="rating">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <input
                                            key={i}
                                            type="radio"
                                            name="rating"
                                            className="mask mask-star bg-yellow-400"
                                            aria-label={`${i + 1} estrella${i > 0 ? "s" : ""}`}
                                            checked={rating === i + 1}
                                            onChange={() => setRating(i + 1)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-primary-85 font-semibold">Comentario:</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    rows={4}
                                    placeholder="Escribe tu reseña aquí..."
                                    className="w-full px-4 py-2 border rounded bg-white"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-primary "
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                >
                                    Enviar Reseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Botones de Acción */}
            <Link
                to="/books"
                className="btn bg-primary-85 hover:bg-primary-90 text-white"
            >
                Volver a libros
            </Link>
        </div>
    );
}

export default BookDetail;
