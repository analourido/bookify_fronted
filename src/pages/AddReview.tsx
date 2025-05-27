import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddReview() {
    const { id } = useParams(); // id del libro
    const navigate = useNavigate();

    const [rating, setRating] = useState<number>(5);
    const [content, setContent] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL_BASE}/reviews/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // asegura que se envíe la cookie de sesión
                body: JSON.stringify({ content, rating })
            });

            if (!res.ok) throw new Error("Error al enviar la reseña");

            toast.success("¡Reseña añadida con éxito!");
            navigate(`/books/${id}`);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <div className="max-w-screen-sm mx-auto mt-10 p-6 bg-[rgba(43,54,114,0.13)] rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-primary-90">Añadir reseña</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-primary-70">Puntuación (1-5):</label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                        className="w-full px-4 py-2 border rounded bg-white"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-primary-70">Comentario:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border rounded bg-white"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary-85 hover:bg-primary-90 text-white px-4 py-2 rounded transition"
                >
                    Enviar reseña
                </button>
            </form>
        </div>
    );
}

export default AddReview;
