import { useEffect, useState } from "react";
import { ReadingHistoryService } from "../services/readingHistory.service";

type HistoryItem = {
    id: string;
    book: {
        title: string;
        author: string;
    };
    status: string;
};

function UserHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [filteredStatus, setFilteredStatus] = useState<string>("Todos");

    useEffect(() => {
        ReadingHistoryService.getUserHistory()
            .then(setHistory)
            .catch(console.error);
    }, []);

    const filteredHistory = filteredStatus === "Todos"
        ? history
        : history.filter(item => item.status === filteredStatus);

    return (
        <div className="mt-6 card bg-base-200 shadow-md p-6">
            <h3 className="text-2xl font-bold text-primary mb-4">Mi Historial de Lectura</h3>

            <div className="mb-6">
                <label className="text-primary-70 font-medium mr-2">Filtrar por estado:</label>
                <select
                    className="select select-bordered select-sm"
                    value={filteredStatus}
                    onChange={(e) => setFilteredStatus(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Leído">Leído</option>
                    <option value="Leyendo">Leyendo</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
            </div>

            {filteredHistory.length === 0 ? (
                <p className="text-primary-70">No hay libros en este estado.</p>
            ) : (
                <div className="grid gap-4">
                    {filteredHistory.map((item) => (
                        <div key={item.id} className="card bg-base-100 shadow-sm border border-primary-30">
                            <div className="card-body">
                                <h2 className="card-title text-primary">{item.book.title}</h2>
                                <p className="text-primary-70">Autor: {item.book.author}</p>
                                <div className="badge badge-accent">{item.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserHistory;
