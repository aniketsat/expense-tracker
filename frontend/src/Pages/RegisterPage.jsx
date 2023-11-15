import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useRegisterMutation } from "../store/services/authApi.js";
import { useSendOtpMutation, useVerifyOtpMutation } from "../store/services/otpApi.js";
import { toast } from "react-toastify";
import Loader from "../Components/Loader.jsx";


export default function RegisterPage() {
    const navigate = useNavigate();

    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [register, { isLoading: isRegistering }] = useRegisterMutation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [emailDisabled, setEmailDisabled] = useState(false);
    const [otpDisabled, setOtpDisabled] = useState(true);

    const sendOtpToEmail = async () => {
        if (email === '') {
            toast.error('Please enter email');
            return;
        }
        try {
            setEmailDisabled(true);
            const res = await sendOtp({email}).unwrap();
            toast.success(res?.message || 'Otp sent successfully');
            setOtpDisabled(false);
        } catch (err) {
            console.log(err);
            setEmailDisabled(false);
            setOtpDisabled(true);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }

    const verifyOtpFromEmail = async () => {
        if (otp === '') {
            toast.error('Please enter otp');
            return;
        }
        try {
            setOtpDisabled(true);
            const res = await verifyOtp({email, otp}).unwrap();
            toast.success(res?.message || 'Otp verified successfully');
            setEmailDisabled(true);
        } catch (err) {
            console.log(err);
            setOtpDisabled(false);
            setEmailDisabled(false);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || password === '') {
            toast.error('Please fill all the fields');
            return;
        }
        try {
            const res = await register({firstName, lastName, email, password}).unwrap();
            toast.success(res?.message || 'Registration successful');
            navigate('/login');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    };

    return (
        <>
            {isSendingOtp || isVerifyingOtp || isRegistering ? <Loader /> : null}
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    disabled={emailDisabled}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    sx={{ height: '100%' }}
                                    disabled={isSendingOtp || emailDisabled}
                                    onClick={sendOtpToEmail}
                                >
                                    Send Otp
                                </Button>
                            </Grid>
                            <Grid item xs={12} style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <TextField
                                    fullWidth
                                    required
                                    id="otp"
                                    type="number"
                                    label="Otp"
                                    name="otp"
                                    autoComplete="otp"
                                    disabled={otpDisabled}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    sx={{ height: '100%', px: 4 }}
                                    disabled={isVerifyingOtp || otpDisabled}
                                    onClick={verifyOtpFromEmail}
                                >
                                    Verify
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}