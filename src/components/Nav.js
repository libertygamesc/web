

import { useState } from 'react';
import { Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip, IconButton, ListItemIcon } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { DOWNLOADS, LOGIN, REGISTER, ROOT, ACCOUNT, RANKINGS, VIDEOS, INFINITES } from "navigation/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useCash } from "providers/CashProvider";
import { useLayout } from "providers/LayoutProvider";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LockIcon from '@mui/icons-material/Lock';
import { newPassword } from 'services/authServices';
import NavUser from './NavUser';
import NavMenu from './NavMenu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import KeyIcon from '@mui/icons-material/Key';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
  
  const openSocialUrl = (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  return (
    <nav class={"navbar navbar-expand-lg snipcss-vLnDR"}>
      <div className="flex_row align_center justify_center" style={{ width: '100%' }}>
        <div className="flex_row align_center" style={{ width: '1140px' }}>
          <div className="flex_row align_center" style={{ flex: 1 }}>
            <Box sx={{ marginRight: '36px', cursor: 'pointer' }} className="flex_row align_center" onClick={() => { navigate(ROOT) }}>
              <img style={{ height: '54px', marginRight: '15px' }} src={require('assets/logo.png')} />
            </Box>
            <ul class="navbar-nav mb-2 mb-lg-0 d-none d-lg-flex">
              <li style={{ cursor: 'pointer' }} class="nav-item">
                <Box className="nav-link fw-normal" onClick={() => { navigate(ROOT) }}>INÍCIO</Box>
              </li>
              <li style={{ cursor: 'pointer' }} class="nav-item">
                <Box className="nav-link fw-normal" onClick={() => { navigate(DOWNLOADS) }}>DOWNLOADS</Box>
              </li>
              <li style={{ cursor: 'pointer' }} class="nav-item">
                <Box className="nav-link fw-normal" onClick={() => { navigate(RANKINGS) }}>RANKINGS</Box>
              </li>
              <li style={{ cursor: 'pointer' }} class="nav-item">
                <Box className="nav-link fw-normal" onClick={() => { navigate(VIDEOS) }}>MÍDIA</Box>
              </li>
              <li style={{ cursor: 'pointer' }} class="nav-item">
                <Box className="nav-link fw-normal" onClick={() => { openSocialUrl('') }}>DISCORD</Box>
              </li>
            </ul>
          </div>
          {!user && <div className="flex_row align_center">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
              <li class="nav-item  d-none d-lg-flex" style={{ marginRight: '16px', cursor: 'pointer' }}>
                <Box className="fw-normal nav-link nav-link-menur mx-0 px-2 rounded-start d-flex"
                  onClick={() => { navigate(LOGIN) }}>
                  <div class="me-xxl-2">
                    <KeyIcon color='white' />
                  </div>
                  <div class="d-none d-xxl-inline-block"> LOGIN </div>
                </Box>
              </li>
              <li class="nav-item  d-none d-lg-flex" style={{ cursor: 'pointer' }}>
                <Box className="fw-normal nav-link nav-link-menur mx-0 px-2 rounded-end d-flex" sx={{ cursor: 'pointer' }}
                  onClick={() => { navigate(REGISTER) }}>
                  <div class="me-xxl-2">
                    <PersonAddAltIcon color='white' />
                  </div>
                  <div class="d-none d-xxl-inline-block"> CADASTRE-SE</div>
                </Box>
              </li>
            </ul>
          </div>}
          {user && <div className="flex_row align_center">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
              <li class="nav-item  d-none d-lg-flex" style={{ marginRight: '16px', cursor: 'pointer' }}>
                <Box className="fw-normal nav-link nav-link-menur mx-0 px-2 rounded-start d-flex"
                  onClick={() => { navigate(ACCOUNT) }}>
                  <div class="me-xxl-2">
                    <AccountCircleIcon color='white' />
                  </div>
                  <div class="d-none d-xxl-inline-block"> {user.userName} </div>
                </Box>
              </li>
              <li class="nav-item  d-none d-lg-flex" style={{ cursor: 'pointer' }}>
                <Box className="fw-normal nav-link nav-link-menur mx-0 px-2 rounded-end d-flex" sx={{ cursor: 'pointer' }}
                  onClick={() => { logout() }}>
                  <div class="me-xxl-2">
                    <LogoutIcon color='white' />
                  </div>
                  <div class="d-none d-xxl-inline-block"> SAIR </div>
                </Box>
              </li>
            </ul>
          </div>}
          
        </div>
      </div>

    </nav>
  );
}





export default Nav;
