import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClubService } from "../services/club.service";
import { useAuth } from "../contexts/AuthContext";

interface Club {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    admin: { id: number; name: string };
}

function MyClubs() {
    const { user } = useAuth();
    const [adminClubs, setAdminClubs] = useState<Club[]>([]);
    const [memberClubs, setMemberClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        setLoading(true);
        ClubService.getUserClubs()
            .then((clubs: Club[]) => {
                const admin = clubs.filter((club) => club.admin.id === user.id);
                const member = clubs.filter((club) => club.admin.id !== user.id);
                setAdminClubs(admin);
                setMemberClubs(member);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [user]);

    const handleDeleteClub = async (clubId: number) => {
        if (!window.confirm("¿Estás seguro de que quieres borrar este club? Esta acción no se puede deshacer.")) return;
        try {
            await ClubService.delete(clubId);
            setAdminClubs((prev) => prev.filter((club) => club.id !== clubId));
        } catch {
            alert("Error al borrar el club. Inténtalo más tarde.");
        }
    };


    if (loading) return <div className="text-center mt-8 text-primary-70">Cargando clubs...</div>;
    if (error) return <div className="text-center text-red-700">{error}</div>;

    const renderClubCard = (club: Club, isAdmin: boolean) => (
        <div
            key={club.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition border border-primary-60"
        >
            <div className="card-body">
                <h4 className="card-title text-primary-85">
                    {club.name}
                    {isAdmin && (
                        <span className="badge badge-secondary text-xs ml-2">Admin</span>
                    )}
                </h4>
                <p className="text-primary-70">{club.description}</p>
                <div className="mt-2 text-primary-60 text-sm">
                    Creado el {new Date(club.createdAt).toLocaleDateString()}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Link
                        to={`/clubs/${club.id}`}
                        className="btn btn-primary btn-sm"
                    >
                        Ver detalles
                    </Link>
                    {isAdmin ? (
                        <button
                            onClick={() => handleDeleteClub(club.id)}
                            className="btn btn-error btn-sm"
                        >
                            Borrar
                        </button>
                    ) : (
                        <div className="text-xs text-primary-70">
                            Admin: {club.admin.name}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-primary mb-4">Mis Clubs</h2>

            {/* Clubs como admin */}
            <section className="mb-10">
                <h3 className="text-xl font-semibold text-primary-85 mb-2">
                    Clubs que has creado (Admin)
                </h3>
                {adminClubs.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adminClubs.map((club) => renderClubCard(club, true))}
                    </div>
                ) : (
                    <p className="text-primary-70">
                        No has creado ningún club todavía.
                    </p>
                )}
            </section>

            {/* Clubs como miembro */}
            <section>
                <h3 className="text-xl font-semibold text-primary-85 mb-2">
                    Clubs de los que formas parte
                </h3>
                {memberClubs.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {memberClubs.map((club) => renderClubCard(club, false))}
                    </div>
                ) : (
                    <p className="text-primary-70">
                        No eres miembro de ningún club todavía.
                    </p>
                )}
            </section>
        </div>
    );
}

export default MyClubs;
