import { fetchAPI } from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class ReadingListService {
    static getUserLists() {
        throw new Error("Method not implemented.");
    }
    // Obtener todas las listas del usuario
    static async getMyLists() {
        return await fetchAPI(`${API_URL_BASE}/my-reading-lists`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
    }

    // Crear una nueva lista
    static async createList(name: string) {
        return await fetchAPI(`${API_URL_BASE}/my-reading-lists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
            credentials: "include",
        });
    }

    // Actualizar el nombre de la lista
    static async updateList(id: number, name: string) {
        return await fetchAPI(`${API_URL_BASE}/my-reading-lists/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
            credentials: "include",
        });
    }

    // Eliminar una lista
    static async deleteList(id: number) {
        return await fetchAPI(`${API_URL_BASE}/my-reading-lists/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
    }

    // Añadir un libro a una lista
    static async addBookToList(listId: number, bookId: number) {
        return await fetchAPI(`${API_URL_BASE}/my-reading-lists/${listId}/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookId }),
            credentials: "include",
        });
    }

    // Eliminar un libro de una lista
    static async removeBookFromList(listId: number, bookId: number) {
        return await fetchAPI(`${API_URL_BASE}/my-reading-lists/${listId}/books/${bookId}`, {
            method: "DELETE",
            credentials: "include",
        });
    }
}
