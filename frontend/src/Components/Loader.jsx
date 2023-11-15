import { Box, CircularProgress } from '@mui/material';

function Loader() {
    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999
        }}>
            <CircularProgress size={100} />
        </Box>
    );
}

export default Loader;