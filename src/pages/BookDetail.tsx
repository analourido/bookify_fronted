import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BookService } from "../services/book.services"
import Book from "../models/Books"
function BookDetail() {
    const { id } = useParams()
    const [book, setBook] = useState<Book>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        //if(!id) return
        BookService
            .getById(Number(id))
            .then(setBook)
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!book) { return <div className="text-center text-primary-70">Libro no encontrado</div>; }

    return (
        <div className="max-w-screen-md mx-auto p-4 bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md">
            <div className="m-10 text-primary-85">
                <div className="text-4xl font-extrabold text-primary-90 mb-2">{book.title}</div>
                <div className="text-2xl font-semibold text-primary-85 mb-4">{book.description}</div>
                <div className="mb-2">
                    <span className="font-semibold text-primary-70">Autor/a:</span> {book.author}
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-primary-70">Género:</span> {book.genre}
                </div>
                <div>
                    <span className="font-semibold text-primary-70">Fecha publicación:</span>{' '}
                    {new Date(book.publishedAt).toLocaleDateString()}
                </div>


            </div>
            <Link
                to={"/books"}
                className="mx-5 my-5 text-white bg-red-85 hover:bg-red-90 focus:ring-4 focus:outline-none focus:ring-red-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
            >
                Volver
            </Link>
        </div>
    );
}

export default BookDetail;

