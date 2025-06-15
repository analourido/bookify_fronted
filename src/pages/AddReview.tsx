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
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // asegura que se envíe la cookie de sesión
                body: JSON.stringify({ content, rating }),
            });

            if (!res.ok) throw new Error("Error al enviar la reseña");

            toast.success("¡Reseña añadida con éxito!");
            navigate(`/books/${id}`);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <div className="max-w-screen-sm mx-auto mt-10 space-y-6">
            <h1 className="text-3xl font-extrabold text-primary-90 text-center">Añadir Reseña</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-base-100 rounded-lg shadow-md p-6 border border-primary-65 space-y-4"
            >
                {/* Rating con estrellas */}
                <div>
                    <label className="block mb-2 text-primary-85 font-semibold">Puntuación:</label>
                    <div className="rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <input
                                key={i}
                                type="radio"
                                name="rating"
                                className="mask mask-star bg-yellow-400"
                                aria-label={`${i + 1} estrella${i > 0 ? "s" : ""}`}
                                checked={rating === i + 1}
                                onChange={() => setRating(i + 1)}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-primary-70 mt-1">
                        Selecciona la puntuación haciendo clic en las estrellas.
                    </p>
                </div>

                {/* Comentario */}
                <div>
                    <label className="block mb-2 text-primary-85 font-semibold">Comentario:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={4}
                        placeholder="Escribe tu reseña aquí..."
                        className="w-full px-4 py-2 border rounded bg-white"
                    />
                </div>

                {/* Botón de enviar */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-primary-85 hover:bg-primary-90 text-white font-semibold px-6 py-2 rounded transition-all duration-300 ease-in-out shadow-md"
                    >
                        Enviar Reseña
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddReview;
