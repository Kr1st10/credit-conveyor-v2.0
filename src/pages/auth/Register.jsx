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

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Базовая валидация
        if (form.password !== form.confirmPassword) {
            setError("Пароли не совпадают");
            setLoading(false);
            return;
        }

        if (form.password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов");
            setLoading(false);
            return;
        }

        try {
            // TODO: Заменить на реальный вызов API
            // const response = await authAPI.register(form);

            // Имитация успешной регистрации
            setTimeout(() => {
                alert("Регистрация успешна! Теперь войдите в систему.");
                navigate("/login");
            }, 1000);

        } catch (err) {
            console.error("Ошибка регистрации:", err);
            setError("Ошибка регистрации. Попробуйте еще раз.");
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
                        Регистрация
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleRegister}>
                        <TextField
                            fullWidth
                            label="Имя"
                            value={form.firstName}
                            onChange={handleChange("firstName")}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Фамилия"
                            value={form.lastName}
                            onChange={handleChange("lastName")}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            type="password"
                            value={form.password}
                            onChange={handleChange("password")}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Подтвердите пароль"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange("confirmPassword")}
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
                            {loading ? "Регистрация..." : "Зарегистрироваться"}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Button
                            onClick={() => navigate("/login")}
                            color="primary"
                        >
                            Уже есть аккаунт? Войти
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}