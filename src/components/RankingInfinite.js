import * as React from 'react';
import { Box, CircularProgress, Paper, Typography, Button, Divider, Grid, Tooltip, IconButton } from '@mui/material';
import PaperHeader from './PaperHeader';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
//import { getBattle, getBellatraClan, getBellatraSolo, getLevel, getRelic, getRelicChar } from 'services/rankingService';
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
import { PRIMARY_COLOR, URL } from 'config/CONSTANTS';
import FormSelect from "components/Form/FormSelect";
import { getClassSingle } from 'services/characterService';
import Lottie from "react-lottie";
import * as rankingAnimation from 'assets/ranking.json';
import * as rankingAnimation2 from 'assets/ranking2.json';
import * as rankingAnimation3 from 'assets/ranking3.json';
import Moment from 'react-moment';
import { fontStyle } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormTextField from './Form/FormTextField';
import { useForm } from "react-hook-form";
import FormNumber from "components/Form/FormNumber";
import { literal, number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { ROOT } from 'navigation/CONSTANTS';
import { getInfiniteChar, getInfiniteLogs, getInfinites } from 'services/rankingService';
import HistoryIcon from '@mui/icons-material/History';

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


export default function RankingInfinite(props) {

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

    const [rankingLoading, setRankingLoading] = React.useState(true);
    const [rankings, setRankings] = React.useState(null);
    const [infiniteLog, setInfiniteLog] = React.useState(null);
    const [tops, setTops] = React.useState(null);
    const { mobile, getStringLanguage, setLoading, showErrorDialog, closeErrorDialog } = useLayout();
    const [charInfinite, setCharInfinite] = React.useState(null);
    const [selectedChar, setSelectedChar] = React.useState(null);

    React.useEffect(() => {
        var tops = [];
        setRankingLoading(true);
        getInfinites(0, 0, 50)
            .then((res) => {
                setRankings(res.level);
                tops = [res.level[1], res.level[0], res.level[2]];
                console.log(tops);
                setTops(tops);
                getInfiniteLogs()
                    .then((resLog) => {
                        setInfiniteLog(resLog);
                        setRankingLoading(false)
                    })
                    .catch((err) => { });
            })
            .catch((err) => { });
    }, []);

    const className = {
        "1": 'Lutador',
        "2": 'Mecânico',
        "3": 'Arqueira',
        "4": 'Pike',
        "5": 'Atalanta',
        "6": 'Cavaleiro',
        "7": 'Mago',
        "8": 'Sacerdotisa',
        "9": 'Assassina',
        "10": 'Shaman',
        "11": 'Guerreira'
    };

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
        setRankingLoading(true);
        getInfinites(getValues('class'), getValues('nation'), 50)
            .then((res) => {
                setRankings(res.level);
                setRankingLoading(false)
            })
            .catch((err) => { });
        /*getRelic(getValues('class'))
            .then((res) => {
                setRankings(res);
                setRankingLoading(false)
            })
            .catch((err) => {

            });*/
    };

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
    const handleClose = () => {
        setCharInfinite(null);
    };

    const openInfinite = (name) => {
        setLoading(true);
        getInfiniteChar(name).then((resLogs) => {

            setCharInfinite(resLogs);
            setLoading(false)


        }).catch((err) => { });
    }

    const getRelicIcon = (name) => {
        var relics = [
            { realName: 'Babel Rei', name: 'BabelRei', icon: '0', x: '41px', y: '81px' },
            { realName: 'Beast', name: 'Beast', icon: '9', x: '251px', y: '333px' },
            { realName: 'Touca Natalina', name: 'Christmas', icon: '17', x: '390px', y: '81px' },
            { realName: 'Criton', name: 'Criton', icon: '4', x: '85px', y: '208px' },
            { realName: 'Dama Flamejante', name: 'DamaFlamejante', icon: '16', x: '323px', y: '573px' },
            { realName: 'Dark Guardian', name: 'DarkGuardian', icon: '3', x: '323px', y: '81px' },
            { realName: 'Draxos', name: 'Draxos', icon: '10', x: '85px', y: '458px' },
            { realName: 'Raposa Gigante', name: 'GiantWolf', icon: '13', x: '323px', y: '458px' },
            { realName: 'Greedy', name: 'Greedy', icon: '11', x: '204px', y: '458px' },
            { realName: 'Kelvezu', name: 'Kelvezu', icon: '5', x: '204px', y: '208px' },
            { realName: 'Midranda', name: 'Midranda', icon: '14', x: '41px', y: '573px' },
            { realName: 'Yagditha', name: 'Yagditha', icon: '15', x: '130px', y: '573px' },
            { realName: 'Mokovian', name: 'Mokovian', icon: '2', x: '204px', y: '81px' },
            { realName: 'Devil Shy', name: 'Shy', icon: '7', x: '41px', y: '333px' },
            { realName: 'Smaug', name: 'Smaug', icon: '12', x: '390px', y: '333px' },
            { realName: 'Tulla', name: 'Tulla', icon: '8', x: '130px', y: '333px' },
            { realName: 'Valento Rei', name: 'ValentoRei', icon: '1', x: '130px', y: '81px' },
            { realName: 'Vulcanis', name: 'Vulcanis', icon: '6', x: '323px', y: '208px' }
        ]
        return relics.filter(r => r.name.toLowerCase() == name.toLowerCase())[0];
    }

    const relicArray = (relic) => {
        return Object.keys(relic).map((key) => [key, relic[key]]).filter(t => t[1].toLowerCase() == "true");
    }

    const validationSchemaSearch = object({
        search: string().nonempty('Campo obrigatório')
    });
    const {
        control: control2,
        formState: { errors: errorsSearch, isSubmitSuccessful: isSubmitSuccessfulSearch },
        reset: reset2,
        handleSubmit: handleSubmit2,
        getValues: getValues2
    } = useForm({
        resolver: zodResolver(validationSchemaSearch),
    });
    const handleOnSubmitSearch = (fromBody) => {
        var s = getValues2('search').toLowerCase();
        if (s != "") {
            setLoading(true);
            setLoading(true);
            getInfiniteChar(s).then((resLogs) => {
                setCharInfinite(resLogs);
                setLoading(false)
            }).catch((err) => { 
                setLoading(false);
                showErrorDialog(err.message, () => {
                    closeErrorDialog();
                })
            });
        } else {
            setLoading(false);
        }
    };

    return (
        <Box className="flex_col">
            {!rankingLoading ? <Box>
                <PaperHeader icon={<WysiwygIcon color="primary" fontSize="large" />}
                    title="Infinites" subtitle="Confira os TOP Fox World Games" />

                <Paper className="flex_col justify_center align_center text_center"
                    sx={{ width: '100%', padding: mobile ? '15px' : '40px', marginY: 4 }} >
                    <Box sx={{ width: '100%' }} className="flex_col align_center justify_center">

                        {tops != null &&
                            <Box marginY={2} className="flex_col align_center justify_center" sx={{ width: mobile ? '100%' : 768 }}>
                                <Grid container spacing={4} justifyContent={"center"}>
                                    {tops.map((t, i) => (<Grid item xs={12} sm={12} md={3}>

                                        <Box sx={{ width: '156px', height: '93px', position: 'relative' }} >

                                            <img style={{ position: 'absolute', top: '28px', left: '60px' }}
                                                width="36" height="36" src={require('assets/' + getClassSingle(t.classId) + '.png')} />
                                            <div style={{ width: '156px', height: '93px', position: 'absolute' }}>
                                                <Lottie
                                                    options={i == 0 ? defaultAnimation2 : (i == 1 ? defaultAnimation : defaultAnimation3)}
                                                    height={93}
                                                    width={156}
                                                />
                                            </div>
                                        </Box>
                                        <Typography variant="h8" sx={{ lineHeight: "24px" }}>
                                            <b>{t.characterName}</b>
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ lineHeight: "18px" }}>
                                            {"TOP "} <b>{"#" + (i == 0 ? 2 : (i == 1 ? 1 : 3))}</b> {" INFINITE "}
                                        </Typography>

                                    </Grid>))}
                                </Grid>
                            </Box>}


                        {<Box sx={{ width: '100%' }}>
                            <Box mb={4} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                                <Grid container spacing={1} alignItems={"center"}>
                                    <Grid item xs={12} sm={12} md={12} container>
                                        <Typography variant="h8" gutterBottom>
                                            <b>{getStringLanguage('Filtrar')}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <FormSelect defaultValue={0} options={classOptions} control={control} rules={{ required: true }} errors={errors} handleChange={handleChangeForm} name="class" label="Classe" />
                                    </Grid>
                                    {<Grid item xs={6} sm={6} md={6}>
                                        <FormSelect defaultValue={0} options={nationOptions} control={control} rules={{ required: true }} errors={errors} handleChange={handleChangeForm} name="nation" label="Nação" />
                                    </Grid>}
                                </Grid>
                            </Box>
                        </Box>}

                        <Box sx={{ width: '100%' }}>
                            <Box className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                                <TableContainer sx={{ maxHeight: 512 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">TOP</StyledTableCell>
                                                <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                                <StyledTableCell align="center" >{getStringLanguage("CLASSE")}</StyledTableCell>
                                                <StyledTableCell align="center" >{getStringLanguage("NAÇÃO")}</StyledTableCell>
                                                <StyledTableCell align="center">{getStringLanguage("INFINITE")}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rankings.map((row, i) => (
                                                <StyledTableRow
                                                    key={row.characterName}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={e => { openInfinite(row.characterName) }}
                                                >
                                                    <StyledTableCell align="center" component="th" scope="row">
                                                        #{i + 1}
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
                                                    <StyledTableCell align="center" component="th" scope="row" >
                                                        <span className="flex_row justify_center align_center">
                                                            <img width="24" src={require('assets/infinite.png')} />
                                                            <Typography marginLeft={1} color={'white'} variant="h8" sx={{ lineHeight: "24px" }}>
                                                                {"+" + row.count.toLocaleString('pt-BR')}
                                                            </Typography>
                                                        </span>

                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>

                    </Box>
                    <Box sx={{ width: '768px' }} className={"flex_col"}>

                        <Box sx={{ margin: '45px 0' }}
                            key={3}
                            component="form" onSubmit={handleSubmit2(handleOnSubmitSearch)}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                                    <Divider sx={{ width: '100%', margin: '30px 0' }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                                    <Box marginY={2} className={"flex_col"}>
                                        <Typography marginY={2} variant="h8" gutterBottom>
                                            <b>Pesquise um personagem especifico</b>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={9}>
                                    <FormTextField control={control2} rules={{ required: true }} errors={errorsSearch} name="search"
                                        icon={<SearchIcon />} label="Nome do Char" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} container>
                                    <Button marginTop={4} fullWidth variant="contained" type="submit">PESQUISAR</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {infiniteLog != null && <Box marginY={6} sx={{ width: '100%' }}>
                       
                        <PaperHeader icon={<HistoryIcon color="primary" fontSize="large" />}
                            title={"Ultímos acontecimentos Infinite"} />
                        <Box marginY={4} className="flex_col" sx={{ width: '100%', maxHeight: 512, overflow: 'auto' }}>
                            <TableContainer sx={{ maxHeight: 512 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell >{getStringLanguage("AÇÃO")}</StyledTableCell>
                                            <StyledTableCell align="center" >{getStringLanguage("DATA")}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {infiniteLog.map((row, i) => (
                                            <StyledTableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <StyledTableCell >
                                                    {row.logValue}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    {<Moment format="DD/MM/YYYY H:mm:ss">{row.logDate}</Moment>}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>}






                </Paper>

            </Box> : <Box className="flex_col align_center">
                <CircularProgress />
            </Box>}

            {charInfinite != null && <Dialog
                open={charInfinite != null}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Box sx={{ paddingTop: '15px', paddingBottom: '25px' }} className="flex_row align_center">
                        <Box sx={{ marginRight: '15px' }} color="success">
                            <img width="32" height="32" src={require('assets/' + getClassSingle(charInfinite.char.classId) + '.png')} />
                        </Box>
                        <Box sx={{ marginRight: '15px' }} className={"flex_col flex1"}>
                            <Typography sx={{ lineHeight: "24px", fontSize: '16px' }}>
                                <b> {charInfinite.char.characterName}</b>
                            </Typography>
                            {<Typography sx={{ lineHeight: "16px", fontSize: '16px' }}>
                                {charInfinite.char.nation == 1 ? "Capella" : (charInfinite.char.nation == 2 ? "Procyon" : "Sem nação")}
                            </Typography>}
                        </Box>
                        <Box className={"flex_col flex1"}>
                            <Typography sx={{ lineHeight: "24px", fontSize: '16px' }}>
                                <b>{"INFINITE"}</b>
                            </Typography>
                            <span className="flex_row align_center">
                                <img height="16" src={require('assets/infinite.png')} />
                                <Typography marginLeft={1} color={'white'} variant="h8" sx={{ lineHeight: "16px", fontSize: '16px' }}>
                                    {"+" + charInfinite.char.count.toLocaleString('pt-BR')}
                                </Typography>
                            </span>

                        </Box>
                        <Box className={"flex_col flex1"}>
                            <Typography sx={{ lineHeight: "24px", fontSize: '16px' }}>
                                <b>{"DISPONÍVEL"}</b>
                            </Typography>
                            <Typography sx={{ lineHeight: "16px", fontSize: '16px' }}>
                                {charInfinite.infinites.toLocaleString('pt-BR')}
                            </Typography>

                        </Box>

                    </Box>
                </DialogTitle>
                <DialogContent sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
                    {charInfinite && charInfinite.char && <Box marginY={2} className="flex_col" sx={{ width: '468px', maxHeight: 512, overflow: 'auto' }}>
                        <TableContainer sx={{ width: '100%', maxHeight: 512 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell >{getStringLanguage("AÇÃO")}</StyledTableCell>
                                        <StyledTableCell align="center" >{getStringLanguage("DATA")}</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {charInfinite.logs.map((row, i) => (
                                        <StyledTableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <StyledTableCell >
                                                {row.logValue}
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
                                                {<Moment format="DD/MM/YYYY H:mm:ss">{row.logDate}</Moment>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>}
                    {/* {charInfinite && charInfinite.charInfinite && <Box >
                        <Grid container spacing={1} alignItems={"center"}>
                            {relicArray(charInfinite.charInfinite).map((t, i) => (<Grid item xs={12} sm={12} md={4} container>
                                <Box sx={{ textAlign: 'center', width: '100%' }}
                                    className="flex_col align_center justify_center">
                                    <Typography variant="h8" gutterBottom>
                                        <b>{t[0]}</b>
                                    </Typography>
                                    <Typography variant="h8" gutterBottom>
                                        {t[1]}
                                    </Typography>
                                </Box>
                            </Grid>))}
                        </Grid>
                    </Box>} */}
                </DialogContent>
                <DialogActions>
                    <Button size="large" onClick={handleClose} autoFocus>{getStringLanguage("FECHAR")}</Button>
                </DialogActions>
            </Dialog>}
        </Box>
    );
}