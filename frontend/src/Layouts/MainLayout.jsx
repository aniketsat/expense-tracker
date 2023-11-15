import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "../Components/Navbar.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// eslint-disable-next-line react/prop-types
function MainLayout({ children, darkMode, toggleDarkMode }) {
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main>
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme={darkMode ? "dark" : "light"}
                />
                {children}
            </main>
        </ThemeProvider>
    );
}

export default MainLayout;