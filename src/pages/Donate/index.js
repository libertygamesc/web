
import { Paper, Typography, Box, Button, TextField, Grid, Divider, IconButton, Tooltip } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { useLayout } from "providers/LayoutProvider";
import { confirmDonateRequest, getDonates, deleteDonate } from "services/cashService";
import PIX from "react-qrcode-pix";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { MERCADO_PAGO } from "navigation/CONSTANTS";


function Donate() {

  const navigate = useNavigate();

  useEffect(() => { }, [])

  const { user } = useAuth();
  const [selectedDonate, setSelectedDonate] = useState(10);
  const [selectedDonateRow, setSelectedDonateRow] = useState(null);
  const [donates, setDonates] = useState([]);
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, language, getStringLanguage } = useLayout();
  const [minimalPIX, setMinimalPIX] = useState("");
  const [fullPIX, setFullPIX] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);


  useEffect(() => {
    if (user != null) {
      if (user.isAdm != 1) {
        navigate(MERCADO_PAGO);
      } else {
        updateDonates();
      }
    }
  }, [user])

  const updateDonates = () => {
    getDonates()
      .then((res) => {
        setDonates(res);
      })
      .catch((err) => {
        setDonates([]);
      });
  }

  const cancelPix = () => {
    setOpenDialog(false);
  }

  const confirmDonate = (row) => {

    showAlertDialog(getStringLanguage("Tem certeza que deseja connfirmar esta Recarga pendente, código ") + row.id,
      () => {
        setLoading(true);
        confirmDonateRequest(row.id)
          .then((res) => {
            updateDonates();
            setLoading(false);
            showSuccessDialog(getStringLanguage("Recarga confirmada"), () => {
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

  const realoadPix = (pix) => {
    if (pix.status == 0) {
      setSelectedDonateRow(pix)
      setFullPIX(parseFloat(pix.cash));
      setOpenDialog(true);
    }
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

  return (
    <>{user &&

      <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

        <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

          <Box marginY={2} className="flex_col">
            <Typography mb={2} variant="h10" sx={{ lineHeight: "15px" }}>
              <b>{getStringLanguage('HISTÓRICO DE RECARGAS')}</b>
            </Typography>
            <Table aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell >{getStringLanguage('VALOR')}</StyledTableCell>
                  <StyledTableCell >STATUS</StyledTableCell>
                  <StyledTableCell style={{ maxWidth: '150px' }}>ANEXO</StyledTableCell>
                  <StyledTableCell align="center">{getStringLanguage('DATA')}</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {donates.map((row, i) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'cursor': row.status == 0 ? 'pointer' : 'auto' }}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell >
                      <span className="flex_row align_center">
                        {getStringLanguage("R$ ") + row.cash.toLocaleString('pt-BR')}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell >
                      {row.status == 0 ? getStringLanguage('EM ANÁLISE') : getStringLanguage('FINALIZADO')}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: '150px' }} component="th" scope="row">
                      {row.attachment}
                    </StyledTableCell>
                    <StyledTableCell align="center">{(new Date(row.date)).toLocaleString()}</StyledTableCell>

                    <StyledTableCell align="center">
                      <Box  className="flex_row">
                        {!mobile && 
                        <Tooltip title={getStringLanguage('Excluir')}>
                          <IconButton sx={{ marginRight: 2 }} color="inherit"
                            onClick={() => { deleteDonation(row) }}>
                            <DeleteIcon color="action" />
                          </IconButton>
                        </Tooltip>}
                        <Box sx={{ width:50 }}>
                          {row.status == 0 && <Tooltip title={getStringLanguage('Pagamento')}>
                            <IconButton color="inherit"
                              onClick={() => { confirmDonate(row) }}>
                              <CheckIcon color="action" />
                            </IconButton>
                          </Tooltip>}
                        </Box>
                      </Box>
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

      </Box >
    }</>);
}

export default Donate;
