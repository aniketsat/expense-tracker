import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "../Components/Navbar.jsx";


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
                {children}
            </main>
        </ThemeProvider>
    );
}

export default MainLayout;