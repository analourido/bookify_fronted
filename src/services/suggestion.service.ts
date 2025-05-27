import Suggestion from "../models/Suggestion"
import { fetchAPI } from "../utils/FetchAPI"

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class SuggestionService {

    static async search(title?: string) {
        let url = API_URL_BASE + '/suggestions?'
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
        return await fetchAPI(API_URL_BASE + '/suggestions/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(suggestion: Partial<Suggestion>) {
        return await fetchAPI(API_URL_BASE + '/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suggestion),
            credentials: 'include'
        })
    }

    static async update(id: number, suggestion: Partial<Suggestion>) {
        return await fetchAPI(API_URL_BASE + '/suggestions/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suggestion),
            credentials: 'include'
        })
    }

    static async delete(id: number) {
        return await fetchAPI(API_URL_BASE + '/suggestions/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getByUserId(userId: number) {
        return await fetchAPI(API_URL_BASE + `/suggestions?idUser=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

}