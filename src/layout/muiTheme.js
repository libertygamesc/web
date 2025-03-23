import { PRIMARY_COLOR } from 'config/CONSTANTS';
import { common, grey } from '@mui/material/colors';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';



export const getDesignTokens = (mode, palette) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: palette.light.primary.main,
          light: palette.light.primary.light,
          dark: palette.light.primary.dark,
        },

        divider: 'rgba(0, 0, 0, 0.12)',
        text: {
          primary: '#000',
          secondary: '#000',
        },
      }
      : {
        primary: {
          main: palette.light.primary.main,
          light: palette.light.primary.light,
          dark: palette.light.primary.dark,
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        background: {
          default: '#121212',
          paper: '#121212',
        },
        text: {
          primary: '#fff',
          secondary: '#fff',
        },
      }),
  },
  typography: {
    fontFamily: [
      'Noto Sans Thai',
      'sans-serif',
    ].join(','),
    body1: {
      fontFamily: 'Noto Sans Thai, sans-serif',
    },
  }
});

export const getThemedComponents = (mode, palette) => ({
  components: {
    ...(mode === 'light'
      ? {
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: grey[800],
            },
          },
        },
        MuiLink: {
          variant: 'h3',
        },
        MuiButton: {
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
            {
              props: { variant: 'outlined' },
              style: {
                color: palette.light.primary.main,
              },
            },
            {
              props: { variant: 'primary', color: 'primary' },
              style: {
                border: '4px dashed blue',
              },
            },
            {
              props: { variant: 'text' },
              style: {
                color: palette.light.primary.main,
              },
            },
          ],
        },
        MuiList: {
          styleOverrides: {
            root: {},
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              color: common.black,
              alignItems: 'stretch',
              fontFamily:
                "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              color: common.black,
              fontFamily:
                "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: '#fff',
            },
          },
        }
      }
      : {
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: '#121212',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
            },
          },
        },
        MuiButton: {
          variants: [
            {
              props: { variant: 'contained' },
              style: {
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
            {
              props: { variant: 'outlined' },
              style: {
                color: palette.light.primary.main,
              },
            },
            {
              props: { variant: 'primary', color: 'primary' },
              style: {
                border: '4px dashed blue',
              },
            },
            {
              props: { variant: 'text' },
              style: {
                color: '#fff',
              },
            },
          ],
        },
      }),
  },
});

export const createClassicTheme = (mode, palette) => {
  return createTheme(deepmerge(getDesignTokens(mode, palette), getThemedComponents(mode)));
}



// const global = {
//   textRight: {
//     textAlign: "right",
//   },
//   mygrey: "rgba(0, 0, 0, 0.5)",
// };

// export const dark = () => (createTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       main: PRIMARY_COLOR,
//     },
//     secondary: {
//       main: SECONDARY_COLOR,
//     },
//   },
//   typography: {
//     button: {
//     },
//   },
//   background: {
//     default: deepOrange[900],
//   },
// }))

// export const light = () => (createTheme({
//   palette: {
//     type: 'light',
//     primary: {
//       main: PRIMARY_COLOR,
//     },
//     secondary: {
//       main: SECONDARY_COLOR,
//     },
//     background: {
//       default: deepOrange[900],
//     },
//   }
// }))
