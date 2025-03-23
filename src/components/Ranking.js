import * as React from 'react';
import { Box, CircularProgress, Paper, Typography, Button, Divider, Grid } from '@mui/material';
import PaperHeader from './PaperHeader';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getAll, getBaldus, getHome, getPoints, getPowerCombat, getResets } from 'services/rankingService';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLayout } from 'providers/LayoutProvider';
import { URL } from 'config/CONSTANTS';
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from 'zod';
import FormSelect from "components/Form/FormSelect";
import { zodResolver } from '@hookform/resolvers/zod';
import { getClassSingle } from 'services/characterService';
import Lottie from "react-lottie";
import * as rankingAnimation from 'assets/ranking.json';
import * as rankingAnimation2 from 'assets/ranking2.json';
import * as rankingAnimation3 from 'assets/ranking3.json';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const handleOnSubmit = (fromBody) => {
    //fromBody.class
};


export default function Ranking(props) {


    const defaultAnimation = {
        loop: true,
        autoplay: true,
        animationData: rankingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const defaultAnimation2 = {
        loop: true,
        autoplay: true,
        animationData: rankingAnimation2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    const defaultAnimation3 = {
        loop: true,
        autoplay: true,
        animationData: rankingAnimation3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    const [loading, setLoading] = React.useState(true);
    const [rankings, setRankings] = React.useState(null);
    const [rankingPoints, setRankingPoints] = React.useState(null);
    const [rankingResets, setRankingResets] = React.useState(null);
    const [rankingBaldus, setRankingBaldus] = React.useState(null);
    const [rankingCombatPower, setRankingCombatPower] = React.useState(null);
    const [tops, setTops] = React.useState([]);
    const [valueTab, setValueTab] = React.useState(0);
    const [topChar, setTopChar] = React.useState(null);

    const { mobile, getStringLanguage } = useLayout();

    const handleChange = (event, newValue) => {
        setValue("class", 0);
        setValue("nation", 0);
        setValueTab(newValue);
    };


    React.useEffect(() => {
        var tops = [];
        setLoading(true);
        getAll()
            .then((resAll) => {
                setRankings(resAll);
                getPoints(0, 0)
                    .then((res) => {
                        setRankingPoints(res.warPoints);
                        if (res.warPoints[0]) {
                            tops.push({ type: 1, data: res.warPoints[0], title: 'TOP #1 TG', animation: defaultAnimation3 });
                        }

                        getPowerCombat(0, 0)
                            .then((res) => {
                                if (res.warPoints[0]) {
                                    tops.push({ type: 1, data: res.warPoints[0], title: 'TOP #1 COMBAT POWER', animation: defaultAnimation2 });
                                }
                                tops.push({ type: 2, data: resAll.guild[0], title: 'TOP #1 GUILD', animation: defaultAnimation });
                                setTops(tops);
                                setRankingCombatPower(res.warPoints);
                                setLoading(false)
                            })
                            .catch((err) => {

                            });

                    })
                    .catch((err) => {

                    });
            })
            .catch((err) => {

            });
    }, [])


    const classOptions = [
        { value: '0', label: getStringLanguage("Todos") },
        { value: '1', label: getStringLanguage("Guerreiro (GU)") },
        { value: '2', label: getStringLanguage("Duelista (DU)") },
        { value: '3', label: getStringLanguage("Mago (MA)") },
        { value: '4', label: getStringLanguage("Arqueiro Arcano (AA)") },
        { value: '5', label: getStringLanguage("Guardião Arcano (GA)") },
        { value: '6', label: getStringLanguage("Espadachim Arcano (EA)") },
        { value: '7', label: getStringLanguage("Gladiador (GL)") },
        { value: '8', label: getStringLanguage("Atirador Arcano (AT)") },
        { value: '9', label: getStringLanguage("Mago Negro (MN)") },
    ]

    const nationOptions = [
        { value: '0', label: getStringLanguage("Todos") },
        { value: '1', label: "Capella" },
        { value: '2', label: "Procyon" }
    ]


    const {
        control,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
        getValues,
        setValue
    } = useForm({
        resolver: zodResolver(),

    });

    const handleChangeForm = (event) => {
        console.log(getValues('class'), getValues('nation'))
        setLoading(true);


        if (valueTab == 0) {
            getPowerCombat(getValues('class'), getValues('nation'))
                .then((res) => {
                    setRankingCombatPower(res.warPoints);
                    setLoading(false)
                })
                .catch((err) => {

                });
        }

        if (valueTab == 1) {
            getPoints(getValues('class'), getValues('nation'))
                .then((res) => {
                    setRankingPoints(res.baldus);
                    setLoading(false)
                })
                .catch((err) => {

                });
        }

    };

    function createData(name, min, max) {
        return { name, min, max };
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
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer'
        },

        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const getGuildIcon = (no) => {
        return <img height="16"
            src={URL + '/images/guilds/' + no + '.png'} />
    }

    return (
        <Box className="flex_col" sx={{ height: '100%' }} >
            {!loading ? <Box>

                <Box sx={{ width: '100%' }}>

                    <Box className="flex_row align_center" sx={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'space-between'
                    }} >

                        <Box className="flex_col " sx={{ height: '100%', flex: 1, paddingRight: '80px' }}>
                            <PaperHeader sx={{
                                width: '100%'
                            }} icon={<EmojiEventsIcon color="primary" fontSize="large" />}
                                title="Rankings" subtitle="Confira os TOP Liberty" />
                        </Box>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example" centered>
                                <Tab label={<b>{(getStringLanguage("COMBAT POWER"))}</b>} {...a11yProps(0)} />
                                <Tab label={<b>{getStringLanguage("GUERRA")}</b>} {...a11yProps(1)} />
                                <Tab label={<b>GUILDS</b>} {...a11yProps(2)} />
                                <Tab label={<b>ALZS</b>} {...a11yProps(3)} />
                                <Tab label={<b>{getStringLanguage("PC")}</b>} {...a11yProps(4)} />
                                <Tab label={<b>COMBOS</b>} {...a11yProps(5)} />
                            </Tabs>
                        </Box>
                    </Box>

                    <Paper sx={{ marginY: 4 }}>

                        {valueTab <= 1 && <Box padding={mobile ? 0 : '24px'}>
                            <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                                <Grid container spacing={1} alignItems={"center"}>
                                    <Grid item xs={12} sm={12} md={12} container>
                                        <Typography variant="h8" gutterBottom>
                                            <b>{getStringLanguage('Filtrar')}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <FormSelect defaultValue={0} options={classOptions} control={control} rules={{ required: true }} errors={errors}
                                            handleChange={handleChangeForm} name="class" label="Classe" />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <FormSelect defaultValue={0} options={nationOptions} control={control} rules={{ required: true }} errors={errors} handleChange={handleChangeForm}
                                            name="nation" label="Nação" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>}

                        <CustomTabPanel value={valueTab} index={0}>
                            <Box sx={{ overflow: "auto" }}>
                                <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: 512 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">TOP</StyledTableCell>
                                                    <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                                    <StyledTableCell align="center" >{getStringLanguage("CLASSE")}</StyledTableCell>
                                                    <StyledTableCell align="center" >{getStringLanguage("NAÇÃO")}</StyledTableCell>
                                                    <StyledTableCell align="center">{getStringLanguage("PODER")}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rankingCombatPower.map((row, i) => (
                                                    <StyledTableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {"#" + (i + 1)}
                                                        </StyledTableCell>
                                                        <StyledTableCell >
                                                            <span className="flex_row align_center">
                                                                {row.characterName}
                                                            </span>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            <img width="32" height="32" src={require('assets/' + getClassSingle(row.classId) + '.png')} />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            <img width="32" src={require('assets/' + (row.nation) + '.png')} />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.countSum.toLocaleString('pt-BR')}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={valueTab} index={1}>
                            <Box sx={{ overflow: "auto" }}>
                                <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: 512 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">TOP</StyledTableCell>
                                                    <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                                    <StyledTableCell align="center" >{getStringLanguage("CLASSE")}</StyledTableCell>
                                                    <StyledTableCell align="center" >{getStringLanguage("NAÇÃO")}</StyledTableCell>
                                                    <StyledTableCell align="center">{getStringLanguage("PONTOS")}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rankingPoints.map((row, i) => (
                                                    <StyledTableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {"#" + (i + 1)}
                                                        </StyledTableCell>
                                                        <StyledTableCell >
                                                            <span className="flex_row align_center">
                                                                {row.characterName}
                                                            </span>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            <img width="32" height="32" src={require('assets/' + getClassSingle(row.classId) + '.png')} />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            <img width="32" src={require('assets/' + (row.nation) + '.png')} />
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.countSum.toLocaleString('pt-BR')}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={valueTab} index={2}>
                            <Box sx={{ overflow: "auto" }}>
                                <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: 512 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">TOP</StyledTableCell>
                                                    <StyledTableCell >GUILD</StyledTableCell>
                                                    <StyledTableCell align="center">{getStringLanguage("PONTOS")}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rankings.guild.map((row, i) => (
                                                    <StyledTableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {"#" + (i + 1)}
                                                        </StyledTableCell>
                                                        <StyledTableCell >
                                                            <span className="flex_row align_center">
                                                                {getGuildIcon(row.guildNo)}
                                                                <Box ml={2}>{row.guildName}</Box>
                                                            </span>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.point.toLocaleString('pt-BR')}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={valueTab} index={3}>
                            <Box sx={{ overflow: "auto" }}>
                                <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: 512 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">TOP</StyledTableCell>
                                                    <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                                    <StyledTableCell align="center">ALZS</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rankings.alz.map((row, i) => (
                                                    <StyledTableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {"#" + (i + 1)}
                                                        </StyledTableCell>
                                                        <StyledTableCell >
                                                            <span className="flex_row align_center">
                                                                {row.name}
                                                            </span>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.alz.toLocaleString('pt-BR')}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={valueTab} index={4}>
                            <Box sx={{ overflow: "auto" }}>
                                <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: 512 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">TOP</StyledTableCell>
                                                    <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                                    <StyledTableCell align="center">{getStringLanguage("PONTOS")}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rankings.pcPoints.map((row, i) => (
                                                    <StyledTableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {"#" + (i + 1)}
                                                        </StyledTableCell>
                                                        <StyledTableCell >
                                                            <span className="flex_row align_center">
                                                                {row.characterName}
                                                            </span>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.count.toLocaleString('pt-BR')}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={valueTab} index={5}>
                            <Box sx={{ overflow: "auto" }}>
                                <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                    <TableContainer sx={{ maxHeight: 512 }}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">TOP</StyledTableCell>
                                                    <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                                    <StyledTableCell align="center">COMBOS</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rankings.combo.map((row, i) => (
                                                    <StyledTableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell align="center" component="th" scope="row">
                                                            {"#" + (i + 1)}
                                                        </StyledTableCell>
                                                        <StyledTableCell >
                                                            <span className="flex_row align_center">
                                                                {row.name}
                                                            </span>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.cntcombo}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                        </CustomTabPanel>
                    </Paper>

                </Box>

            </Box> : <Box className="flex_col align_center">
                <CircularProgress />
            </Box>}
        </Box>
    );
}