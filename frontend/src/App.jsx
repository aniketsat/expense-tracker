import MainLayout from "./Layouts/MainLayout.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import HomePage from "./Pages/HomePage.jsx";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

  return (
    <>
        <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/transactions" element={<h1>Transactions</h1>} />
                    <Route path="/accounts" element={<h1>Accounts</h1>} />
                    <Route path="/reports" element={<h1>Reports</h1>} />
                    <Route path="/budgets" element={<h1>Budgets</h1>} />
                    <Route path="/profile" element={<h1>Profile</h1>} />
                </Route>
            </Routes>
        </MainLayout>
    </>
  )
}

export default App
