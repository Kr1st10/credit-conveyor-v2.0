import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');

        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
    }, []);

    const login = (token, role) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/login');
    };

    return { isAuthenticated, userRole, login, logout };
}