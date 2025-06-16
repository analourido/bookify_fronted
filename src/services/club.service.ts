import Club from "../models/Club"
import { fetchAPI } from "../utils/FetchAPI"

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class ClubService {
    static async getUserClubs() {
        return await fetchAPI(API_URL_BASE + '/clubs', {
            method: 'GET',
            credentials: 'include'
        })
    }

    static async getById(id: number) {
        return await fetchAPI(API_URL_BASE + '/clubs/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async joinClub(id: number) {
        return await fetchAPI(API_URL_BASE + '/clubs/' + id + '/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async leaveClub(id: number) {
        return await fetchAPI(API_URL_BASE + '/clubs/' + id + '/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async delete(id: number) {
        return fetchAPI(API_URL_BASE + '/clubs/' + id, {
            method: 'DELETE',
        });
    }


    static async create(club: Partial<Club>) {
        return await fetchAPI(API_URL_BASE + '/clubs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(club),
            credentials: 'include'
        })
    }

    // Votar un libro
    static async voteBook(clubId: number, bookId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idBook: bookId }),
            credentials: 'include'
        })
    }

    // Seleccionar libro del mes
    static async selectBook(clubId: number, bookId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/books/${bookId}/select`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
    }


    static async getMessages(clubId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/messages`, {
            method: 'GET',
            credentials: 'include'
        })
    }

    static async sendMessage(clubId: number, message: string) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message }),
            credentials: 'include'
        })
    }
    // Añadir un libro a un club
    static async addBookToClub(clubId: number, bookId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookId }), // ✅ Cambiar aquí
            credentials: 'include'
        })
    }

    static async deleteBook(clubId: number, clubBookId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/books/${clubBookId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    static async getAllClubs() {
        return await fetchAPI(`${API_URL_BASE}/clubs/all`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    async getBookHistory(clubId: number) {
        try {
            const response = await axios.get(`${API_URL_BASE}/clubs/${clubId}/book-history`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error al cargar el historial de libros:', error);
            throw error;
        }
    }

    static async resetAllBooks(clubId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/reset-all-books`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    static async resetSelectedBook(clubId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/reset-selected-book`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    static async deleteProposedBook(clubBookId: number) {
        return await fetchAPI(`${API_URL_BASE}/club-books/${clubBookId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    static async getVotes(clubId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/votes`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    static async removeVote(clubId: number) {
        return await fetchAPI(`${API_URL_BASE}/clubs/${clubId}/vote`, {
            method: 'DELETE',
            credentials: 'include',
        })
    }



}
