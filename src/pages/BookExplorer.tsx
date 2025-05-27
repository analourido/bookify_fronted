import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface ExternalBook {
    title: string
    author: string
    publishedAt: number
    coverUrl: string | null
    isbn: string | null
    genre: string
    description: string
}

export default function BookExplorer() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<ExternalBook[]>([])
    const [loading, setLoading] = useState(false)
    useAuth()
    const truncate = (text: string, maxWords = 30) =>
        text.split(" ").slice(0, maxWords).join(" ") + (text.split(" ").length > maxWords ? "..." : "")

    const navigate = useNavigate()

    const handleSearch = async () => {
        if (!query) return
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL_BASE}/external-books/search?title=${encodeURIComponent(query)}`, {
                withCredentials: true
            })

            const books: ExternalBook[] = Array.isArray(res.data) ? res.data : []
            setResults(books)
        } catch (err) {
            toast.error('Error al buscar libros')
            console.error('Error al buscar libros', err)
        } finally {
            setLoading(false)
        }
    }

    const handleImport = async (book: ExternalBook) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL_BASE}/books/import`, {
                ...book,
                genre: book.genre || 'General',
                description: book.description || 'Sin descripción',
                coverUrl: book.coverUrl,
            }, {
                withCredentials: true
            })
            toast.success(`Libro "${book.title}" importado correctamente`)
            navigate('/books')
        } catch (err) {
            toast.error('Error al importar el libro')
            console.error(err)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Explorar libros (Open Library)</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por título"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >Buscar</button>
            </div>

            {loading && <p>Buscando libros...</p>}

            <ul className="space-y-4">
                {results.map((book, index) => (
                    <li key={index} className="border rounded p-4 flex gap-4">
                        {book.coverUrl && (
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-24 h-auto object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">{book.title}</h3>
                            <p>Autor: {book.author}</p>
                            <p>Año: {book.publishedAt}</p>
                            <p>Género: {book.genre}</p>
                            <p className="text-sm text-gray-600">{truncate(book.description)}</p>
                            <button
                                onClick={() => handleImport(book)}
                                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                            >Importar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
