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
        <div className="mt-6 card bg-base-200 shadow-md ">
            <h3 className="text-2xl font-bold m-5 text-primary">Mi Historial de Lectura</h3>

            {history.length === 0 ? (
                <p className="text-primary-70">No has registrado ningún libro todavía.</p>
            ) : (
                <div className="grid gap-4 ">
                    {history.map((item) => (
                        <div key={item.id} className="mx-5 py-2 card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title text-primary">{item.book.title}</h2>
                                <p className="text-primary-70">
                                    Autor: {item.book.author}
                                </p>
                                <div className="badge badge-accent">
                                    {item.status}
                                </div>
                            </div>

                        </div>
                    ))}
                    <br />
                </div>
            )}
        </div>
    );
}

export default UserHistory;
