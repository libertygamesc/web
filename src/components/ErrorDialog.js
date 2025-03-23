import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box } from '@mui/material';
import { useLayout } from 'providers/LayoutProvider';

export default function ErrorDialog(props) {

    const { open, body } = props;
    const { getStringLanguage, language } = useLayout();

    const handleClose = () => {
        body.onClose();
    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Box className="flex_row align_center">
                    <HighlightOffIcon sx={{marginRight: '15px'}} color="error" />
                    {getStringLanguage("Erro")}
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>

    );
}