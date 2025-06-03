import { useEffect, useState } from 'react'
import { fetchAPI } from '../utils/FetchAPI'

interface GlobalStats {
    totalUsers?: number;
    totalBooks?: number;
    totalClubs?: number;
    totalReviews?: number;
}

function GlobalStatistics() {
    const [stats, setStats] = useState<GlobalStats | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/statistics/global`)
            .then(setStats)
            .catch((err) => {
                console.error(err)
                setError("Error al cargar las estadísticas.")
            })
    }, [])

    if (error) return <p className="text-red-500">{error}</p>
    if (!stats) return <p>Cargando estadísticas...</p>

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded">
                <h3 className="font-bold text-lg text-primary-90">Usuarios registrados</h3>
                <p className="text-2xl text-primary-85">{stats.totalUsers ?? "N/A"}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
                <h3 className="font-bold text-lg text-primary-90">Libros creados</h3>
                <p className="text-2xl text-primary-85">{stats.totalBooks ?? "N/A"}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
                <h3 className="font-bold text-lg text-primary-90">Clubs creados</h3>
                <p className="text-2xl text-primary-85">{stats.totalClubs ?? "N/A"}</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
                <h3 className="font-bold text-lg text-primary-90">Reseñas publicadas</h3>
                <p className="text-2xl text-primary-85">{stats.totalReviews ?? "N/A"}</p>
            </div>
        </div>
    )
}

export default GlobalStatistics
