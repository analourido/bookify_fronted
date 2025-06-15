import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/FetchAPI";

function CreateClub() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetchAPI(
                import.meta.env.VITE_API_URL_BASE + "/clubs",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ name, description }),
                }
            );

            if (!response.id) throw new Error("Error al crear el club");
            navigate(`/clubs/${response.id}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Error inesperado");
            } else {
                setError("Error inesperado");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-3xl font-bold text-primary-90 mb-4">
                Crear Nuevo Club
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-base-100 shadow-lg rounded-lg p-6 border border-primary-60 hover:shadow-xl transition-all"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-primary-85 font-semibold mb-1"
                    >
                        Nombre del Club:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Escribe el nombre del club"
                        className="w-full input input-bordered"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-primary-85 font-semibold mb-1"
                    >
                        Descripción:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        placeholder="Describe brevemente el club..."
                        className="w-full textarea textarea-bordered"
                    />
                </div>

                {error && (
                    <div className="text-error font-medium mb-2">
                        ⚠️ {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Creando..." : "Crear Club"}
                </button>
            </form>
        </div>
    );
}

export default CreateClub;
