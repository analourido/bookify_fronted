import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAPI } from "../utils/FetchAPI"

function CreateClub() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetchAPI(import.meta.env.VITE_API_URL_BASE + "/clubs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, description })
            })

            if (!response.id) throw new Error("Error al crear el club")
            navigate(`/clubs/${response.id}`)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Error inesperado")
            } else {
                setError("Error inesperado")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
            <h2 className="text-2xl font-bold mb-4 text-primary-90">Crear nuevo club</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-85">
                        Nombre del club
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-primary-85">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        rows={4}
                    />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-85 hover:bg-red-90 text-white font-semibold py-2 px-4 rounded shadow transition"
                >
                    {loading ? "Creando..." : "Crear club"}
                </button>
            </form>
        </div>
    )
}

export default CreateClub
