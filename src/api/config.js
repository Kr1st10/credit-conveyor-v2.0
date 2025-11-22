// Конфигурация API для FastAPI бэкенда
export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            ME: '/auth/users/me'
        },
        APPLICATIONS: {
            CREATE: '/credit_applications/',
            LIST: '/auth/credit-applications/my',
            DETAIL: '/credit_applications/{id}'
        }
    }
};