export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000',
    TEST_MODE: false,
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            ME: '/auth/users/me'
        },
        APPLICATIONS: {
            CREATE: '/credit-applications/', // ← ИСПРАВИЛ НА credit-applications
            LIST: '/credit-applications/user/my-applications', // ← ИСПРАВИЛ
            DETAIL: '/credit-applications/{id}' // ← ИСПРАВИЛ
        }
    }
};