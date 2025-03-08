import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
    if (!book) return <div>Libros no encontradas</div>

    return (
        <div className="text-white">
            <div className="text-4xl font-extrabold dark:text-white">{book.title}</div>
            <div className="text-2xl font-extrabold dark:text-white">{book.description}</div>
            <div>Autor/a: {book.author}</div>
            <div>Género: {book.genre}</div>
            <div>Fecha publicación: {new Date(book.publishedAt).toLocaleString()}</div>
        </div>
    )
}

export default BookDetail