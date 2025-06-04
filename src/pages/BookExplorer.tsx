import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ExternalBook {
    title: string;
    author: string;
    publishedAt: number;
    coverUrl: string | null;
    isbn: string | null;
    genre: string;
    description: string;
}

export default function BookExplorer() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ExternalBook[]>([]);
    const [loading, setLoading] = useState(false);
    useAuth();
    const navigate = useNavigate();

    const truncate = (text: string, maxWords = 30) =>
        text.split(' ').slice(0, maxWords).join(' ') +
        (text.split(' ').length > maxWords ? '...' : '');

    const handleSearch = async () => {
        if (!query) {
            toast.error('Por favor ingresa un título');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL_BASE}/external-books/search?title=${encodeURIComponent(query)}`,
                {
                    withCredentials: true,
                }
            );
            const books: ExternalBook[] = Array.isArray(res.data) ? res.data : [];
            setResults(books);
            if (books.length === 0) toast('No se encontraron resultados.');
        } catch (err) {
            toast.error('Error al buscar libros');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async (book: ExternalBook) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL_BASE}/books/import`,
                {
                    ...book,
                    genre: book.genre || 'General',
                    description: book.description || 'Sin descripción',
                    coverUrl: book.coverUrl,
                },
                {
                    withCredentials: true,
                }
            );
            toast.success(`Libro "${book.title}" importado correctamente`);
            navigate('/books');
        } catch (err) {
            toast.error('Error al importar el libro');
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-primary mb-2">
                    Explorar libros
                </h2>
                <p className="text-primary-70">
                    Busca títulos y descubre nuevas lecturas.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="input input-bordered w-full md:w-1/2"
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Buscar
                </button>
            </div>

            {loading && (
                <div className="flex justify-center my-10">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((book, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition">
                        <figure>
                            <img
                                src={book.coverUrl || 'img/placeholder.png'}
                                alt={book.title}
                                className="h-60 w-full object-contain p-2 bg-base-200 rounded-md"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-primary">{book.title}</h3>
                            <p className="text-primary-85">
                                <span className="font-semibold">Autor:</span> {book.author}
                            </p>
                            <p className="text-primary-85">
                                <span className="font-semibold">Año:</span> {book.publishedAt}
                            </p>
                            {book.genre && (
                                <div className="badge badge-secondary mb-2">
                                    {book.genre}
                                </div>
                            )}
                            <p className="text-sm text-primary-70">
                                {truncate(book.description)}
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <button
                                    onClick={() => handleImport(book)}
                                    className="btn btn-success btn-sm"
                                >
                                    Importar
                                </button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
