import apiClient from './apiClient';
import { API_CONFIG } from './config';

// Функция для построения URL
const buildUrl = (endpoint, params = {}) => {
    let url = endpoint;
    Object.keys(params).forEach(key => {
        url = url.replace(`{${key}}`, params[key]);
    });
    return url;
};

// Аутентификация
export const authAPI = {
    login: async (credentials) => {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.LOGIN;
        console.log('🔐 Login URL:', url, credentials);
        return await apiClient.post(url, credentials);
    },

    register: async (userData) => {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.REGISTER;
        console.log('📝 Register URL:', url, userData);
        return await apiClient.post(url, userData);
    },

    getProfile: async () => {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.ME;
        return await apiClient.get(url);
    }
};

// Кредитные заявки
export const applicationAPI = {
    create: async (applicationData) => {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.APPLICATIONS.CREATE;
        console.log('📄 Create application URL:', url, applicationData);
        return await apiClient.post(url, applicationData);
    },

    getAll: async (filters = {}) => {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.APPLICATIONS.LIST;
        return await apiClient.get(url, { params: filters });
    },

    getMyApplications: async () => {
        const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.APPLICATIONS.LIST;
        console.log('📋 Get my applications URL:', url);
        return await apiClient.get(url);
    },

    getById: async (id) => {
        const url = API_CONFIG.BASE_URL +
            buildUrl(API_CONFIG.ENDPOINTS.APPLICATIONS.DETAIL, { id });
        return await apiClient.get(url);
    }
};