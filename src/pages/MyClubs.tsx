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

    if (loading) return <div className="text-center mt-8">Cargando clubs...</div>;
    if (error) return <div className="text-center text-red-700">{error}</div>;

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-primary-90 mb-4">Mis Clubs</h2>

            {/* Clubs como admin */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary-85 mb-2">
                    Clubs que has creado (Admin)
                </h3>
                {adminClubs.length ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {adminClubs.map((club) => (
                            <Link
                                key={club.id}
                                to={`/clubs/${club.id}`}
                                className="block bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
                            >
                                <h4 className="text-lg font-semibold text-primary-85 mb-1">
                                    {club.name}
                                </h4>
                                <p className="text-primary-70 text-sm">{club.description}</p>
                                <p className="text-primary-60 text-xs mt-2">
                                    Creado el {new Date(club.createdAt).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-primary-70">No has creado ningún club todavía.</p>
                )}
            </div>

            {/* Clubs como miembro */}
            <div>
                <h3 className="text-xl font-semibold text-primary-85 mb-2">
                    Clubs de los que formas parte
                </h3>
                {memberClubs.length ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {memberClubs.map((club) => (
                            <Link
                                key={club.id}
                                to={`/clubs/${club.id}`}
                                className="block bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
                            >
                                <h4 className="text-lg font-semibold text-primary-85 mb-1">
                                    {club.name}
                                </h4>
                                <p className="text-primary-70 text-sm">{club.description}</p>
                                <p className="text-primary-60 text-xs mt-2">
                                    Creado el {new Date(club.createdAt).toLocaleDateString()}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-primary-70">No eres miembro de ningún club todavía.</p>
                )}
            </div>
        </div>
    );
}

export default MyClubs;
