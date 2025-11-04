import { ApiConfig } from '../types/api.types';

const apiConfig: ApiConfig = {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3005',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

export default apiConfig;
