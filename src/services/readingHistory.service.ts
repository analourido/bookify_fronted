import { fetchAPI } from "../utils/FetchAPI";

export class ReadingHistoryService {
    static async updateStatus(bookId: number, status: string) {
        return await fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/reading-history/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookId, status }),
            credentials: "include"
        });
    }

    static async getUserHistory() {
        return await fetchAPI(`${import.meta.env.VITE_API_URL_BASE}/reading-history/user`, {
            method: "GET",
            credentials: "include"
        });
    }
}
