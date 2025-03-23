import { Box, CircularProgress } from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import ErrorDialog from 'components/ErrorDialog';
import SuccessDialog from 'components/SuccessDialog';
import { ROOT } from 'navigation/CONSTANTS';
import React, { createContext, useContext, useEffect, useState } from 'react';


const colorContext = createContext();

export function ColorProvider({ children }) {


    const [color, setColor] = useState('light');

  

    return (
        <colorContext.Provider value={{ color, setColor }}>

            {children}


        </colorContext.Provider>
    );
}

export function useColor() {
    return useContext(colorContext);
}
