

import { useState } from 'react';

import { Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip, IconButton, ListItemIcon, TextField } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { CUPOM, LOGIN, REGISTER, ROOT } from "navigation/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useCash } from "providers/CashProvider";
import { useLayout } from "providers/LayoutProvider";
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LockIcon from '@mui/icons-material/Lock';
import { newPassword } from 'services/authServices';
import MenuIcon from '@mui/icons-material/Menu';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PaperHeader from "components/PaperHeader";

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

import CloseIcon from '@mui/icons-material/Close';
import { getMyCode } from 'services/accountService';
import Snackbar from '@mui/material/Snackbar';

function NavUser() {

  const theme = useTheme();
  const navigate = useNavigate();
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog,
    getStringLanguage, language, changeLanguage, setOpenMenu } = useLayout();
  const { user, menus, logout } = useAuth();
  const { cash, cashBonus, shard } = useCash();

  const [anchorEl, setAnchorEl] = useState(null);
  const openAccMenu = Boolean(anchorEl);

  const [openCupomDialog, setOpenCupomDialog] = useState(false);
  const [selectedCupomChar, setSelectedCupomChar] = useState("");


  const [openCodeDialog, setOpenCodeDialog] = useState(false);
  const [myCode, setMyCode] = useState("");
  const [openLinkSnack, setOpenLinkSnack] = useState(false);

  const handleClickAccMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getCupom = () => {
    setOpenCupomDialog(false)
    navigate(CUPOM + '/' + selectedCupomChar + '/' + user.userNum)
  };

  const openMyCode = () => {
    if (user.myCode == null || user.myCode == "") {
      setLoading(true);
      getMyCode()
        .then((res) => {
          setLoading(false);
          setMyCode(res.myCode)
          setOpenCodeDialog(true)
        })
        .catch((err) => {
          setLoading(false);
          showErrorDialog(err.message, () => {
            closeErrorDialog();
          })
        });

    } else {
      setMyCode(user.myCode)
      setOpenCodeDialog(true)
    }
  }

  const handleCloseAccMenu = (event) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;

    if (myValue == "myCode") {
      openMyCode()
    }

    if (myValue == "cupom") {
      setOpenCupomDialog(true)
    }

    if (myValue == "logout") {
      logout();
    }

    if (myValue == "password") {
      setLoading(true);
      newPassword(user.id)
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
    }
  };


  const copyCodeLink = async () => {
    try {
      await navigator.clipboard.writeText("https://libertygames.online/register/" + myCode);
      setOpenLinkSnack(true);
    } catch (err) {
    }
  }

  return (
    <Box className="flex_row justify_center"
      sx={{
        paddingX: mobile ? '15px' : '20px', height: '60px', width: '100%',
        borderBottom: '1px solid ' + theme.palette.divider, background: '#000'
      }} >





      <Box className={"flex_row align_center flex1"} >
        {(mobile || user) && <Tooltip title={"Menu"}>
          <IconButton onClick={() => { setOpenMenu(true) }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>}
        {!mobile && <Box marginLeft={2} className="flex_col justify_center" sx={{ cursor: 'pointer' }} onClick={() => { navigate(ROOT) }}>
          <img height="48" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
        </Box>}
      </Box>




      {!mobile && <Box className={"flex_row align_center"} marginRight={2}>
        <Tooltip title={getStringLanguage("Alterar linguagem")}>
          <IconButton onClick={() => { changeLanguage() }}>
            <img width="25" src={require('assets/' + (language == 0 ? 'pt' : 'en') + '.png')} />
          </IconButton>
        </Tooltip>
      </Box>}

      {
        user == null && <Box className="flex_row align_center">
          <Button variant="text" sx={{ marginRight: '15px' }} color="secondary"
            onClick={() => { navigate(LOGIN) }}><b>{getStringLanguage('ENTRAR')}</b></Button>
          <Button variant="contained"
            onClick={() => { navigate(REGISTER) }}>{getStringLanguage('REGISTRE-SE')}</Button>
        </Box>
      }

      {
        user != null && <Box className="flex_row align_center">

         
          <Typography marginLeft={.5} marginRight={1} color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
            {shard == null ? (getStringLanguage("Carregando") + "...") : (shard)}
          </Typography>
          <img height="24" src={require('assets/diamond.png')} />
          <Typography marginLeft={.5} marginRight={1} color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
            {cash == null ? (getStringLanguage("Carregando") + "...") : ((cash).toLocaleString('pt-BR'))}
          </Typography>
          <img height="24" src={require('assets/coin.png')} />
          <Typography color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
            {cashBonus == null ? (getStringLanguage("Carregando") + "...") : ((cashBonus).toLocaleString('pt-BR'))}
          </Typography>


          <Box color="inherit"
            id="acc-menu-button"
            aria-controls={openAccMenu ? 'acc-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openAccMenu ? 'true' : undefined}
            onMouseEnter={mobile ? () => { } : handleClickAccMenu}
            className="flex_row align_center"
            sx={{ marginLeft: 4 }}>
            {!mobile && <AccountCircleIcon />}
            <Typography color={theme.palette.text.primary} variant="h10" sx={{ lineHeight: "15px", marginLeft: 1 }}>
              <b>{user.userName}</b>
            </Typography>
            <IconButton color="inherit"
              id="acc-menu-button"
              aria-controls={openAccMenu ? 'acc-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAccMenu ? 'true' : undefined}
              onClick={handleClickAccMenu}>
              <ExpandMoreIcon color="action" />
            </IconButton>
          </Box>

          <Menu
            id="acc-menu"
            anchorEl={anchorEl}
            open={openAccMenu}
            onClose={handleCloseAccMenu}
            MenuListProps={{
              'aria-labelledby': 'acc-menu-button',
              onMouseLeave: handleCloseAccMenu
            }}>
            <MenuItem data-my-value={"myCode"} onClick={handleCloseAccMenu}>  <ListItemIcon>
              <MarkEmailReadIcon fontSize="small" />
            </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {getStringLanguage("Código Convite")}
              </Typography>
            </MenuItem>
            <MenuItem data-my-value={"cupom"} onClick={handleCloseAccMenu}>  <ListItemIcon>
              <ConfirmationNumberIcon fontSize="small" />
            </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {getStringLanguage("Resgatar Cupom")}
              </Typography>
            </MenuItem>
            <MenuItem data-my-value={"password"} onClick={handleCloseAccMenu}>  <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {getStringLanguage("Alterar senha")}
              </Typography>
            </MenuItem>
            <MenuItem data-my-value={"logout"} onClick={handleCloseAccMenu}>  <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {getStringLanguage("Sair")}
              </Typography></MenuItem>
          </Menu>

        </Box>
      }

      <Dialog
        open={openCupomDialog}
        onClose={() => { }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box className="flex_row align_center">
            <ConfirmationNumberIcon sx={{ marginRight: '15px' }} color="warning" />
            {getStringLanguage("Resgatar Cupom")}
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => { setOpenCupomDialog(false) }}
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
            <Box>
              {<TextField
                sx={{ width: mobile ? '100%' : 350 }}
                value={selectedCupomChar}
                label={getStringLanguage("CUPOM")}
                onChange={event => setSelectedCupomChar(event.target.value)}
                autoFocus={true}
              ></TextField>}
            </Box>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"primary"} onClick={() => { getCupom() }} autoFocus>
            {getStringLanguage("RESGATAR").toUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCodeDialog}
        onClose={() => { }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box className="flex_row align_center">
            <MarkEmailReadIcon sx={{ marginRight: '15px' }} color="warning" />
            {getStringLanguage("Código Convite")}
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => { setOpenCodeDialog(false) }}
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
            <Box className="flex_col align_center justify_center">
              <Typography variant="h10" sx={{ lineHeight: "15px" }}>
                {getStringLanguage("Seu codigo de convite é")}
              </Typography>
              <Typography my={2} variant="h3">
                <b>{myCode}</b>
              </Typography>

              <TextField
                sx={{ width: mobile ? '100%' : 350 }}
                value={"https://libertygames.online/register/" + myCode}
                label={getStringLanguage("Link")}
                disabled={true}
                autoFocus={true}
                onClick={() => copyCodeLink()}
              ></TextField>

              <Box my={2}>
                <Button variant="contained" color="primary" onClick={() => copyCodeLink()}>
                  {getStringLanguage("COPIAR LINK")}
                </Button>
              </Box>

              {openLinkSnack && <Typography variant="h10" sx={{ lineHeight: "15px" }}>
                <b>{getStringLanguage("Link copiado com sucesso")}</b>
              </Typography>}
            </Box>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"primary"} onClick={() => { setOpenCodeDialog(false) }} autoFocus>
            {getStringLanguage("FECHAR").toUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>

    </Box >
  );
}





export default NavUser;
