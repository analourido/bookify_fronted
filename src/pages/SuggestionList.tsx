import { ChangeEvent, useEffect, useState } from "react"
import Suggestion from "../models/Suggestion"
import { SuggestionService } from "../services/suggestion.service";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SuggestionList() {

    const { isAdmin } = useAuth()
    const [suggestions, setSuggestions] = useState<Suggestion[]>()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [queryParams, setQueryParams] = useSearchParams();
    const titleQuery = queryParams.get("title") || "";

    useEffect(() => {
        SuggestionService.search(titleQuery)
            .then(setSuggestions)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [titleQuery]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setQueryParams(newTitle ? { title: newTitle } : {});
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar esta sugerencia?"))
            return;

        try {
            await SuggestionService.delete(id);
            setSuggestions(suggestions?.filter((suggestion) => suggestion.id !== id));
            toast.success("Sugerencia borrada correctamente!");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
        }
    };

    return (
        <div className="w-full m-5  bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md">
            <div id="defaultTabContent">
                <div className="p-4 rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-extrabold text-primary-90">
                            Lista de Sugerencias
                        </h2>
                        <Link
                            to="/suggestions/new"
                            className="inline-block text-white bg-primary-85  hover:bg-primary-90 focus:ring-4 focus:outline-none focus:ring-primary-70 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md w-fit"
                        >
                            Añadir nueva sugerencia
                        </Link>

                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            </div>
                            <input
                                className="block w-full p-4 ps-10 text-sm text-primary-85 border border-primary-65 rounded-lg bg-[rgba(43,54,114,0.13)] focus:ring-primary-85 focus:border-primary-85 transition-all duration-300 ease-in-out"
                                value={titleQuery}
                                onChange={handleSearchChange}
                                placeholder="Buscar por título"
                            />
                        </div>

                        {loading && <p className="text-primary-70">Cargando...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {suggestions?.length === 0 && <p className="text-primary-70">No hay sugerencias disponibles</p>}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestions?.map((suggestion) => (
                                <div key={suggestion.id} className="">
                                    <div
                                        className="block p-6 bg-[rgba(43,54,114,0.13)]  rounded-lg shadow-md transition-all duration-300 ease-in-out"
                                    >
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary-90">
                                            {suggestion.title}
                                        </h5>
                                        <p className="font-normal text-primary-85">
                                            {suggestion.description}
                                        </p>
                                        <div className="flex items-center justify-center gap-4 mt-4">
                                            <Link
                                                className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                                                to={`/suggestions/${suggestion.id}`}
                                            >
                                                Ver
                                            </Link>
                                            {isAdmin && (
                                                <>
                                                    <Link
                                                        className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                                                        to={`/suggestions/edit/${suggestion.id}`}
                                                    >
                                                        Editar
                                                    </Link>

                                                    <button
                                                        className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                                                        onClick={() => handleDelete(suggestion.id)}
                                                    >
                                                        Borrar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuggestionList