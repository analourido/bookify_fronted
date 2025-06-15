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

    if (error) return <p className="text-error">{error}</p>
    if (!stats) return <p className="text-center">Cargando estadísticas...</p>

    return (
        <div className="flex justify-center mt-8">
            <div className="stats stats-vertical md:stats-horizontal bg-base-100 w-full max-w-4xl rounded-box">
                <div className="stat text-center">
                    <div className="stat-title text-lg">Usuarios registrados</div>
                    <div className="stat-value text-primary">{stats.totalUsers ?? "N/A"}</div>
                </div>
                <div className="stat text-center">
                    <div className="stat-title text-lg">Libros creados</div>
                    <div className="stat-value text-primary">{stats.totalBooks ?? "N/A"}</div>
                </div>
                <div className="stat text-center">
                    <div className="stat-title text-lg">Clubs creados</div>
                    <div className="stat-value text-primary">{stats.totalClubs ?? "N/A"}</div>
                </div>
                <div className="stat text-center">
                    <div className="stat-title text-lg">Reseñas publicadas</div>
                    <div className="stat-value text-primary">{stats.totalReviews ?? "N/A"}</div>
                </div>
            </div>
        </div>
    )
}

export default GlobalStatistics
