import Book from "../models/Books"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class BookService {
    static async search(filters: {
        title?: string;
        author?: string;
        genre?: string;
        year?: string;
        minRating?: string;
        sort?: string;
    }) {
        const params = new URLSearchParams();

        if (filters.title) params.append('title', filters.title);
        if (filters.author) params.append('author', filters.author);
        if (filters.genre) params.append('genre', filters.genre);
        if (filters.year) params.append('year', filters.year);
        if (filters.minRating) params.append('minRating', filters.minRating);
        if (filters.sort) params.append('sort', filters.sort);

        const url = `${API_URL_BASE}/books?${params.toString()}`;

        return await fetchAPI(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
    }


    static async getById(id: number) {
        return await fetchAPI(API_URL_BASE + '/books/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(book: Partial<Book>) {
        return await fetchAPI(API_URL_BASE + '/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book),
            credentials: 'include'
        })
    }

    static async update(id: number, book: Partial<Book>) {
        return await fetchAPI(API_URL_BASE + '/books/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book),
            credentials: 'include'
        })
    }

    static async delete(id: number) {
        return await fetchAPI(API_URL_BASE + '/books/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getByCategoryId(categoryId: number) {
        return await fetchAPI(API_URL_BASE + `/books?idCategory=${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }



}