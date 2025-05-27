import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchAPI } from "../utils/FetchAPI"

interface Club {
    id: number
    name: string
    description: string
    createdAt: string
}

function ClubList() {
    const [clubs, setClubs] = useState<Club[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAPI(import.meta.env.VITE_API_URL_BASE + "/clubs", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then(setClubs)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="text-center mt-8">Cargando clubs...</div>
    if (error) return <div className="text-center text-red-700">{error}</div>

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary-90">Clubs de lectura</h2>
                <Link
                    to="/clubs/create"
                    className="bg-red-85 hover:bg-red-90 text-white font-semibold py-2 px-4 rounded shadow transition"
                >
                    + Crear club
                </Link>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {clubs.map((club) => (
                    <Link
                        to={`/clubs/${club.id}`}
                        key={club.id}
                        className="block bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
                    >
                        <h3 className="text-xl font-semibold text-primary-85 mb-2">{club.name}</h3>
                        <p className="text-primary-70 text-sm">{club.description}</p>
                        <p className="text-primary-60 text-xs mt-2">
                            Creado el {new Date(club.createdAt).toLocaleDateString()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ClubList
