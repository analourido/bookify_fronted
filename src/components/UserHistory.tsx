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

    useEffect(() => {
        ReadingHistoryService.getUserHistory()
            .then(setHistory)
            .catch(console.error);
    }, []);

    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-2 text-primary-85">📚 Mi Historial de Lectura</h3>
            {history.length === 0 ? (
                <p className="text-primary-70">No has registrado ningún libro todavía.</p>
            ) : (
                <ul className="space-y-2">
                    {history.map((item) => (
                        <li key={item.id} className="border rounded p-4 shadow bg-white">
                            <div className="flex justify-between">
                                <span>{item.book.title} — {item.book.author}</span>
                                <span className="text-primary-85 font-medium">{item.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserHistory;
