import { ChangeEvent, useEffect, useState } from "react";
import Books from "../models/Books";
import { BookService } from "../services/book.services";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function Booklist() {
    const [books, setBooks] = useState<Books[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    //const [titleQuery, setTitleQuery] = useState(null)

    const [queryParams, setQueryParams] = useSearchParams();
    const titleQuery = queryParams.get("title") || "";

    useEffect(() => {
        BookService.search(titleQuery)
            .then(setBooks)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [titleQuery]);

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
        <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-extrabold dark:text-white">
                Lista de libros
            </h2>
            <Link
                to="/books/new"
                className="text-white w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Añadir nuevo libro
            </Link>

            <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={titleQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar por título"
                />

                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error:{error}</p>}
            {books?.length === 0 && <p>No hay libros disponibles</p>}
            <div className="flex flex-wrap flex-row gap-4 items-center justify-center">

                {books?.map((book) => (
                    <div key={book.id} className="">
                        <a
                            href="#"
                            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {book.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {book.description}
                            </p>
                            <div className="flex items-center justify-center gap-4 mt-4">

                                <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/books/${book.id}`}>Ver</Link>
                                <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/books/edit/${book.id}`}>Editar</Link>
                                <button className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(book.id)}>Borrar</button>
                            </div>
                        </a>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Booklist;