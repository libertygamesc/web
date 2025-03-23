import { Box, CircularProgress, useTheme } from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import ErrorDialog from 'components/ErrorDialog';
import SuccessDialog from 'components/SuccessDialog';
import TermsDialog from 'components/TermsDialog';
import { ROOT } from 'navigation/CONSTANTS';
import { URL } from 'config/CONSTANTS';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
var dataLanguage = require('../assets/english.json');

const layoutContext = createContext();

export function LayoutProvider({ children }) {

    const theme = useTheme();


    const [jsonLanguage, setJsonLanguage] = useState({});


    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth <= 768);

    const [language, setLanguage] = useState(localStorage.getItem("language") == null ? 0 : parseInt(localStorage.getItem("language")));

    const [termsDialogOpened, setTermsDialogOpened] = useState(false);
    const [termsDialogBody, setTermsDialogBody] = useState({ language, onClose: () => { } });

    const [successDialogOpened, setSuccessDialogOpened] = useState(false);
    const [successDialogBody, setSuccessDialogBody] = useState({ text: "", onClose: () => { } });

    const [openMenu, setOpenMenu] = useState(false);


    function handleWindowSizeChange() {
        setMobile(window.innerWidth <= 768)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);


    const showSuccessDialog = (body, onClose) => {
        setSuccessDialogBody({ text: body, onClose })
        setSuccessDialogOpened(true)
    }

    const getStringLanguage = (str) => {
        return language == 0 ? str : (dataLanguage[str] ? dataLanguage[str] : str);
    }
    const closeSuccessDialog = () => {
        setSuccessDialogOpened(false)
    }

    const changeLanguage = () => {
        if (localStorage.getItem("language") == null) {
            localStorage.setItem("language", "1");
        } else {
            localStorage.setItem("language", localStorage.getItem("language") == "1" ? "0" : "1");
        }
        setLanguage(parseInt(localStorage.getItem("language")))
    }

    const [errorDialogOpened, setErrorDialogOpened] = useState(false);
    const [errorDialogBody, setErrorDialogBody] = useState({ text: "", onClose: () => { } });

    const showErrorDialog = (body, onClose) => {
        setErrorDialogBody({ text: body, onClose })
        setErrorDialogOpened(true)
    }

    const closeErrorDialog = () => {
        setErrorDialogOpened(false)
    }

    const showTermsDialog = (language) => {
        setTermsDialogBody({ language, onClose: () => { setTermsDialogOpened(false) } })
        setTermsDialogOpened(true)
    }

    const closeTermsDialog = () => {
        setTermsDialogOpened(false)
    }

    const [alertDialogOpened, setAlertDialogOpened] = useState(false);
    const [alertDialogBody, setAlertDialogBody] = useState({ text: "", onConfirm: () => { }, onClose: () => { } });

    const showAlertDialog = (body, onConfirm, onClose) => {
        setAlertDialogBody({ text: body, onConfirm, onClose })
        setAlertDialogOpened(true)
    }

    const closeAlertDialog = () => {
        setAlertDialogOpened(false)
    }

    return (
        <layoutContext.Provider value={{
            loading, mobile, setLoading, showTermsDialog, closeTermsDialog, showSuccessDialog,
            closeSuccessDialog, showErrorDialog, closeErrorDialog, showAlertDialog, closeAlertDialog,
            setLanguage, getStringLanguage, language, changeLanguage, openMenu, setOpenMenu
        }}>

            {loading && <Box sx={{ position: 'fixed', width: "100%", height: '100%', zIndex: 9998, background: '#121212' }} />}
            {loading && <Box sx={{
                position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: "100%", height: '100%', zIndex: 9999
            }}> <CircularProgress /></Box>}

            <SuccessDialog open={successDialogOpened} body={successDialogBody} />
            <ErrorDialog open={errorDialogOpened} body={errorDialogBody} />
            <AlertDialog open={alertDialogOpened} body={alertDialogBody} />
            <TermsDialog open={termsDialogOpened} body={termsDialogBody} />
            {language != null && children}

        </layoutContext.Provider>
    );
}

export function useLayout() {
    return useContext(layoutContext);
}
