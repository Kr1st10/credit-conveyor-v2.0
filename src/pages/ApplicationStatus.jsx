import { useState } from "react";
import { getApplication } from "../api/fakeApi";

export default function ApplicationStatus() {
    const [app, setApp] = useState(null);

    async function loadStatus() {
        const id = localStorage.getItem("lastAppId");
        if (!id) return alert("Нет сохранённой заявки");
        const data = await getApplication(id);
        setApp(data);
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Статус заявки</h2>
            <button onClick={loadStatus}>Обновить</button>
            {app && <pre>{JSON.stringify(app, null, 2)}</pre>}
        </div>
    );
}
