import { ChangeEvent, useEffect, useState } from "react";
import Books from "../models/Books";
import { BookService } from "../services/book.services";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

function Booklist() {
    const { isAdmin } = useAuth();
    const [books, setBooks] = useState<Books[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [queryParams, setQueryParams] = useSearchParams();
    const titleAuthorQuery = queryParams.get("title") || "";

    const truncate = (text: string, maxWords = 15) =>
        text.split(" ").slice(0, maxWords).join(" ") + (text.split(" ").length > maxWords ? "..." : "");

    useEffect(() => {
        BookService.search({ title: titleAuthorQuery })
            .then(setBooks)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [titleAuthorQuery]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setQueryParams(newTitle ? { title: newTitle } : {});
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar este libro?")) return;

        try {
            await BookService.delete(id);
            setBooks(books?.filter((book) => book.id !== id));
            toast.success("Libro borrado correctamente!");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-primary mb-4">Lista de Libros</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    className="input input-bordered w-full md:w-1/2"
                    value={titleAuthorQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar por título o autor"
                />
                <div className="flex gap-2">
                    <Link
                        to="/books/new"
                        className="btn btn-primary"
                    >
                        Añadir Nuevo
                    </Link>
                    <Link
                        to="/books/explorer"
                        className="btn btn-secondary"
                    >
                        Buscar en Open Library
                    </Link>
                </div>
            </div>

            {loading && <p className="text-primary">Cargando...</p>}
            {error && <p className="text-error">Error: {error}</p>}
            {books?.length === 0 && <p className="text-primary">No hay libros disponibles.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books?.map((book) => (
                    <div key={book.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition">
                        {book.coverUrl && (
                            <figure className="p-4">
                                <img
                                    src={book.coverUrl || 'img/placeholder.png'}
                                    alt={`Portada de ${book.title}` || 'img/placeholder.png'}
                                    className="h-60 w-full object-contain p-2 bg-base-200 rounded-md"
                                />
                            </figure>
                        )}
                        <div className="card-body">
                            <h3 className="card-title text-primary">
                                {book.title}
                            </h3>
                            <p className="text-primary-70">{truncate(book.description || "")}</p>

                            <div className="flex justify-between items-center mt-2">
                                <Link
                                    className="btn btn-primary btn-sm"
                                    to={`/books/${book.id}`}
                                >
                                    Ver
                                </Link>
                                {isAdmin && (
                                    <div className="flex gap-2">
                                        <Link
                                            className="btn btn-secondary btn-sm"
                                            to={`/books/edit/${book.id}`}
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Booklist;
