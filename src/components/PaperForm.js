import {
    Box,
    Paper,
    Typography,
    Divider
} from '@mui/material';

export default function PaperForm(props) {
    return (
        <Box sx={props.sx}>
            <Paper className="flex_col">
                <Box sx={{ padding: '15px' }}>
                    <Typography sx={{
                        display: 'flex', alignItems: 'center'
                    }} variant="h8">
                        <b>{props.title}</b>
                    </Typography>
                </Box>
                <Divider />
                {props.children}
            </Paper>
        </Box>
    );
}
