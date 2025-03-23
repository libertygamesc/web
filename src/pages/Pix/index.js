
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Divider, Grid, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Banner from "components/Banner";
import PaperHeader from "components/PaperHeader";
import { ERROR_COLOR } from 'config/CONSTANTS';
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDonate, getDonates, getKitDonates, requestDonate } from "services/cashService";
import PIX from "react-qrcode-pix";


function Pix() {

  const navigate = useNavigate();

  useEffect(() => { }, [])

  const { user } = useAuth();
  const [selectedDonate, setSelectedDonate] = useState(10);
  const [donates, setDonates] = useState([]);
  const [kitDonates, setKitDonates] = useState([]);
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, language, getStringLanguage } = useLayout();
  const [fullPIX, setFullPIX] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [minimalPIX, setMinimalPIX] = useState("");

  const donatesLabel = [
    "Basic I", "Basic II", "Essencial I", "Essencial II", "Full I", "Full II", "Supreme"
  ]

  const [anchorEl, setAnchorEl] = useState(null);
  const openAccMenu = Boolean(anchorEl);
  const handleClickAccMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccMenu = (event) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;

    if (myValue == "logout") {

    }
    if (myValue == "password") {

    }
  };

  useEffect(() => {
    setLoading(true);
    initMercadoPago('APP_USR-e2c944fc-8bb6-4118-987c-e9863288405f');
    getKitDonates()
      .then((res) => {
        setKitDonates(res);
        updateDonates();
      })
      .catch((err) => {
        setKitDonates(null);
      });

  }, [])

  const updateDonates = () => {
    getDonates()
      .then((res) => {
        setDonates(res);
        setLoading(false);
      })
      .catch((err) => {
        setDonates([]);
        setLoading(false);
      });
  }

  const handleDonate = () => {
    if (selectedDonate < 10) {
      showErrorDialog(getStringLanguage("Valor inválido"), () => {
        closeErrorDialog();
      })
    } else {
      confirmDonate();
    }
  };

  const confirmDonate = (d) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja realizar a Recarga " + d.title + " no valor de " + (kitValue(d)) + "BRL ?"),
      () => {
        setLoading(true);
        requestDonate({ kit: d.id, attachment: "", preferenceId: language == 0 ? 'mercadopago' : null })
          .then((res) => {
            updateDonates();
            setLoading(false);
            closeSuccessDialog();
            setSelectedPayment(res);
            // setFullPIX(parseFloat(selectedDonate));
            setOpenDialog(true);
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

  const cancelPix = () => {
    setOpenDialog(false);
  }

  const copyPix = (event) => {
    navigator.clipboard.writeText(minimalPIX)
    // setOpenSnack(true)
  }

  const dialogPayment = (donate) => {
    if (donate.status == 0) {
      if (language == 0 && donate.preferenceId == null && user.isAdm != 1) {
        showErrorDialog("Pagamento inválido, crie um novo pagamento.", () => {
          closeErrorDialog();
        })
      } else {
        setSelectedPayment(donate)
        setOpenDialog(true);
      }
    }
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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const openUrl = (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  const closeDialog = () => {
    setOpenDialog(false);
  }

  const deleteDonation = (donate) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja excluir esta Recarga pendente?"),
      () => {
        setLoading(true);
        deleteDonate(donate.id)
          .then((res) => {
            updateDonates();
            setLoading(false);
            showSuccessDialog(getStringLanguage("Recarga pendente deletada"), () => {
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

  const kitValue = (d) => {
    return (d.discount != null ? (d.value * (1 - (d.discount / 100))) : d.value)
  }



  return (
    <>{user &&

      <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

        {<Banner image={require("assets/donation.jpg")} height={'640px'}
          position={mobile ? 'center' : "100% 40%"} title={"DONATE"} />}

        <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
          <Box sx={{ width: '100%' }} marginY={2}>
            <PaperHeader icon={<AddReactionIcon color="primary" fontSize="large" />}
              title={getStringLanguage("Recarga")} />
            <Box marginY={4}>
              <Box className="flex_col">
                <Typography variant="subtitle2" sx={{ lineHeight: "18px" }}>
                  {getStringLanguage("Faça uma Recarga e ajude a manter nosso servidor sempre on-line")}<br />
                  {getStringLanguage("Escolha o valor e confira a recompensa da Recarga")}<br />
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box marginY={2}>
            <Grid container spacing={6} alignItems={"center"}>
              {kitDonates.map((d, i) => (<Grid item xs={12} sm={12} md={4}>
                <Paper className="cardDonate" sx={{ borderRadius: 6 }}>
                  <Box padding="15px" sx={{ backgroundColor: '#070d1b', borderRadius: 6 }}>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid item xs={6} sm={6} md={12}>
                        <Box sx={{
                          height: 360, backgroundImage: 'url(' + require("assets/d_" + d.id + ".png") + ')',
                          backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: i < 2 ? 'auto' : 'contain'
                        }}>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={6} md={12}>
                        <Box sx={{ padding: "15px" }}>
                          <Divider><Typography mb={2} variant="h10" sx={{ lineHeight: "15px" }}>
                            <b>{d.title}</b>
                          </Typography></Divider>
                          <Grid container spacing={1} alignItems={"center"}>
                            <Grid item xs={6} sm={6} md={6}>
                              <Box sx={{ padding: "8px", width: "100%" }} className="flex_row align_center justify_center">
                                <img height="24" src={require('assets/diamond.png')} />
                                <Typography marginLeft={.5} marginRight={1} color={"white"} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                  {d.cash == null ? (getStringLanguage("Carregando") + "...") : ((d.cash).toLocaleString('pt-BR'))}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Box sx={{ padding: "8px", width: "100%" }} className="flex_row align_center justify_center">
                                <img height="24" src={require('assets/coin.png')} />
                                <Typography color={"white"} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                  {d.cashBonus == null ? (getStringLanguage("Carregando") + "...") : ((d.cashBonus).toLocaleString('pt-BR'))}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Box sx={{ padding: "8px", width: "100%" }} className="flex_row align_center justify_center">
                                 <Typography marginLeft={.5} marginRight={1} color={"white"} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                  {d.shard == null ? (getStringLanguage("Carregando") + "...") : (d.shard)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                              <Box sx={{ padding: "8px", width: "100%" }} className="flex_row align_center justify_center">
                                <img height="24" src={require('assets/spin.png')} />
                                <Typography marginLeft={.5} marginRight={1} color={"white"} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                  {d.spin == null ? (getStringLanguage("Carregando") + "...") : (d.spin)}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                          <Divider />

                          <Box className="flex_row justify_center" sx={{ width: "100%", alignItems: "flex-end", textAlign: "center", padding: "15px" }}>
                            <Box className="flex_col justify_center" mr={1}>
                              <Typography variant="h10" color={"lightgray"} sx={{ lineHeight: "18px" }}>
                                {d.value + "BRL"}
                              </Typography>
                              {d.discount > 0 && <Typography variant="h10" color={ERROR_COLOR} sx={{ lineHeight: "18px" }}>
                                {"-" + d.discount + "%OFF"}
                              </Typography>}
                            </Box>
                            <Typography variant="h3" sx={{ lineHeight: "48px" }}>
                              <b>{kitValue(d) + "BRL"}</b>
                            </Typography>

                          </Box>
                          <Divider />
                          <Button sx={{ marginTop: 2 }} fullWidth variant="contained" onClick={() => { confirmDonate(d) }}>{getStringLanguage("DOAR")}</Button>
                        </Box>

                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>))}
            </Grid>
          </Box>

          {/*<Box marginY={2}>
            <Grid container spacing={1} alignItems={"center"}>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  value={selectedDonate}
                  label={getStringLanguage("Valor R$")}
                  onChange={event => setSelectedDonate(event.target.value)}
                  autoFocus={true}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} container>
                <Typography variant="h8" gutterBottom>
                  {getStringLanguage("Total de cash recebidos: ")}<b>{((selectedDonate) * 15000).toLocaleString('pt-BR')} cash </b><br />
                  {<div><b>+{((selectedDonate) * 40000).toLocaleString('pt-BR')} cash bonus </b></div>}
                  {<div><b>+{((selectedDonate) * 5).toLocaleString('pt-BR')} Frag War </b></div>}
                  {getStringLanguage("Promoção Dia dos Pais até 11/08 00:00h")}<b>+{((selectedDonate) * 15000).toLocaleString('pt-BR')} cash </b><br />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} gutterBottom></Grid>
              <Grid item xs={9} sm={9} md={9}></Grid>
              <Grid item xs={3} sm={3} md={3} container>
                <Button fullWidth variant="contained" onClick={() => { handleDonate() }}>{getStringLanguage("DOAR")}</Button>
              </Grid>
            </Grid>
          </Box>*/}

          <Box sx={{ width: '100%' }} marginY={8}>
            <PaperHeader icon={<AddReactionIcon color="primary" fontSize="large" />}
              title={getStringLanguage("HISTÓRICO DE RECARGAS")} />
            <Box sx={{ width: '100%' }} marginY={2}>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    {!mobile && <StyledTableCell align="center">ID</StyledTableCell>}
                    <StyledTableCell >{getStringLanguage('Recarga')}</StyledTableCell>
                    <StyledTableCell >STATUS</StyledTableCell>
                    <StyledTableCell >TIPO</StyledTableCell>
                    <StyledTableCell align="center">{getStringLanguage('DATA')}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {donates.map((row, i) => (
                    <StyledTableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      {!mobile && <StyledTableCell align="center" component="th" scope="row">
                        {(i + 1)}
                      </StyledTableCell>}
                      <StyledTableCell >
                        <span className="flex_row align_center">
                          {row.kit ? (kitDonates[row.kit - 1].title + "-" + row.cash + "BRL") : ("CUSTOM-" + row.cash + "BRL")}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell >
                        {row.status == 0 ? getStringLanguage('PENDENTE') : getStringLanguage('FINALIZADO')}
                      </StyledTableCell>
                      <StyledTableCell >
                        {row.giftDonate == 1 ? getStringLanguage('BÔNUS') : getStringLanguage('NORMAL')}
                      </StyledTableCell>
                      <StyledTableCell align="center">{(new Date(row.date)).toLocaleString()}</StyledTableCell>

                      <StyledTableCell align="center">
                        {row.status == 0 && <Box>
                          {!mobile && <Tooltip title={getStringLanguage('Excluir')}>
                            <IconButton sx={{ marginRight: 2 }} color="inherit"
                              onClick={() => { deleteDonation(row) }}>
                              <DeleteIcon color="action" />
                            </IconButton>
                          </Tooltip>}
                          <Tooltip title={getStringLanguage('Confirmar')}>
                            <IconButton color="inherit"
                              onClick={() => { dialogPayment(row) }}>
                              <CheckIcon color="action" />
                            </IconButton>
                          </Tooltip>
                        </Box>}
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}

                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>

        {selectedPayment != null && <Dialog
          open={openDialog}
          onClose={() => { setSelectedPayment(null) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {getStringLanguage("Confirmar Recarga")}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => { closeDialog() }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="subtitle2" sx={{ marginBottom: 2, lineHeight: "18px", color: 'white', textAlign: 'center' }}>
                {getStringLanguage("Recarga ") + kitDonates[selectedPayment.kit - 1].title}
              </Typography>

              <Typography variant="subtitle2" sx={{ marginBottom: 2, lineHeight: "18px", color: 'white', textAlign: 'center' }}>
                {getStringLanguage("Valor ") + selectedPayment.cash.toLocaleString('pt-BR') + "BRL"}
              </Typography>

              {/*language == 0 && <div id="wallet_container">
                <Wallet initialization={{ preferenceId: selectedPayment.preferenceId }}
                  customization={{ texts: { valueProp: 'smart_option' } }} />
              </div>*/}


              {language == 0 && <Box className="flex_col align_center">
                <Typography variant="subtitle2" sx={{ marginY: 2, lineHeight: "18px" }}>
                  QR CODE
                </Typography>
                <Paper>
                  <Box padding={2}>
                    <PIX
                      pixkey="31735697000172"
                      merchant="Cabal Liberty"
                      city="SP"
                      amount={selectedPayment.cash}
                      onLoad={setMinimalPIX}
                    />
                  </Box>
                </Paper>
              </Box>}

              {language == 0 && <Box marginY={2} sx={{ cursor: 'pointer' }} onClick={copyPix}>
                <Typography variant="subtitle2" sx={{ marginY: 2, lineHeight: "18px" }}>
                  CÓDIGO COPIA E COLA
                </Typography>
                <TextField
                  fullWidth
                  value={minimalPIX}
                  onClick={copyPix}
                  autoFocus={true}
                ></TextField>
                <Button sx={{marginTop: 2}} fullWidth variant="contained" color="primary" onClick={() => copyPix()}>
                  {getStringLanguage("COPIAR CÓDIGO")}
                </Button>

              </Box>}

              {language == 1 && <Box className="flex_col align_center">
                <Typography mt={4} variant="h10" sx={{ lineHeight: "15px" }}>
                  <b>Send the donation to the PAYPAL account and email <br /><b>cabalclassicbr@gmail.com</b><br /> with the amount indicated</b>
                  <br /><br /> <b>or,</b><br /><br />
                  <b> To use Western Union, contact us via discord ticket.,<br />
                    If you have any questions about donating, feel free to contact support.</b>
                </Typography>
                <Box marginY={4} className="flex_row align_center">
                  <img width="128" src={require('assets/paypal.png')} />
                  <img width="128" style={{ marginLeft: '30px' }} src={require('assets/western.png')} />
                </Box>
              </Box>}
            </DialogContentText>
          </DialogContent>
        </Dialog>
        }

      </Box >
    }</>);
}

export default Pix;
