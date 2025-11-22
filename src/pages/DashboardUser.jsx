import { Link } from "react-router-dom";

export default function DashboardUser() {
    return (
        <div style={{ padding: 20 }}>
            <h2>Личный кабинет</h2>
            <Link to="/apply">Подать заявку на кредит</Link><br /><br />
            <Link to="/status">Статус последней заявки</Link>
        </div>
    );
}

// import React from "react";
// import { getApplications } from "../api/fakeApi";

// export default function DashboardUser() {
//     const applications = getApplications();

//     return (
//         <div>
//             <h2>Личный кабинет</h2>
//             <table border="1" cellPadding="5">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>ФИО</th>
//                         <th>Сумма</th>
//                         <th>Срок</th>
//                         <th>Статус</th>
//                         <th>Дата</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {applications.map(a => (
//                         <tr key={a.id}>
//                             <td>{a.id}</td>
//                             <td>{a.user}</td>
//                             <td>{a.amount}</td>
//                             <td>{a.term}</td>
//                             <td>{a.status}</td>
//                             <td>{a.date}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
