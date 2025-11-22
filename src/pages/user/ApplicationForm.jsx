import { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { applicationAPI } from '../../api/creditApi';
import { applicationValidation } from '../../utils/validation';

export default function ApplicationForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fio: '', passport: '', inn: '', sum: '', term: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setForm(prev => ({ ...prev, [field]: value }));

        // Валидация в реальном времени
        const error = applicationValidation[field](value);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(form).forEach(field => {
            const error = applicationValidation[field](form[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await applicationAPI.create({
                fullName: form.fio,
                passport: form.passport,
                inn: form.inn,
                loanAmount: parseInt(form.sum),
                loanTerm: parseInt(form.term)
            });

            localStorage.setItem('lastAppId', response.data.id);
            navigate('/status');
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
            alert('Произошла ошибка при отправке заявки');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'fio', label: 'ФИО', placeholder: 'Иванов Иван Иванович' },
        { name: 'passport', label: 'Паспорт', placeholder: '1234 567890' },
        { name: 'inn', label: 'ИНН', placeholder: '123456789012' },
        { name: 'sum', label: 'Сумма кредита (руб.)', type: 'number' },
        { name: 'term', label: 'Срок кредита (мес.)', type: 'number' }
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Подача заявки на кредит
                </Typography>

                <Box component="form" sx={{ mt: 2 }}>
                    {fields.map((field) => (
                        <TextField
                            key={field.name}
                            fullWidth
                            label={field.label}
                            value={form[field.name]}
                            onChange={handleChange(field.name)}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]}
                            placeholder={field.placeholder}
                            type={field.type || 'text'}
                            margin="normal"
                        />
                    ))}

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? 'Отправка...' : 'Отправить на проверку'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

// import { useState } from "react";
// import { createApplication } from "../../api/fakeApi";
// import { useNavigate } from "react-router-dom";

// export default function ApplicationForm() {
//     const [form, setForm] = useState({ fio: "", passport: "", inn: "", sum: "", term: "" });
//     const navigate = useNavigate();

//     function handleChange(e) {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }

//     async function handleSubmit() {
//         const app = await createApplication(form);
//         localStorage.setItem("lastAppId", app.id);
//         alert(`Заявка №${app.id} создана`);
//         navigate("/status");
//     }

//     return (
//         <div style={{ padding: 20 }}>
//             <h2>Подача заявки</h2>

//             {["fio", "passport", "inn", "sum", "term"].map((f) => (
//                 <div key={f} style={{ marginBottom: "10px" }}>
//                     <input
//                         name={f}
//                         placeholder={f.toUpperCase()}
//                         onChange={handleChange}
//                     />
//                 </div>
//             ))}

//             <button onClick={handleSubmit}>Отправить</button>
//         </div>
//     );
// }

//return <h1>Форма работает!</h1>;


// return (
//     <div style={{ padding: 20 }}>
//         <h2>Подача заявки</h2>
//         {["fio", "passport", "inn", "sum", "term"].map(f => (
//     <input key={f} name={f} placeholder={f} onChange={handleChange} /><br/>
//         ))}
//         <button onClick={handleSubmit}>Отправить</button>
//     </div>
// );

// import React, { useState } from "react";
// import { addApplication } from "../api/fakeApi";
// import { useNavigate } from "react-router-dom";

// export default function ApplicationForm() {
//     const [form, setForm] = useState({ fio: "", inn: "", passport: "", amount: "", term: "" });
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const validate = () => {
//         const errs = {};
//         if (!form.fio) errs.fio = "Введите ФИО";
//         if (!/^\d{12}$/.test(form.inn)) errs.inn = "ИНН должен содержать 12 цифр";
//         if (!/^\d{10}$/.test(form.passport)) errs.passport = "Паспорт должен содержать 10 цифр";
//         if (form.amount < 10000 || form.amount > 5000000) errs.amount = "Сумма должна быть от 10 000 до 5 000 000";
//         if (form.term < 6 || form.term > 60) errs.term = "Срок кредита от 6 до 60 месяцев";
//         setErrors(errs);
//         return Object.keys(errs).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validate()) {
//             addApplication(form);
//             alert("Заявка отправлена!");
//             navigate("/dashboard");
//         }
//     };

//     return (
//         <div>
//             <h2>Подача заявки на кредит</h2>
//             <form onSubmit={handleSubmit}>
//                 <input placeholder="ФИО" value={form.fio} onChange={e => setForm({ ...form, fio: e.target.value })} />
//                 <div style={{ color: "red" }}>{errors.fio}</div>
//                 <input placeholder="ИНН" value={form.inn} onChange={e => setForm({ ...form, inn: e.target.value })} />
//                 <div style={{ color: "red" }}>{errors.inn}</div>
//                 <input placeholder="Паспорт" value={form.passport} onChange={e => setForm({ ...form, passport: e.target.value })} />
//                 <div style={{ color: "red" }}>{errors.passport}</div>
//                 <input type="number" placeholder="Сумма кредита" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
//                 <div style={{ color: "red" }}>{errors.amount}</div>
//                 <input type="number" placeholder="Срок (мес.)" value={form.term} onChange={e => setForm({ ...form, term: e.target.value })} />
//                 <div style={{ color: "red" }}>{errors.term}</div>
//                 <button type="submit">Отправить на проверку</button>
//             </form>
//         </div>
//     );
// }

