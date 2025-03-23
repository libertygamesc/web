import {
    Box,
    Typography,
    IconButton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

export default function PageHeader(props) {

    const navigate = useNavigate();
    return (
        <Box sx={{ padding: '0 15px 25px 0' }} className='flex_row align_center'>
            {props.backRoute &&
                <IconButton sx={{marginRight: '15px'}} onClick={() => navigate(props.backRoute)} color="inherit">
                    <ChevronLeftIcon color="primary" />
                </IconButton>}
            <Typography sx={{
                display: 'flex', alignItems: 'center'
            }} variant="h5">
                {props.title}
            </Typography>
        </Box>
    );
}
