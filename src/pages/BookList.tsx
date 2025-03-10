import { ChangeEvent, useEffect, useState } from "react";
import Books from "../models/Books";
import { BookService } from "../services/book.services";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

function Booklist() {
    const { isAdmin } = useAuth()
    const [books, setBooks] = useState<Books[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    //const [titleQuery, setTitleQuery] = useState(null)

    const [queryParams, setQueryParams] = useSearchParams();
    const titleAuthorQuery = queryParams.get("title") || "";


    useEffect(() => {
        BookService.search(titleAuthorQuery)
            .then(setBooks)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [titleAuthorQuery]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setQueryParams(newTitle ? { title: newTitle } : {});
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar este libro?"))
            return;

        try {
            await BookService.delete(id);
            setBooks(books?.filter((book) => book.id !== id));
            toast.success("Libro borrado correctamente!");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
        }
    };

    return (
        <div className="w-full m-5  bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md">
            <div id="defaultTabContent">
                <div className="p-4 rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-extrabold text-primary-90">
                            Lista de libros
                        </h2>
                        <Link
                            to="/books/new"
                            className="inline-block text-white bg-primary-85  hover:bg-primary-90 focus:ring-4 focus:outline-none focus:ring-primary-70 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md w-fit"
                        >
                            Añadir nuevo libro
                        </Link>

                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            </div>
                            <input
                                className="block w-full p-4 ps-10 text-sm text-primary-85 border border-primary-65 rounded-lg bg-[rgba(43,54,114,0.13)] focus:ring-primary-85 focus:border-primary-85 transition-all duration-300 ease-in-out"
                                value={titleAuthorQuery}
                                onChange={handleSearchChange}
                                placeholder="Buscar por título o autor"
                            />
                        </div>

                        {loading && <p className="text-primary-70">Cargando...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {books?.length === 0 && <p className="text-primary-70">No hay libros disponibles</p>}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {books?.map((book) => (
                                <div key={book.id} className="">
                                    <div
                                        className="block p-6 bg-[rgba(43,54,114,0.13)]  rounded-lg shadow-md transition-all duration-300 ease-in-out"
                                    >
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary-90">
                                            {book.title}
                                        </h5>
                                        <p className="font-normal text-primary-85">
                                            {book.description}
                                        </p>
                                        <div className="flex items-center justify-center gap-4 mt-4">
                                            <Link
                                                className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                                                to={`/books/${book.id}`}
                                            >
                                                Ver
                                            </Link>
                                            {isAdmin && (
                                                <>
                                                    <Link
                                                        className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                                                        to={`/books/edit/${book.id}`}
                                                    >
                                                        Editar
                                                    </Link>

                                                    <button
                                                        className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                                                        onClick={() => handleDelete(book.id)}
                                                    >
                                                        Borrar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booklist;