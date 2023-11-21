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
    TextField, Button,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function ProfilePage() {
    return (
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
                                <Avatar sx={{ width: 96, height: 96 }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            </Badge>
                        </Grid>
                        <Grid item xs={12} sm={8} sx={{ width: "100%" }}>
                            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                                <TextField
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                    sx={{width: "100%"}}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                    sx={{width: "100%"}}
                                />
                            </Stack>
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                sx={{ width: "100%", marginTop: "1rem" }}
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
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained">Save</Button>
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
                            id="outlined-basic"
                            label="Current Password"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            label="New Password"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
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
                        <Button variant="outlined">Cancel</Button>
                        <Button variant="contained">Save</Button>
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
    );
}

export default ProfilePage;