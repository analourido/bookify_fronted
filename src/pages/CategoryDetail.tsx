import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryService } from "../services/category.service";
import { BookService } from "../services/book.services";
import Category from "../models/Category";
import Books from "../models/Books";
import { BookOpen, ArrowLeftCircle } from "lucide-react"; // Icons

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
                const categoryId = Number(id);
                const categoryData = await CategoryService.getById(categoryId);
                setCategory(categoryData);

                const booksData = await BookService.getByCategoryId(categoryId);
                const booksDataTyped: Books[] = booksData as Books[];
                const filteredBooks: Books[] = booksDataTyped.filter(
                    (book: Books) => book.idCategory === categoryId
                );
                setBooks(filteredBooks);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryDetails();
    }, [id]);

    if (loading)
        return <div className="text-center text-primary-70">Cargando...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;
    if (!category)
        return (
            <div className="text-center text-primary-70">
                Categoría no encontrada.
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-extrabold text-primary-90 flex items-center gap-2">
                    <BookOpen className="h-8 w-8 text-primary-85" />
                    Categoría: {category.name}
                </h1>
                <Link
                    to="/categories"
                    className="flex items-center gap-2 text-red-85 hover:text-red-90 transition"
                >
                    <ArrowLeftCircle className="h-5 w-5" />
                    Volver
                </Link>
            </div>

            <section className="mb-6">
                <h2 className="text-xl font-bold text-primary-85 mb-2">
                    Libros en esta categoría:
                </h2>
                {books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {books.map((book) => (
                            <Link
                                key={book.id}
                                to={`/books/${book.id}`}
                                className="p-4 bg-[rgba(43,54,114,0.05)] rounded-lg hover:bg-primary-60 hover:text-white transition shadow-md"
                            >
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                                <p className="text-sm text-primary-70">
                                    Autor: {book.author}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-primary-70 italic">
                        No hay libros en esta categoría.
                    </p>
                )}
            </section>
        </div>
    );
}

export default CategoryDetail;
