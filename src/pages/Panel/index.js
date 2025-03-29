
import { Paper, Typography, Box, Button, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import FormTextField from "components/Form/FormTextField";
import { useForm } from "react-hook-form";
import { literal, number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useLayout } from "providers/LayoutProvider";
import { useAuth } from "providers/AuthProvider";
import { useEffect, useState } from "react";
import { useCash } from "providers/CashProvider";
import RedeemIcon from '@mui/icons-material/Redeem';
import FormSelect from "components/Form/FormSelect";
import { getKit } from "services/kitService";
import PaperHeader from "components/PaperHeader";
import Banner from "components/Banner";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getClassSingle } from "services/characterService";
import { banAccount, getBanneds, getLogs, getNews, getOnlines, getSearch, mailGM, sendItem, unBanAccount } from "services/panelService";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HistoryIcon from '@mui/icons-material/History';

import BlockIcon from '@mui/icons-material/Block';

import EmailIcon from '@mui/icons-material/Email';

import SearchIcon from '@mui/icons-material/Search';

import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';

function Panel() {

  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog, getStringLanguage, showAlertDialog, closeAlertDialog } = useLayout();
  const [playersOnline, setPlayerOnlines] = useState([]);
  const [banneds, setBanneds] = useState([]);
  const [accountsPanel, setAccountsPanel] = useState(null);

  const [logs, setLogs] = useState([]);
  const [news, setNews] = useState([]);



  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { setUser } = useAuth();
  const { updateCash } = useCash();

  const [openMailDialog, setOpenMailDialog] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);

  const navigate = useNavigate();

  const banOptions = [
    { value: '1', label: "1 dia" },
    { value: '3', label: "3 dias" },
    { value: '5', label: "5 dias" },
    { value: '10', label: "10 dias" },
    { value: '15', label: "15 dias" },
    { value: '30', label: "1 mês" },
    { value: '60', label: "2 mêses" },
    { value: '90', label: "3 mêses" },
    { value: '180', label: "6 mêses" },
    { value: '360', label: "1 ano" },
  ]


  useEffect(() => {
    setLoading(true);
    getOnlines()
      .then((res) => {
        setPlayerOnlines(res);
        getBanneds()
          .then((resBanneds) => {
            setBanneds(resBanneds);
            setValue3("itemDuration", "0");
            setValue3("itemQty", "1");
            setLoading(false)
          })
          .catch((err) => {

          });
      })
      .catch((err) => {

      });
  }, [])


  const validationSchema = object({
    search: string()
      .nonempty(getStringLanguage('Campo obrigatória')),
  })
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });
  const handleOnSubmit = (fromBody) => {
    searchBy(fromBody.search);
  };


  const validationSchemaBan = object({
    reason: string().nonempty(getStringLanguage('Campo obrigatória')),
    days: string().nonempty(getStringLanguage('Campo obrigatória')),
  })
  const {
    control: control1,
    formState: { errors: errorsBan, isSubmitSuccessful: isSubmitSuccessfulBan },
    reset: reset1,
    handleSubmit: handleSubmit1,
  } = useForm({
    resolver: zodResolver(validationSchemaBan),
  });
  const handleOnSubmitBan = (fromBody) => {
    setLoading(true);
    var body = { userNum: selectedAccount.userNum, reason: fromBody.reason, days: parseInt(fromBody.days) };
    banAccount(body)
      .then((res) => {
        closeBanDialog();
        searchBy(selectedAccount.id);
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  };


  const validationSchemaMail = object({
    msg: string().nonempty(getStringLanguage('Campo obrigatória'))
  })
  const {
    control: control2,
    formState: { errors: errorsMail, isSubmitSuccessful: isSubmitSuccessfulMail },
    reset: reset2,
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver: zodResolver(validationSchemaMail),
  });
  const handleOnSubmitMail = (fromBody) => {
    setLoading(true);
    var body = { char: selectedChar.characterIdx, msg: fromBody.msg };
    mailGM(body)
      .then((res) => {
        setLoading(false);
        closeMailDialog();
        showSuccessDialog(getStringLanguage("E-mail enviado com sucesso ao jogador"), () => {
          closeSuccessDialog();
        })
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  };


  const validationSchemaSendItem = object({
    userNum: string().nonempty(getStringLanguage('Campo obrigatória')),
    itemId: string().nonempty(getStringLanguage('Campo obrigatória')),
    itemOption: string().nonempty(getStringLanguage('Campo obrigatória')),
    itemQty: string().nonempty(getStringLanguage('Campo obrigatória')),
    itemDuration: string().nonempty(getStringLanguage('Campo obrigatória'))
  })
  const {
    control: control3,
    formState: { errors: errorsSendItem, isSubmitSuccessful: isSubmitSuccessfulSendItem },
    reset: reset3,
    handleSubmit: handleSubmit3,
    setValue: setValue3
  } = useForm({
    resolver: zodResolver(validationSchemaSendItem),
  });
  const handleOnSubmitSendItem = (fromBody) => {
    setLoading(true);
    sendItem(fromBody)
      .then((res) => {
        setLoading(false);
        showSuccessDialog(res.message, () => {
          closeSuccessDialog();
        })
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });

  };

  const searchBy = (by) => {
    setLoading(true);
    getSearch(by)
      .then((res) => {
        setLoading(false);
        setAccountsPanel(res);
        if (res.length > 0) {
          setValue3("userNum", res[0].acc.userNum+"");
        }

      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  }

  const ban = (acc) => {
    setSelectedAccount(acc);
    setOpenBanDialog(true);
  }

  const closeBanDialog = () => {
    reset1();
    setSelectedAccount(null);
    setOpenBanDialog(false);
  }

  const sendMail = (char) => {
    setSelectedChar(char);
    setOpenMailDialog(true);
  }

  const closeMailDialog = () => {
    reset2();
    setSelectedChar(null);
    setOpenMailDialog(false);
  }

  const unban = (acc) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja desbanir a conta " + acc.id),
      () => {
        setLoading(true);
        unBanAccount(acc.userNum)
          .then((res) => {
            searchBy(acc.id);
            setLoading(false);
            showSuccessDialog(getStringLanguage("Conta desbanida com sucesso"), () => {
              closeSuccessDialog();
            })
          })
          .catch((err) => {
            setLoading(false);
            showErrorDialog(err.message, () => {
              closeErrorDialog();
            })
          });
        closeAlertDialog();
      },
      () => {
        closeAlertDialog();
      })
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

  const backSearch = () => {
    setAccountsPanel(null);
  }

  const generateAccDetails = (acc) => {
    return [
      { label: "Número", value: acc.userNum },
      { label: "ID", value: acc.id },
      { label: "E-mail", value: acc.email },
      { label: "Nome", value: acc.userName },
      { label: "IP", value: acc.lastIp },
      { label: "Criado em", value: acc.createDate },
      { label: "Status", value: acc.login == 1 ? "Online" : "Offline" },
      { label: "Último Login", value: acc.loginTime }
    ]
  }

  const generateCashDetails = (row) => {
    return [
      { label: "Cash", value: (row.cash.cash).toLocaleString('pt-BR') },
      { label: "Cash Bônus", value: (row.cash.cashBonus).toLocaleString('pt-BR') },
    ]
  }

  const setUserItem = (row) => {
    setValue3("userNum", row.acc.userNum+"");
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

      {<Banner image={require("assets/gm.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 25%"} title={getStringLanguage("Painel Game Master")} />}

      <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Box sx={{ width: '100%' }} marginY={2}>
          <PaperHeader icon={<AdminPanelSettingsIcon color="primary" fontSize="large" />}
            title={getStringLanguage("Painel Game Master")} />
        </Box>

        {accountsPanel == null && <Box>

          <Accordion my={2} elevation={4} sx={{ width: '100%', padding: '35px', margin: '0 auto' }} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box className="flex_row align_center jutify_end">
                <Box mr={1} className="flex_row align_center">
                  <SearchIcon></SearchIcon>
                </Box>
                <Typography variant="h8">
                  <b>{"Pesquisar"}</b>
                </Typography>
                <Divider />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box key={1} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={12} container>
                      <Typography variant="h8" gutterBottom>
                        {getStringLanguage('Pesquise por nome do personagem, id da conta, ou IP')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormTextField control={control} rules={{ required: true }} errors={errors} name="search" label={getStringLanguage("Pesquisar")} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} gutterBottom></Grid>
                    <Grid item xs={9} sm={9} md={9}></Grid>
                    <Grid item xs={3} sm={3} md={3} container>
                      <Button fullWidth variant="contained" type="submit">{getStringLanguage('PESQUISAR')}</Button>
                    </Grid>
                  </Grid>
                </Box>


              </Box>
            </AccordionDetails>
          </Accordion>


          <Accordion my={2} elevation={4} sx={{ width: '100%', padding: '35px' }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box className="flex_row align_center jutify_end">
                <Box mr={1} className="flex_row align_center">
                  <CircleIcon color="primary"></CircleIcon>
                </Box>
                <Typography variant="h8">
                  <b>{playersOnline.length + getStringLanguage(' jogadores online')}</b>
                </Typography>
                <Divider />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>

                <Box className="flex_col" sx={{ maxHeight: 450, overflow: 'auto' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                        <StyledTableCell align="center">{getStringLanguage("CANAL")}</StyledTableCell>
                        <StyledTableCell align="center" >{getStringLanguage("MAPA")}</StyledTableCell>
                        <StyledTableCell align="center" >{getStringLanguage("NAÇÃO")}</StyledTableCell>
                        <StyledTableCell align="center" >{getStringLanguage("ALZ")}</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {playersOnline.map((row, i) => (
                        <StyledTableRow
                          onClick={(event) => searchBy(row.name)}
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer'
                          }}
                        >
                          <StyledTableCell align="center" component="th" scope="row">
                            {row.characterIdx}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.channelIdx}
                          </StyledTableCell>
                          <StyledTableCell align="center" >
                            {row.worldIdx}
                          </StyledTableCell>
                          <StyledTableCell align="center" component="th" scope="row">
                            <img width="32" src={require('assets/' + (row.nation) + '.png')} />
                          </StyledTableCell>
                          <StyledTableCell align="center">{(row.alz).toLocaleString('pt-BR')}</StyledTableCell>
                        </StyledTableRow>
                      ))}

                    </TableBody>
                  </Table>
                </Box>



              </Box>
            </AccordionDetails>
          </Accordion>


          <Accordion my={2} elevation={4} sx={{ width: '100%', padding: '35px' }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >

              <Box className="flex_row align_center jutify_end">
                <Box mr={1} className="flex_row align_center">
                  <BlockIcon color="error" />
                </Box>
                <Typography variant="h8">
                  <b>{banneds.length + getStringLanguage(' contas banidas')}</b>
                </Typography>
                <Divider />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box className="flex_col" sx={{ maxHeight: 450, overflow: 'auto' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="center">{getStringLanguage("ID")}</StyledTableCell>
                        <StyledTableCell align="center">{getStringLanguage("DATA LIBERAÇÃO")}</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {banneds.map((row, i) => (
                        <StyledTableRow
                          onClick={(event) => searchBy(row.id)}
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer'
                          }}
                        >
                          <StyledTableCell align="center">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.releaseDate}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}

                    </TableBody>
                  </Table>
                </Box>


              </Box>



            </AccordionDetails>
          </Accordion>

          <Accordion my={2} elevation={4} sx={{ width: '100%', padding: '35px' }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >

              <Box className="flex_row align_center jutify_end">
                <Box mr={1} className="flex_row align_center">
                  <GroupAddIcon />
                </Box>
                <Typography variant="h8">
                  <b>{news.length + getStringLanguage(' contas criadas hoje')}</b>
                </Typography>
                <Divider />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box className="flex_col" sx={{ maxHeight: 450, overflow: 'auto' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="center">{getStringLanguage("ID")}</StyledTableCell>
                        <StyledTableCell align="center">{getStringLanguage("DATA CRIAÇÃO")}</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {news.map((row, i) => (
                        <StyledTableRow
                          onClick={(event) => searchBy(row.id)}
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer'
                          }}
                        >
                          <StyledTableCell align="center">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.createDate}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}

                    </TableBody>
                  </Table>
                </Box>


              </Box>



            </AccordionDetails>
          </Accordion>

          <Accordion my={2} elevation={4} sx={{ width: '100%', padding: '35px' }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >

              <Box className="flex_row align_center jutify_end">
                <Box mr={1} className="flex_row align_center">
                  <HistoryIcon />
                </Box>
                <Typography variant="h8">
                  <b>{logs.length + getStringLanguage(' logs registrados')}</b>
                </Typography>
                <Divider />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box className="flex_col" sx={{ maxHeight: 450, overflow: 'auto' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>{getStringLanguage("LOG")}</StyledTableCell>
                        <StyledTableCell>{getStringLanguage("DATA")}</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {logs.map((row, i) => (
                        <StyledTableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer'
                          }}
                        >
                          <StyledTableCell align="center">
                            {row.logValue}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.date}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}

                    </TableBody>
                  </Table>
                </Box>


              </Box>



            </AccordionDetails>
          </Accordion>
        </Box>}

        {accountsPanel != null &&

          <Box marginY={4} sx={{ width: "100%" }} className="flex_row justify_center">


            <Paper elevation={4} sx={{ width: '100%', padding: '35px', margin: '0 auto' }} >

              <Box sx={{ width: '100%' }}>

                <Box sx={{ width: '100%' }} mb={4} className="flex_row align_center">
                  <Tooltip title={getStringLanguage('Voltar')}>
                    <IconButton color="inherit"
                      onClick={() => { backSearch() }}>
                      <ArrowBackIcon color="action" />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h6">
                    <b>{accountsPanel.length + getStringLanguage(' conta encontrada')}</b>
                  </Typography>
                  <Divider />
                </Box>

                {accountsPanel.map((row, i) => (
                  <Accordion my={2} sx={{ width: '100%' }} defaultExpanded={i == 0} onClick={() => { setUserItem(row)}}>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>{row.acc.userNum + " - " + row.acc.id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>

                        <Box>
                          <Typography variant="h8">
                            <b>{getStringLanguage('Dados da conta')}</b>
                          </Typography>
                          <Divider />
                          <Grid mt={2} container spacing={1} alignItems={"center"}>
                            {generateAccDetails(row.acc).map((accColumn, a) => (<Grid item xs={3} sm={3} md={3}>
                              <Box sx={{ width: '100%' }} className="flex_col">
                                <Typography variant="h8">
                                  <b>{accColumn.label}</b>
                                </Typography>
                                <Typography variant="h8">
                                  {accColumn.value}
                                </Typography>
                              </Box>
                            </Grid>))}
                          </Grid>
                        </Box>

                        <Box my={4}>
                          <Typography variant="h8">
                            <b>{getStringLanguage('Recursos')}</b>
                          </Typography>
                          <Divider />
                          <Grid mt={2} container spacing={1} alignItems={"center"}>
                            {row.cash && generateCashDetails(row).map((rowColumn, a) => (<Grid item xs={3} sm={3} md={3}>
                              <Box sx={{ width: '100%' }} className="flex_col">
                                <Typography variant="h8">
                                  <b>{rowColumn.label}</b>
                                </Typography>
                                <Typography variant="h8">
                                  {rowColumn.value}
                                </Typography>
                              </Box>
                            </Grid>))}
                          </Grid>
                        </Box>

                        <Box>
                          <Box my={4}>
                            <Typography variant="h8" lineHeight={3}>
                              <b>{getStringLanguage('Personagens')}</b>
                            </Typography>
                            <Divider />
                          </Box>

                          <Box className="flex_col">
                            <Table aria-label="simple table">
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell align="center">ID</StyledTableCell>
                                  <StyledTableCell >{getStringLanguage("NOME")}</StyledTableCell>
                                  <StyledTableCell align="center">{getStringLanguage("CANAL")}</StyledTableCell>
                                  <StyledTableCell align="center" >{getStringLanguage("MAPA")}</StyledTableCell>
                                  <StyledTableCell align="center" >{getStringLanguage("NAÇÃO")}</StyledTableCell>
                                  <StyledTableCell align="center" >{getStringLanguage("ALZ")}</StyledTableCell>
                                  <StyledTableCell align="center" >{getStringLanguage("E-MAIL")}</StyledTableCell>
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                {row.chars.map((char, i) => (
                                  <StyledTableRow
                                    key={char.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <StyledTableCell align="center" component="th" scope="row">
                                      {char.characterIdx}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                      {char.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {char.channelIdx}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" >
                                      {char.worldIdx}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">
                                      <img width="32" src={require('assets/' + (char.nation) + '.png')} />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{(char.alz).toLocaleString('pt-BR')}</StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row">
                                      <Tooltip title={getStringLanguage('Enviar E-mail')}>

                                        <IconButton color="inherit"
                                          onClick={() => { sendMail(char) }}>
                                          <EmailIcon color="action" />
                                        </IconButton>
                                      </Tooltip>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}

                              </TableBody>
                            </Table>
                          </Box>

                          <Box className="flex_row align_center jutify_end" my={2}>
                            <Typography variant="h8">
                              <b>{row.chars.length + getStringLanguage(' personagens na conta')}</b>
                            </Typography>
                            <Divider />
                          </Box>

                        </Box>



                        <Box>
                          <Box my={4}>
                            <Typography variant="h8" lineHeight={3}>
                              <b>{getStringLanguage('Banimentos')}</b>
                            </Typography>
                            <Divider />
                          </Box>

                          <Box className="flex_col">
                            <Table aria-label="simple table">
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell align="center" >{getStringLanguage("ID")}</StyledTableCell>
                                  <StyledTableCell >{getStringLanguage("TIPO")}</StyledTableCell>
                                  <StyledTableCell align="center" >{getStringLanguage("DATA LIBERAÇÃO")}</StyledTableCell>
                                  <StyledTableCell >{getStringLanguage("MOTIVO")}</StyledTableCell>
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                {row.banneds.map((b, bi) => (
                                  <StyledTableRow
                                    key={bi}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <StyledTableCell align="center" >
                                      {bi + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {b.type}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {b.releaseDate}
                                    </StyledTableCell>
                                    <StyledTableCell >
                                      {b.reason}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}

                              </TableBody>
                            </Table>
                          </Box>

                          <Box className="flex_row align_center jutify_end" my={2}>
                            {row.banneds.length > 0 && <Button variant="contained" type="submit" onClick={() => { unban(row.acc) }}>{getStringLanguage('DESBANIR')}</Button>}
                            {row.banneds.length == 0 && <Button variant="contained" color="error" onClick={() => { ban(row.acc) }}>{getStringLanguage('BANIR')}</Button>}
                          </Box>

                        </Box>

                      </Box>
                    </AccordionDetails>
                  </Accordion>))}

              </Box>

            </Paper>

          </Box>}

        {<Box marginY={4} sx={{ width: "100%" }} className="flex_row justify_center">

          <Accordion my={2} elevation={4} sx={{ width: '100%', padding: '35px', margin: '0 auto' }} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box className="flex_row align_center jutify_end">
                <Box mr={1} className="flex_row align_center">
                  <SendAndArchiveIcon></SendAndArchiveIcon>
                </Box>
                <Typography variant="h8">
                  <b>{"Enviar Item"}</b>
                </Typography>
                <Divider />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box key={3} component="form" onSubmit={handleSubmit3(handleOnSubmitSendItem)}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={12} container>
                      <Typography variant="h8" gutterBottom>
                        {getStringLanguage('Envie um item para o inventario cash de um jogador.')}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <FormTextField control={control3} rules={{ required: true }} errors={errorsSendItem} name="userNum" label={getStringLanguage("User Id")} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <FormTextField control={control3} rules={{ required: true }} errors={errorsSendItem} name="itemId" label={getStringLanguage("Item Id")} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <FormTextField control={control3} rules={{ required: true }} errors={errorsSendItem} name="itemOption" label={getStringLanguage("Option")} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                      <FormTextField control={control3} rules={{ required: true }} errors={errorsSendItem} name="itemDuration" label={getStringLanguage("Duration")} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <FormTextField control={control3} rules={{ required: true }} errors={errorsSendItem} name="itemQty" label={getStringLanguage("Quantidade")} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} gutterBottom></Grid>
                    <Grid item xs={9} sm={9} md={9}></Grid>
                    <Grid item xs={3} sm={3} md={3} container>
                      <Button fullWidth variant="contained" type="submit">{getStringLanguage('ENVIAR')}</Button>
                    </Grid>
                  </Grid>
                </Box>


              </Box>
            </AccordionDetails>
          </Accordion>

        </Box>}

      </Box >

      <Dialog
        open={openBanDialog}
        onClose={() => { }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box className="flex_row align_center">
            <BlockIcon sx={{ marginRight: '15px' }} color="error" />
            {selectedAccount && (getStringLanguage("Banir ") + selectedAccount.id)}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box component="form" key={2} onSubmit={handleSubmit1(handleOnSubmitBan)}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} sm={12} md={12} container>
                  <Typography variant="h8" gutterBottom>
                    <b>{getStringLanguage('Data de liberação e descreva o motivo')}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormTextField control={control1} rules={{ required: true }} errors={errorsBan} name="reason" label={getStringLanguage("Motivo")} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormSelect defaultValue={0} options={banOptions} control={control1} rules={{ required: true }} errors={errorsBan} name="days" label="Quantidade Dias" />
                </Grid>
                <Grid item xs={6} sm={6} md={6} container justifyContent="flex-end">
                  <Button variant="text" sx={{ marginRight: '15px' }} color="secondary" onClick={() => { closeBanDialog() }}>{getStringLanguage('CANCELAR')}</Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} container>
                  <Button fullWidth variant="contained" color="error" type="submit">{getStringLanguage('BANIR')}</Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openMailDialog}
        onClose={() => { }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box className="flex_row align_center">
            <EmailIcon sx={{ marginRight: '15px' }} />
            {selectedChar && (getStringLanguage("Enviando e-mail para ") + selectedChar.name)}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box component="form" key={3} onSubmit={handleSubmit2(handleOnSubmitMail)}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} sm={12} md={12} container>
                  <Typography variant="h8" gutterBottom>
                    <b>{getStringLanguage('Escreva a mensagem para o personagem')}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormTextField control={control2} rules={{ required: true }} errors={errorsMail} name="msg" label={getStringLanguage("Mensagem")} />
                </Grid>
                <Grid item xs={6} sm={6} md={6} container justifyContent="flex-end">
                  <Button variant="text" sx={{ marginRight: '15px' }} color="secondary" onClick={() => { closeMailDialog() }}>{getStringLanguage('CANCELAR')}</Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} container>
                  <Button fullWidth variant="contained" color="primary" type="submit">{getStringLanguage('ENVIAR')}</Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>


    </Box >
  );
}

export default Panel;
