// src/services/statistics.service.ts
import { fetchAPI } from '../utils/FetchAPI';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class StatisticsService {
    static async getUserStatistics() {
        return await fetchAPI(`${API_URL_BASE}/statistics/user`);
    }

    static async getClubStatistics(clubId: number) {
        return await fetchAPI(`${API_URL_BASE}/statistics/clubs/${clubId}`);
    }
}
