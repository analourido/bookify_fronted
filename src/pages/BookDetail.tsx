import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BookService } from "../services/book.services"
import Book from "../models/Books"
import AverageRating from "../components/AverageRating"
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

            <div className="m-10">
                <h3 className="text-xl font-bold mb-2 text-primary-85">Reseñas:</h3>
                {book.reviews?.length ? (
                    <ul className="space-y-4">
                        {book.reviews.map((review) => (
                            <li key={review.idUser + "-" + review.idBook} className="border p-4 rounded shadow-sm">
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
                    <p className="text-primary-70">Este libro aún no tiene reseñas.</p>
                )}
            </div>

        </div>

    );
}

export default BookDetail;

