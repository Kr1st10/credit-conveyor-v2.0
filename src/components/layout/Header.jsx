import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Кредитный конвейер
                </Typography>

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