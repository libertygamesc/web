

import { useEffect, useState } from "react";
import { PRIMARY_COLOR } from 'config/CONSTANTS';
import {
  Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip, IconButton, ListItemIcon, List,
  ListItemText,
  ListItemButton,
  ListItem
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { DOWNLOADS, LOGIN, PANEL, RANKINGS, REGISTER, ROOT, VIDEOS } from 'navigation/CONSTANTS';
import { useAuth } from "providers/AuthProvider";
import { useCash } from "providers/CashProvider";
import { useLayout } from "providers/LayoutProvider";
import { Outlet, useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import LockIcon from '@mui/icons-material/Lock';
import { newPassword } from 'services/authServices';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ColorModeContext } from 'App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Vote from 'components/Vote';
import CloseIcon from '@mui/icons-material/Close';
import Footer from 'components/Footer';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



function Sidenav() {

  const theme = useTheme();
  const navigate = useNavigate();
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog,
    getStringLanguage, language, changeLanguage, openMenu, setOpenMenu } = useLayout();
  const { user, menus, logout } = useAuth();
  const { cash, cashBonus } = useCash();

  const menuPanel =  { label: "Painel GM", icon: <AdminPanelSettingsIcon />, link: PANEL, needUser: false }

  const [anchorEl, setAnchorEl] = useState(null);
  const [pageYOffset, setPageYOffset] = useState(0);
  const openAccMenu = Boolean(anchorEl);
  const handleClickAccMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const escFunction = (event) => {
    if (event.key === "Escape") {
      setOpenMenu(open => open ? false : open);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keydown", escFunction, false);;
  }, []);

  function menuItemClick(route) {
    if (route != "") {
      setOpenMenu(false);
      navigate(route);
    };
  }

  function isSelected(route) {
    if (route == "") return false;
    if (route == ROOT && route == window.location.pathname) return true;
    if (window.location.pathname.indexOf(route) >= 0 && route != ROOT) {
      return true;
    }
    return false;
  }

  const openDiscord = () => {
    const discord = "https://discord.gg/qhDquEWQr4";
    window.open(discord, "_blank", "noreferrer");
  }

  return (
    <Box>

      <Box sx={{ display: openMenu ? 'block' : 'none', opacity: openMenu ? .7 : 0 }} onClick={() => { setOpenMenu(false) }} className="sidenav_bg"></Box>
      <Box sx={{ left: openMenu ? 0 : '-300px' }} className="sidenav">

        <a href="javascript:void(0)" class="closebtn" onClick={() => { setOpenMenu(false) }}>&times;</a>

        <Box className="sidenav_cont" sx={{ opacity: openMenu ? 1 : 0 }}>
          <Box sx={{ width: 1, marginY: 2 }} className="flex_col space_between align_center">
            <Box className="flex_row align_center" >
              <Box sx={{ cursor: 'pointer' }} onClick={() => { navigate(ROOT) }}>
                <img height="42" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
              </Box>
            </Box>
            {mobile && <Box sx={{ marginTop: 2 }}>
              <Tooltip title={getStringLanguage("Alterar linguagem")}>
                <IconButton onClick={() => { changeLanguage() }}>
                  <img width="25" src={require('assets/' + (language == 0 ? 'pt' : 'en') + '.png')} />
                </IconButton>
              </Tooltip>
              <Typography color={theme.palette.text.primary} variant="h10" sx={{ lineHeight: "15px" }}>
                <b>{getStringLanguage("Alterar linguagem")}</b>
              </Typography>
            </Box>}
          </Box>

          <List>
            {menus.map((menu, index) => (
              <ListItem key={index}
                onClick={() => { menuItemClick(menu.link) }}
                disablePadding sx={{
                  display: 'block',
                  background: isSelected(menu.link) ? PRIMARY_COLOR : theme.palette.background,
                  color: isSelected(menu.link) ? "white" : theme.palette.text.primary
                }}
                style={{ display: !menu.needUser || menu.needUser && user != null ? 'block' : 'none' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openMenu ? 'initial' : 'center',
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openMenu ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isSelected(menu.link) ? "white" : theme.palette.text.primary
                    }}>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.label} sx={{ opacity: openMenu ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}

            {user && (user.isGM == true || user.isGML == true) && <ListItem key={99}
                onClick={() => { menuItemClick(menuPanel.link) }}
                disablePadding sx={{
                  display: 'block',
                  background: isSelected(menuPanel.link) ? PRIMARY_COLOR : theme.palette.background,
                  color: isSelected(menuPanel.link) ? "white" : theme.palette.text.primary
                }}
                style={{ display: 'block'  }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openMenu ? 'initial' : 'center',
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openMenu ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isSelected(menuPanel.link) ? "white" : theme.palette.text.primary
                    }}>
                    {menuPanel.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuPanel.label} sx={{ opacity: openMenu ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>}
          </List>

          {<Box sx={{ marginY: 2 }} className="flex_row align_center justify_center w100" >
            <Button variant="text" startIcon={<img width="24" src={require('assets/discord.png')} />}
              color="secondary"
              onClick={() => { openDiscord() }}><b>DISCORD</b></Button>
          </Box>}

        </Box>


      </Box>
    </Box >
  );
}





export default Sidenav;
