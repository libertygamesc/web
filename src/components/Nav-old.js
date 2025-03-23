

import { useState } from 'react';
import { Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip, IconButton, ListItemIcon } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { LOGIN, REGISTER } from "navigation/CONSTANTS";
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
import NavUser from './NavUser';
import NavMenu from './NavMenu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';


function Nav() {

  const theme = useTheme();
  const navigate = useNavigate();
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog,
    getStringLanguage, language, changeLanguage } = useLayout();
  const { user, menus, logout } = useAuth();
  const { cash, cashBonus } = useCash();

  const [anchorEl, setAnchorEl] = useState(null);
  const openAccMenu = Boolean(anchorEl);
  const handleClickAccMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 999 }}>
      <NavUser />
      {!mobile && <NavMenu />}
    </Box >
  );
}





export default Nav;
