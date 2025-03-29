

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
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



function MenuNew() {

  const theme = useTheme();
  const navigate = useNavigate();
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog,
    getStringLanguage, language, changeLanguage, openMenu, setOpenMenu } = useLayout();
  const { user, menus, logout } = useAuth();
  const { cash, shard, infinite, cashBonus } = useCash();

  const menuPanel = { label: "Painel GM", icon: <AdminPanelSettingsIcon />, link: PANEL, needUser: false }

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
    <Box sx={{ width: '100%', position: 'sticky', top: '156px' }}>

      <Paper sx={{ width: '100%' }}>
        <MenuList>
          {menus.map((menu, index) => (<ListItem key={index}
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
                justifyContent: 'initial',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: isSelected(menu.link) ? "white" : theme.palette.text.primary
                }}>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          </ListItem>
          ))}
          {user && user.isGM && <ListItem key={99}
            onClick={() => { menuItemClick(menuPanel.link) }}
            disablePadding sx={{
              display: 'block',
              background: isSelected(menuPanel.link) ? PRIMARY_COLOR : theme.palette.background,
              color: isSelected(menuPanel.link) ? "white" : theme.palette.text.primary
            }}
            style={{ display: !menuPanel.needUser || menuPanel.needUser && user != null ? 'block' : 'none' }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'initial',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: isSelected(menuPanel.link) ? "white" : theme.palette.text.primary
                }}>
                {menuPanel.icon}
              </ListItemIcon>
              <ListItemText primary={menuPanel.label} />
            </ListItemButton>
          </ListItem>}
        </MenuList>

      </Paper>


      <Paper sx={{ width: '100%', textAlign: 'center', paddingX: 1, paddingBottom: 4, paddingTop: 2, marginTop: 4 }}>
        <Typography color={'white'} variant="h6" sx={{ lineHeight: "64px" }}>
          <b>{getStringLanguage("Saldos")}</b>
        </Typography>
        <Box sx={{ width: '100%' }} className="flex_row align_center">
          <Box sx={{ width: '64px' }} className="flex_row align_center justify_center">
            <img width="32" src={require('assets/diamond.png')} />
          </Box>
          <Typography marginLeft={1} color={'white'} variant="h8" sx={{ lineHeight: "24px" }}>
            {cash == null ? (getStringLanguage("Carregando") + "...") : ((cash).toLocaleString('pt-BR'))}
          </Typography>
        </Box>
      </Paper>

    </Box >
  );
}





export default MenuNew;
