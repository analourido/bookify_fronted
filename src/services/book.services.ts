import Book from "../models/Books"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class BookService {
    static async search(title?: string, author?: string) {
        let url = API_URL_BASE + '/books?'
        if (title) url += 'title=' + title
        if (author) url += 'author=' + author

        return await fetchAPI(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
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