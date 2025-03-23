import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "navigation/RouterConfig";
import { dark, light } from "layout/muiTheme";
import { AuthProvider } from "providers/AuthProvider";
import "./styles/App.css";
import "./styles/Roulette.css";
import "./styles/Banner.css";
import "./styles/Sidenav.css";
import "./styles/Spark.css";
import "./styles/Slideshow.css";
import "./styles/ScrollBar.css";
import "./styles/New.css";
import { LayoutProvider } from "providers/LayoutProvider";
import { CashProvider } from "providers/CashProvider";
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens, getThemedComponents } from 'layout/muiTheme';
import ScrollToTop from "components/ScrollToTop";
import { PRIMARY_COLOR } from "config/CONSTANTS";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


function App() {

  const [mode, setMode] = React.useState('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        var prevStorage = localStorage.getItem('colorMode') == null ? 'light' : localStorage.getItem('colorMode');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('colorMode', prevStorage === 'light' ? 'dark' : 'light')
      },
      setDark: () => {
        setMode((prevMode) => ('dark'));
      },
    }),
    [],
  );

  const pallete = {
    light: {
      primary: {
        main: PRIMARY_COLOR,
        light: PRIMARY_COLOR,
        dark: PRIMARY_COLOR,
      },
    },
  };


  const theme = React.useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode, pallete), getThemedComponents(mode, pallete))),
    [mode],
  );

  return (
    <>
      <div>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LayoutProvider>

              <CashProvider>
                <AuthProvider>
                  <BrowserRouter>
                    <ScrollToTop />
                    <RouterConfig />
                  </BrowserRouter>
                </AuthProvider>
              </CashProvider>

            </LayoutProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </div>
    </>
  );
}

export default App;
