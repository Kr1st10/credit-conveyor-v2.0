import { useState } from "react";
import { login } from "../../api/fakeApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        const res = await login(email, password);
        if (res.ok) {
            navigate("/dashboard");
        } else {
            alert("Ошибка входа");
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Авторизация</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
            <input placeholder="Пароль" type="password" onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}
