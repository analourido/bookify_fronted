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
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-primary mb-2">Mis listas de lectura</h1>
                <p className="text-primary-70">Organiza tus libros en listas personalizadas según tus intereses o categorías.</p>
            </div>

            {/* Crear lista */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Nombre de la nueva lista"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="input input-bordered w-full md:w-2/3"
                />
                <button onClick={handleCreateList} className="btn btn-primary">
                    Crear Lista
                </button>
            </div>

            {/* Mensajes */}
            {loading && <p className="text-primary-70">Cargando listas...</p>}
            {error && <p className="text-error">{error}</p>}
            {!loading && lists.length === 0 && (
                <p className="text-primary-70">Aún no tienes listas creadas.</p>
            )}

            {/* Listado */}
            <div className="grid gap-6">
                {lists.map((list) => (
                    <div
                        key={list.id}
                        className="bg-base-100 border border-primary-20 rounded-lg shadow-sm p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-primary">{list.name}</h3>
                                <p className="text-sm text-primary-60">Total de libros: {list.books.length}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleUpdateList(list.id, list.name)}
                                    className="btn btn-outline btn-sm"
                                >
                                    Renombrar
                                </button>
                                <button
                                    onClick={() => handleDeleteList(list.id)}
                                    className="btn btn-outline btn-sm btn-error"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                        {list.books.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1 text-primary-80">
                                {list.books.map((b) => (
                                    <li key={b.book.id}>
                                        <Link to={`/books/${b.book.id}`} className="hover:underline text-primary">
                                            {b.book.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-primary-60 italic">No hay libros en esta lista.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyReadingLists;
