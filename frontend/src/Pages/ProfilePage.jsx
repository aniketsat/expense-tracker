import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Badge,
    Avatar,
    IconButton,
    Stack,
    TextField,
    Button,
    InputAdornment,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Loader from "../Components/Loader.jsx";
import { toast } from "react-toastify";
import {useEffect, useState} from "react";
import { useGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation } from "../store/services/userApi.js";


function ProfilePage() {
    const { data, isLoading } = useGetProfileQuery();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(data?.user) {
            setFirstName(data?.user?.firstName);
            setLastName(data?.user?.lastName);
            setEmail(data?.user?.email);
            setUser(data?.user);
        }
    }, [data?.user]);

    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
    const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

    const handleUpdateProfile = async () => {
        try {
            const res = await updateProfile({
                firstName,
                lastName,
                email,
            }).unwrap();
            setUser(res?.user);
            setFirstName(res?.user?.firstName);
            setLastName(res?.user?.lastName);
            setEmail(res?.user?.email);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    };

    const handleCancelUpdateProfile = () => {
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setEmail(user?.email);
    };

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleUpdatePassword = async () => {
        if(newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const res = await updatePassword({
                currentPassword,
                newPassword,
            }).unwrap();
            console.log(res);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast.success("Password updated successfully!");
        } catch (error) {
            console.log(error);
            if(error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    const handleCancelUpdatePassword = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <>
            {isLoading || isUpdatingProfile || isUpdatingPassword && <Loader />}
            <Container maxWidth="md" sx={{ marginBottom: 2 }}>
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "2rem",
                        marginTop: "2rem",
                    }}
                >
                    <CardHeader
                        title="Personal info"
                        subheader="Customize how your profile information will apper to the networks."
                        sx={{padding: 0}}
                    />
                    <Divider
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: 0,
                            marginTop: "1rem",
                            width: "100%",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 2, sm: 5 }}
                        >
                            <Grid item xs={12} sm={4} sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: { sm: "center", xs: "center" },
                                justifyContent: { sm: "flex-start", xs: "center" },
                                padding: 0,
                            }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <IconButton aria-label="edit" size="small" sx={{
                                            background:"grey",
                                            "&:hover": {
                                                background: "grey",
                                            }
                                        }}>
                                            <EditIcon sx={{ width: 16, height: 16 }} />
                                        </IconButton>
                                    }
                                >
                                    <Avatar sx={{ width: 96, height: 96 }} alt={data?.user?.firstName} src={data?.user?.profilePicture} />
                                </Badge>
                            </Grid>
                            <Grid item xs={12} sm={8} sx={{ width: "100%" }}>
                                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        focused={true}
                                        defaultValue={data?.user?.firstName}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Last Name"
                                        variant="outlined"
                                        sx={{width: "100%"}}
                                        focused={true}
                                        defaultValue={data?.user?.lastName}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Stack>
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    disabled={true}
                                    sx={{ width: "100%", marginTop: "1rem" }}
                                    focused={true}
                                    defaultValue={data?.user?.email}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                    <Grid
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Button variant="outlined" onClick={handleCancelUpdateProfile}>Cancel</Button>
                            <Button variant="contained" onClick={handleUpdateProfile}>Save</Button>
                        </Stack>
                    </Grid>
                </Card>

                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "2rem",
                        marginTop: "2rem",
                    }}
                >
                    <CardHeader
                        title="Password"
                        subheader="Change your password."
                        sx={{padding: 0}}
                    />
                    <Divider
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: 0,
                            marginTop: "1rem",
                            width: "100%",
                        }}
                    >
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ width: "100%" }}
                        >
                            <TextField
                                id="currentPassword"
                                label="Current Password"
                                variant="outlined"
                                fullWidth
                                type={showCurrentPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="New Password"
                                variant="outlined"
                                fullWidth
                                type={showNewPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Stack>
                    </CardContent>
                    <Divider
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                    <Grid
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                            <Button variant="outlined" onClick={handleCancelUpdatePassword}>Cancel</Button>
                            <Button variant="contained" onClick={handleUpdatePassword}>Save</Button>
                        </Stack>
                    </Grid>
                </Card>

                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        padding: "2rem",
                        marginTop: "2rem",
                    }}
                >
                    <CardHeader
                        title="Danger zone"
                        // subheader="Change your password."
                        sx={{padding: 0}}
                    />
                    <Divider
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                    <Grid
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                        >
                                <Button variant="outlined" color="warning">Logout</Button>
                                <Button variant="contained" color="error">Delete Account</Button>
                        </Stack>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}

export default ProfilePage;