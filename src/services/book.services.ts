import Book from "../models/Books"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class BookService {
    static async search(title?: string) {
        let url = API_URL_BASE + '/book?'
        if (title) url += 'title=' + title

        return await fetchAPI(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getById(id: number) {
        return await fetchAPI(API_URL_BASE + '/book/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(offer: Partial<Book>) {
        return await fetchAPI(API_URL_BASE + '/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offer),
            credentials: 'include'
        })
    }

    static async update(id: number, offer: Partial<Book>) {
        return await fetchAPI(API_URL_BASE + '/book/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offer),
            credentials: 'include'
        })
    }
    static async delete(id: number) {
        return await fetchAPI(API_URL_BASE + '/book/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }



}