import { useState } from "react";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Box,
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        console.log("Попытка входа:", { email, password }); // Отладка

        try {
            // Временная заглушка - пока бэкенд не готов
            // TODO: Заменить на реальный вызов API
            // const response = await authAPI.login({ email, password });

            // Имитация успешного входа
            setTimeout(() => {
                console.log("Вход успешен, сохраняем токен...");

                // Сохраняем фейковый токен и роль
                localStorage.setItem("authToken", "fake-jwt-token-" + Date.now());
                localStorage.setItem("userRole", "USER");

                console.log("Токен сохранен, перенаправляем...");
                navigate("/dashboard");
            }, 1000);

        } catch (err) {
            console.error("Ошибка входа:", err);
            setError("Ошибка входа. Проверьте email и пароль.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <Card sx={{ maxWidth: 400, width: "100%" }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Вход в систему
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3 }}
                        >
                            {loading ? "Вход..." : "Войти"}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Button
                            onClick={() => navigate("/register")}
                            color="primary"
                        >
                            Нет аккаунта? Зарегистрироваться
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}