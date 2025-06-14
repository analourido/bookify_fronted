import { fetchAPI } from "../utils/FetchAPI";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class UserService {

    static async getAll() {
        return await fetchAPI(API_URL_BASE + "/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });
    }
    static async getProfile() {
        return await fetchAPI(API_URL_BASE + "/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

    }
    static async getById(id: number) {
        return await fetchAPI(API_URL_BASE + '/users/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getByActive(active: boolean) {
        if (active) {
            return await fetchAPI(API_URL_BASE + '/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
        }

    }

}