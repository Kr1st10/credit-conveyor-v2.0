import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');

        console.log("Проверка аутентификации:", { token, role });

        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
        setLoading(false);
    };

    const login = (token, role) => {
        console.log("Логин:", { token, role });
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const logout = () => {
        console.log("Выход из системы");
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/login');
    };

    return {
        isAuthenticated,
        userRole,
        login,
        logout,
        loading
    };
}