import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAPI } from "../utils/FetchAPI";

interface ReadingList {
    id: number;
    name: string;
    books: { book: { id: number; title: string } }[];
}

function MyReadingLists() {
    const [lists, setLists] = useState<ReadingList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newListName, setNewListName] = useState("");

    useEffect(() => {
        loadLists();
    }, []);

    const loadLists = async () => {
        try {
            setLoading(true);
            const data = await fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/my-reading-lists`);
            setLists(data);
        } catch (err) {
            setError("Error cargando las listas de lectura");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateList = async () => {
        if (!newListName.trim()) {
            toast.error("El nombre no puede estar vacío");
            return;
        }
        try {
            await fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/my-reading-lists`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newListName }),
            });
            toast.success("Lista creada correctamente");
            setNewListName("");
            loadLists();
        } catch (err) {
            toast.error("Error al crear la lista");
            console.error(err);
        }
    };

    const handleDeleteList = async (id: number) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta lista?")) return;
        try {
            await fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/my-reading-lists/${id}`, {
                method: "DELETE",
            });
            toast.success("Lista eliminada correctamente");
            loadLists();
        } catch (err) {
            toast.error("Error al eliminar la lista");
            console.error(err);
        }
    };

    const handleUpdateList = async (id: number, name: string) => {
        const newName = prompt("Nuevo nombre de la lista:", name);
        if (newName === null || newName.trim() === "") return;
        try {
            await fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/my-reading-lists/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });
            toast.success("Lista actualizada");
            loadLists();
        } catch (err) {
            toast.error("Error al actualizar la lista");
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-primary-90 mb-4">📚 Mis listas de lectura</h1>

            {/* Crear lista */}
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Nombre de la nueva lista"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="flex-1 border border-primary-65 rounded px-3 py-2"
                />
                <button
                    onClick={handleCreateList}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Crear
                </button>
            </div>

            {/* Mensajes */}
            {loading && <p className="text-primary-70">Cargando listas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {lists.length === 0 && !loading && (
                <p className="text-primary-70">Aún no tienes listas de lectura.</p>
            )}

            {/* Listado */}
            <ul className="space-y-4">
                {lists.map((list) => (
                    <li key={list.id} className="border rounded p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-primary-85">{list.name}</h3>
                                <p className="text-sm text-primary-70">
                                    Libros: {list.books.length}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleUpdateList(list.id, list.name)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteList(list.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        {/* Libros de la lista */}
                        {list.books.length > 0 && (
                            <ul className="mt-2 list-disc list-inside text-primary-70">
                                {list.books.map((b) => (
                                    <li key={b.book.id}>
                                        <Link to={`/books/${b.book.id}`} className="hover:underline">
                                            {b.book.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyReadingLists;
