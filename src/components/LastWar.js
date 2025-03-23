import * as React from 'react';
import { Box, CircularProgress, Paper, ThemeProvider, Typography, createTheme, Grid } from '@mui/material';
import PaperHeader from './PaperHeader';
import ShieldIcon from '@mui/icons-material/Shield';
import { getHome } from 'services/rankingService';
import { decodificar } from 'services/characterService';
import { useLayout } from 'providers/LayoutProvider';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function LastWar(props) {

    const [loading, setLoading] = React.useState(true);
    const [rankingHome, setRankingHome] = React.useState(null);
    const { mobile, getStringLanguage } = useLayout();

    const theme = createTheme({
        typography: {
            fontFamily: 'Games',
        }
    });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    React.useEffect(() => {
        getHome()
            .then((res) => {
                setRankingHome(res);
                setLoading(false)
            })
            .catch((err) => {

            });
    }, [])

    return (
        <Box marginBottom={2} className="flex_col" sx={{ height: '100%' }} >
            {!loading ? <Box>
                <PaperHeader icon={<ShieldIcon color="primary" fontSize="large" />}
                    title={getStringLanguage("Vencedor da última Guerra")} />


                <Paper className="flex_col justify_center align_center text_center"
                    sx={{ width: '100%', padding: '40px', marginY: 4 }} >
                    <div className={'nation-icon nation-icon-' + rankingHome.nation.victoryNation}>
                        <img width="200" src={require('assets/' + rankingHome.nation.victoryNation + '.png')} />
                    </div>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3" >
                            <b>{rankingHome.nation.victoryNation == 1 ? "CAPELLA" : "PROCYON"}</b>
                        </Typography>
                    </ThemeProvider>
                    <Typography variant="h6" sx={{ lineHeight: "64px", textAlign: 'center' }}>
                        {getStringLanguage("A nação esta ganhando a") + " "}<b>{rankingHome.countWar}</b>{" " + getStringLanguage("guerras consecutivas") + "."}
                    </Typography>

                </Paper>

                <PaperHeader icon={<ShieldIcon color="primary" fontSize="large" />}
                    title={getStringLanguage("Espada Memorial")} />

                <Box className="flex_row space_between">
                    <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={12} container>
                                <Paper className="flex_col align_center text_center"
                                    sx={{ padding: '40px', flex: 1, marginY: 4, marginRight:0 }} >
                                    <div className={'nation-icon nation-icon-' + rankingHome.memorial[0].nation}>
                                        <img width="200" src={require('assets/' + rankingHome.memorial[0].nation + '.png')} />
                                    </div>
                                    <ThemeProvider theme={theme}>
                                        <Typography sx={{ textAlign: 'center' }} variant="h3" >
                                            <b>{rankingHome.memorial[0].nation == 1 ? "CAPELLA" : "PROCYON"}</b>
                                        </Typography>
                                        <Typography variant="h8" sx={{ lineHeight: "22px", textAlign: 'center' }}>
                                            {getStringLanguage("Dono da Memorial")}
                                        </Typography>
                                    </ThemeProvider>

                                    <Box sx={{ width: '100%', marginY: 2 }} className="flex_col align_center justify_center">
                                        <img width="32" height="32" src={require('assets/' + decodificar(rankingHome.memorial[0].style).classSingle + '.png')} />
                                        <Box sx={{ marginY: 2 }}>{rankingHome.memorial[0].name}</Box>
                                    </Box>
                                </Paper>
                            </Grid>
                    </Grid>
                </Box>

                <PaperHeader icon={<ShieldIcon color="primary" fontSize="large" />}
                    title={getStringLanguage("Portadores")} />


                <Box className="flex_row space_between">
                    <Grid container spacing={1}>

                        <Grid item xs={12} sm={12} md={6} container>
                            <Paper className="flex_col justify_center align_center text_center"
                                sx={{ padding: '40px', flex: 1, marginY: 4, marginRight: !mobile ? 4 : 0 }} >
                                <div className={'nation-icon nation-icon-' + rankingHome.nation.victoryNation}>
                                    <img width="200" src={require('assets/' + rankingHome.nation.victoryNation + '.png')} />
                                </div>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h3" >
                                        <b>{rankingHome.nation.victoryNation == 1 ? "CAPELLA" : "PROCYON"}</b>
                                    </Typography>
                                </ThemeProvider>
                                <Box sx={{ marginY: 2 }} className="flex_col align_center justify_center">
                                    <Typography sx={{ marginY: 2, textAlign: 'center' }} variant="h5" >
                                        <b>{getStringLanguage(rankingHome.nation.victoryNation == 1 ?
                                            "PORTADOR DA LUZ" : "GUARDIÃO DA TEMPESTADE")}</b>
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {rankingHome.portadores.map((row, i) =>
                                            <Grid item xs={6} sm={6} md={4} container>
                                                <Box sx={{ width: '100%', marginY: 2 }} className="flex_col align_center justify_center">
                                                    <img width="32" height="32" src={require('assets/' + decodificar(row.style).classSingle + '.png')} />
                                                    <Box sx={{ marginY: 2 }}>{row.name}</Box>
                                                </Box>
                                            </Grid>)}
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} container>

                            <Paper className="flex_col align_center text_center"
                                sx={{ padding: '40px', flex: 1, marginY: 4, marginLeft: !mobile ? 4 : 0 }} >
                                <div className={'nation-icon nation-icon-' + rankingHome.nationOposto}>
                                    <img width="200" src={require('assets/' + rankingHome.nationOposto + '.png')} />
                                </div>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h3" >
                                        <b>{rankingHome.nationOposto == 1 ? "CAPELLA" : "PROCYON"}</b>
                                    </Typography>
                                </ThemeProvider>
                                <Box sx={{ marginY: 2 }} className="flex_col align_center">
                                    <Typography sx={{ marginY: 2, textAlign: 'center' }} variant="h5" >
                                        <b>{getStringLanguage(rankingHome.nationOposto == 1 ?
                                            "PORTADOR DA LUZ" : "GUARDIÃO DA TEMPESTADE")}</b>
                                    </Typography>
                                    <Grid container spacing={1}>
                                        {rankingHome.portadoresOposto.map((row, i) =>
                                            <Grid item xs={6} sm={6} md={4} container>
                                                <Box sx={{ width: '100%', marginY: 2 }} className="flex_col align_center justify_center">
                                                    <img width="32" height="32" src={require('assets/' + decodificar(row.style).classSingle + '.png')} />
                                                    <Box sx={{ marginY: 2 }}>{row.name}</Box>
                                                </Box>
                                            </Grid>)}
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>



                </Box>




            </Box > : <Box className="flex_col align_center">
                <CircularProgress />
            </Box>
            }
        </Box >
    );
}