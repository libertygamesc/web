import * as React from 'react';
import { Box, CircularProgress, Paper, ThemeProvider, Typography, createTheme, Grid, Tooltip } from '@mui/material';
import PaperHeader from './PaperHeader';
import ShieldIcon from '@mui/icons-material/Shield';
import { getDungeons, getHome } from 'services/rankingService';
import { useLayout } from 'providers/LayoutProvider';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PersonIcon from '@mui/icons-material/Person';
import TaskIcon from '@mui/icons-material/Task';

export default function Dungeons(props) {

    const [loading, setLoading] = React.useState(true);
    const [dungeons, setDungeons] = React.useState(null);
    const { mobile, getStringLanguage } = useLayout();

    const theme = createTheme({
        typography: {
            fontFamily: 'Games',
        }
    });

    const getPartyDungeon = (rows) => {
        var dungeon = { dungeounName: rows[0].dungeounName, passTime: rows[0].passTime, chars: [] }

        rows.forEach(d => {
            if (dungeon.chars.filter(c => c == d.charName) == 0) {
                dungeon.chars.push(d.charName);
            }
        });

        return dungeon;

    }

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
        reloadDungeons();
    }, [])

    const reloadDungeons = () => {
        getDungeons()
            .then((res) => {
                var pt = [];
                res.party.forEach(rows => pt.push(getPartyDungeon(rows)));
                console.log(pt);
                setDungeons({ solo: res.solo, party: pt });
                setLoading(false)
            })
            .catch((err) => {

            });
    }

    React.useEffect(() => {
        const updateDungeons = setInterval(() => {
            reloadDungeons();
        }, 5000);
        return () => clearInterval(updateDungeons);
    }, []);


    return (
        <Box marginY={2} className="flex_col" sx={{ height: '100%' }} >
            {!loading ? <Box>

                <Box marginY={4}>
                    <PaperHeader icon={<TaskIcon color="primary" fontSize="large" />}
                        title={getStringLanguage("Últimas Party Dungeons")} />

                    <Paper className="flex_col justify_center align_center text_center"
                        sx={{ width: '100%', padding: '40px', marginY: 4 }} >
                        <Box className="flex_col" sx={{ width: '100%', maxHeight: 400, overflow: 'auto' }}>
                            {dungeons.party.map((row, i) =>
                                <Box sx={{ width: '100%', marginY: 1 }} className="flex_row align_center">
                                    {row.chars.map((u, i) =>
                                        <Tooltip title={u}>
                                            <Box sx={{ cursor: 'pointer' }} marginX={1}><PersonIcon /></Box>
                                        </Tooltip>)}
                                    <Typography variant="h8">
                                        {getStringLanguage(" completou ")} <b>{row.dungeounName}</b> {getStringLanguage(" em ")} <b>{row.passTime + "m"}</b>
                                    </Typography>
                                </Box>)}
                        </Box>
                    </Paper>
                </Box>

                <Box marginY={4}>
                    <PaperHeader icon={<TaskIcon color="primary" fontSize="large" />}
                        title={getStringLanguage("Últimas Solo Dungeons")} />
                    <Paper className="flex_col justify_center align_center text_center"
                        sx={{ width: '100%', padding: '40px', marginY: 4 }} >
                        <Box className="flex_col" sx={{ width: '100%', maxHeight: 250, overflow: 'auto' }}>
                            {dungeons.solo.map((row, i) =>
                                <Box sx={{ width: '100%', marginY: 2 }} className="flex_row align_center">
                                    <PersonIcon />
                                    <Typography variant="h8">
                                        <b>{row.charName}</b> {getStringLanguage(" completou ")} <b>{row.dungeounName}</b> {getStringLanguage(" em ")} <b>{row.passTime + "m"}</b>
                                    </Typography>
                                </Box>)}
                        </Box>
                    </Paper>
                </Box>



            </Box> : <Box className="flex_col align_center">
                <CircularProgress />
            </Box>
            }
        </Box >
    );
}