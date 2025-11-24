import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminMenu = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') return null;

    return (
        <>
            <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>
                Админ панель
            </Button>
            <Button color="inherit" onClick={() => navigate('/admin/applications')}>
                Заявки
            </Button>
            <Button color="inherit" onClick={() => navigate('/admin/users')}>
                Пользователи
            </Button>
            {userRole === 'SUPER_ADMIN' && (
                <Button color="inherit" onClick={() => navigate('/super-admin')}>
                    Супер-админ
                </Button>
            )}
        </>
    );
};

export default function Header() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Кредитный конвейер
                </Typography>

                <AdminMenu />

                <Box>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Выход
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Войти
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Регистрация
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}