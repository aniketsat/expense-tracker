import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/features/userSlice.js";
import { useLogoutMutation } from "../store/services/authApi.js";
import Loader from "./Loader.jsx";
import {toast} from "react-toastify";

const pages = [
    {
        title: 'Home',
        href: '/',
        auth: true,
    },
    {
        title: 'Transactions',
        href: '/transactions',
        auth: true,
    },
    {
        title: 'Accounts',
        href: '/accounts',
        auth: true,
    },
    {
        title: 'Reports',
        href: '/reports',
        auth: true,
    },
    {
        title: 'Budgets',
        href: '/budgets',
        auth: true,
    },
    {
        title: 'Login',
        href: '/login',
        auth: false,
    },
    {
        title: 'Register',
        href: '/register',
        auth: false,
    }
];
const settings = [
    {
        title: 'Profile',
        href: '/profile',
    },
    {
        title: 'My account',
        href: '/account',
    },
    {
        title: 'Logout',
        href: '/logout',
    },
];

// eslint-disable-next-line react/prop-types
function Navbar({ darkMode, toggleDarkMode }) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logout());
            toast.success('Logout successful');
            navigate('/login');
        } catch (error) {
            console.log(error);
            if (error?.status === 401 || error?.status === 403) {
                dispatch(logout());
                toast.success('Logout successful');
                navigate('/login');
            } else {
                toast.error('Logout failed');
            }
        }
    };

    return (
        <>
            {logoutLoading ? <Loader /> : null}
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Expense Tracker
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu} sx={{
                                        display: user && !page.auth ? 'none' : 'block',
                                    }}>
                                        <Typography textAlign="center" component={RouterLink} to={page.href} sx={{
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                        >{page.title}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.title}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: user && !page.auth ? 'none' : 'block',
                                    }}
                                    onClick={() => {
                                        navigate(page.href);
                                        handleCloseNavMenu();
                                    }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
                                <IconButton onClick={toggleDarkMode} color="inherit">
                                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Tooltip>

                            {user && (
                                <Tooltip title="Notifications">
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                    >
                                        <Badge badgeContent={17} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            )}

                            {user && (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={user?.firstName} src={user?.profilePicture} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting.title} onClick={async () => {
                                                if (setting.title === 'Logout') {
                                                    await handleLogout();
                                                    handleCloseUserMenu();
                                                } else {
                                                    navigate(setting.href);
                                                    handleCloseUserMenu();
                                                }
                                            }}>
                                                <Typography textAlign="center" onClick={handleCloseUserMenu}>{setting.title}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default Navbar;