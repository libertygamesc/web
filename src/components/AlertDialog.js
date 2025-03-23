import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box } from '@mui/material';
import { useLayout } from 'providers/LayoutProvider';

export default function AlertDialog(props) {

    const { open, body } = props;
    const { getStringLanguage, language } = useLayout();


    const handleConfirm = () => {
        body.onConfirm();
    };

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
                    <ErrorOutlineIcon sx={{marginRight: '15px'}} color="warning" />
                    {getStringLanguage("Alerta")}
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                {getStringLanguage("Não")}
                </Button>
                <Button onClick={handleConfirm} autoFocus>
                {getStringLanguage("Sim")}
                </Button>
            </DialogActions>
        </Dialog>

    );
}