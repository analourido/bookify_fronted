import Club from "../models/Club"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class ClubService {

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

}
