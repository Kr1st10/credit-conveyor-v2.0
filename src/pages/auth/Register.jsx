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
import { authAPI } from "../../api/realApi";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        full_name: "",
        phone_number: ""
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

        // Валидация
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

        if (!form.username.trim()) {
            setError("Имя пользователя обязательно");
            setLoading(false);
            return;
        }

        try {
            // Отправляем данные для регистрации (только нужные поля)
            const userData = {
                username: form.username,
                email: form.email,
                password: form.password,
                full_name: form.full_name,
                phone_number: form.phone_number || null // может быть пустым
            };

            console.log("📝 Регистрация:", userData);
            const response = await authAPI.register(userData);

            console.log("✅ Успешная регистрация:", response.data);

            alert("Регистрация успешна! Теперь войдите в систему.");
            navigate("/login");

        } catch (err) {
            console.error("❌ Ошибка регистрации:", err);

            const errorData = err.response?.data;

            if (errorData?.detail) {
                if (errorData.detail === "Username already registered") {
                    setError("Имя пользователя уже занято");
                } else if (errorData.detail === "Email already registered") {
                    setError("Email уже зарегистрирован");
                } else if (errorData.detail === "Phone number already registered") {
                    setError("Номер телефона уже зарегистрирован");
                } else {
                    setError(errorData.detail);
                }
            } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('Network Error')) {
                setError("Нет соединения с сервером. Проверьте, запущен ли бэкенд.");
            } else {
                setError("Ошибка регистрации. Попробуйте еще раз.");
            }
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
            <Card sx={{ maxWidth: 500, width: "100%" }}>
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
                            label="Имя пользователя *"
                            value={form.username}
                            onChange={handleChange("username")}
                            margin="normal"
                            required
                            disabled={loading}
                            helperText="Это имя вы будете использовать для входа"
                        />
                        <TextField
                            fullWidth
                            label="Email *"
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Полное имя"
                            value={form.full_name}
                            onChange={handleChange("full_name")}
                            margin="normal"
                            disabled={loading}
                            placeholder="Иванов Иван Иванович"
                        />
                        <TextField
                            fullWidth
                            label="Номер телефона"
                            value={form.phone_number}
                            onChange={handleChange("phone_number")}
                            margin="normal"
                            disabled={loading}
                            placeholder="+7 900 123-45-67"
                        />
                        <TextField
                            fullWidth
                            label="Пароль *"
                            type="password"
                            value={form.password}
                            onChange={handleChange("password")}
                            margin="normal"
                            required
                            disabled={loading}
                            helperText="Минимум 6 символов"
                        />
                        <TextField
                            fullWidth
                            label="Подтвердите пароль *"
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