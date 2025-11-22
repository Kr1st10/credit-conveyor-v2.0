import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DashboardUser from "./pages/DashboardUser";
// import ApplicationForm from "./pages/ApplicationForm";
// import ApplicationStatus from "./pages/ApplicationStatus";

// function App() {
//   return (
//     <BrowserRouter>
//       <header style={{ padding: "10px", background: "#f0f0f0" }}>
//         <h1>Кредитный конвейер</h1>
//         <nav>
//           <Link to="/">Главная</Link> |{" "}
//           <Link to="/login">Войти</Link> |{" "}
//           <Link to="/register">Регистрация</Link> |{" "}
//           <Link to="/dashboard">Кабинет</Link>
//         </nav>
//       </header>

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<DashboardUser />} />
//         <Route path="/apply" element={<ApplicationForm />} />
//         <Route path="/status" element={<ApplicationStatus />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
