import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ClubService } from "../services/club.service"
import Book from "../models/Books"

interface Member {
    id: number
    role: string
    user: { id: number; name: string }
}

interface Club {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
    admin: { id: number; name: string }
    members: Member[]
    books: Book[] // Podrás definir más adelante si añades el libro del mes aquí
}

function ClubDetail() {
    const { id } = useParams()
    const [club, setClub] = useState<Club | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        ClubService.getById(Number(id))
            .then(setClub)
            .catch(() => setError("Error cargando el club"))
            .finally(() => setLoading(false))
    }, [id])

    const handleLeave = async () => {
        try {
            await ClubService.leaveClub(Number(id))
            window.location.reload()
        } catch {
            alert("Error al salir del club")
        }
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>{error}</div>
    if (!club) return <div>Club no encontrado</div>

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-primary-90">{club.name}</h1>
            <p className="mt-2 text-primary-85">{club.description}</p>

            {/* 📚 Libro del mes */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-primary-85">📚 Libro del mes</h2>
                {club.books.length ? (
                    <div className="mt-2">
                        <strong>{club.books[0].title}</strong> — {club.books[0].author}
                    </div>
                ) : (
                    <p className="text-primary-70">Aún no se ha seleccionado un libro del mes.</p>
                )}
            </div>

            {/* 👥 Miembros */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-primary-85">👥 Miembros</h2>
                <ul className="list-disc list-inside text-primary-70 mt-2">
                    {club.members.map((m: Member) => (
                        <li key={m.id}>
                            {m.user.name} {m.role === "admin" && "(admin)"}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 💬 Chat/Mensajes */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-primary-85">💬 Mensajes del club</h2>
                {/* Aquí añadiremos el componente de mensajes */}
                <p className="text-primary-70 mt-2">Próximamente...</p>
            </div>

            {/* Botón de unirse o salir */}
            <div className="mt-6">
                <button
                    onClick={handleLeave}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                >
                    Salir del club
                </button>
            </div>
        </div>
    )
}

export default ClubDetail
