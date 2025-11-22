import { useState } from "react";
import { createApplication } from "../../api/fakeApi";
import { useNavigate } from "react-router-dom";

export default function ApplicationForm() {
    const [form, setForm] = useState({ fio: "", passport: "", inn: "", sum: "", term: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        const app = await createApplication(form);
        localStorage.setItem("lastAppId", app.id);
        alert(`Заявка №${app.id} создана`);
        navigate("/status");
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Подача заявки</h2>

            {["fio", "passport", "inn", "sum", "term"].map((f) => (
                <div key={f} style={{ marginBottom: "10px" }}>
                    <input
                        name={f}
                        placeholder={f.toUpperCase()}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <button onClick={handleSubmit}>Отправить</button>
        </div>
    );

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
}

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

