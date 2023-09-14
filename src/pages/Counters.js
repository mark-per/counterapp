import { Box } from '@mui/material';
import RenderCounters from '../Components/RenderCounters';

export default function Counters() {
    return (
        <Box
            sx={{
                bgcolor: '#CEDEBD',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <RenderCounters />
        </Box>
    );
}