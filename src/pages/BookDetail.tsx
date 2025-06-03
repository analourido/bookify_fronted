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
                    const adminClubs = clubs.filter(
                        (club) => club.admin.id === user.id
                    );
                    setClubs(adminClubs);
                })
                .catch((error) => console.error(error));

            ReadingListService.getMyLists()
                .then((lists: ReadingList[]) => {
                    setReadingLists(lists);
                })
                .catch((error) => console.error(error));
        }
    }, [user]);

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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!book)
        return (
            <div className="text-center text-primary-70">Libro no encontrado</div>
        );

    return (
        <div className="max-w-screen-md mx-auto m-4 p-4 bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md">
            <div className="m-10 text-primary-85">
                {book.coverUrl && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={book.coverUrl}
                            alt={`Portada de ${book.title}`}
                            className="max-h-80 rounded shadow-md"
                        />
                    </div>
                )}

                <div className="text-4xl font-extrabold text-primary-90 mb-2">
                    {book.title}
                </div>
                <div className="text-2xl font-semibold text-primary-85 mb-4">
                    {book.description}
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-primary-70">Autor/a:</span>{" "}
                    {book.author}
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-primary-70">Género:</span>{" "}
                    {book.genre}
                </div>
                <div>
                    <span className="font-semibold text-primary-70">
                        Fecha publicación:
                    </span>{" "}
                    {new Date(book.publishedAt).toLocaleDateString()}
                </div>
                <AverageRating rating={book.averageRating} />
            </div>

            {book.canReview && (
                <Link
                    to={`/books/${book.id}/review`}
                    className="mx-5 my-5 text-white bg-red-85 hover:bg-red-90 focus:ring-4 focus:outline-none focus:ring-red-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
                >
                    Añadir reseña
                </Link>
            )}
            <Link
                to={"/books"}
                className="mx-5 my-5 text-white bg-red-85 hover:bg-red-90 focus:ring-4 focus:outline-none focus:ring-red-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
            >
                Volver
            </Link>

            {/* 🔥 Añadir libro a un club (solo admins) */}
            {clubs.length > 0 && (
                <div className="m-10">
                    <h3 className="text-xl font-bold mb-2 text-primary-85">
                        Añadir libro a un club:
                    </h3>
                    <label className="block text-primary-85 text-sm mb-1">
                        Selecciona club:
                    </label>
                    <select
                        onChange={(e) => setSelectedClubId(Number(e.target.value))}
                        className="w-full p-2 rounded border border-primary-65"
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
                        className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                        Añadir al club
                    </button>
                </div>
            )}

            {/* ⭐️ Añadir libro a lista personalizada */}
            {readingLists.length > 0 && (
                <div className="m-10">
                    <h3 className="text-xl font-bold mb-2 text-primary-85">
                        Añadir libro a una lista:
                    </h3>
                    <label className="block text-primary-85 text-sm mb-1">
                        Selecciona lista:
                    </label>
                    <select
                        onChange={(e) => setSelectedListId(Number(e.target.value))}
                        className="w-full p-2 rounded border border-primary-65"
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
                        className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                    >
                        Añadir a lista
                    </button>
                </div>
            )}

            {/* Estado de lectura */}
            {user && (
                <div className="mt-6">
                    <label className="block text-primary-70 mb-1">Estado de lectura:</label>
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
                </div>
            )}

            {/* Reseñas */}
            <div className="m-10">
                <h3 className="text-xl font-bold mb-2 text-primary-85">Reseñas:</h3>
                {book.reviews?.length ? (
                    <ul className="space-y-4">
                        {book.reviews.map((review) => (
                            <li
                                key={review.idUser + "-" + review.idBook}
                                className="border p-4 rounded shadow-sm"
                            >
                                <p className="font-semibold text-primary-70">
                                    {review.user.name} — {review.rating} ★
                                </p>
                                <p className="text-primary-85">{review.content}</p>
                                <p className="text-sm text-primary-70">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-primary-70">
                        Este libro aún no tiene reseñas.
                    </p>
                )}
            </div>
        </div>
    );
}

export default BookDetail;
