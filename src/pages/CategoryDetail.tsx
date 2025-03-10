import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryService } from "../services/category.service";
import { BookService } from "../services/book.services";
import Category from "../models/Category";
import Books from "../models/Books";

function CategoryDetail() {
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [books, setBooks] = useState<Books[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            setLoading(true);
            try {
                // Fetch categoria
                const categoryId = Number(id);
                const categoryData = await CategoryService.getById(categoryId);
                setCategory(categoryData);

                // Fetch libros por categoria
                const booksData = await BookService.getByCategoryId(categoryId);
                //  filtramos los libros para que solo se muestren los de la misma categoria 
                const filteredBooks = booksData.filter((book: { idCategory: number; }) => book.idCategory === categoryId);
                setBooks(filteredBooks);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryDetails();
    }, [id]);

    if (loading) return <div className="text-center text-primary-70">Cargando...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;
    if (!category) return <div className="text-center text-primary-70">Categoría no encontrada</div>;

    return (
        <div className="max-w-screen-md mx-auto p-4 bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md">
            <div className="m-10 text-primary-85">
                <div className="text-4xl font-extrabold text-primary-90 mb-2">Categoría: {category.name}</div>
                <div className="mb-4">
                    <span className="font-semibold text-primary-70">Libros en esta categoría:</span>
                    {books.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {books.map((book) => (
                                <li key={book.id}>
                                    <Link to={`/books/${book.id}`} className=" hover:underline">
                                        {book.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-primary-70">No hay libros en esta categoría.</div>
                    )}
                </div>
            </div>
            <Link
                to={"/categories"}
                className="mx-5 my-5 text-white bg-red-85 hover:bg-red-90 focus:ring-4 focus:outline-none focus:ring-red-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
            >
                Volver
            </Link>
        </div>
    );
}

export default CategoryDetail;
