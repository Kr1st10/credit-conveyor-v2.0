import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardUser from "./pages/user/DashboardUser";
import ApplicationForm from "./pages/user/ApplicationForm";
import ApplicationStatus from "./pages/user/ApplicationStatus";
import ApplicationHistory from "./pages/user/ApplicationHistory";

// Защищенный маршрут
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/apply"
                        element={
                            <ProtectedRoute>
                                <ApplicationForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/status"
                        element={
                            <ProtectedRoute>
                                <ApplicationStatus />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <ApplicationHistory />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import DashboardUser from "./pages/user/DashboardUser";
// import ApplicationForm from "./pages/user/ApplicationForm";
// import ApplicationStatus from "./pages/user/ApplicationStatus";

// function App() {
//     return (
//         <BrowserRouter>
//             <header style={{ padding: "10px", background: "#f0f0f0" }}>
//                 <h1>Кредитный конвейер</h1>
//                 <nav>
//                     <Link to="/">Главная</Link> |{" "}
//                     <Link to="/login">Войти</Link> |{" "}
//                     <Link to="/register">Регистрация</Link>
//                 </nav>
//             </header>

//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/dashboard" element={<DashboardUser />} />
//                 <Route path="/apply" element={<ApplicationForm />} />
//                 <Route path="/status" element={<ApplicationStatus />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;
