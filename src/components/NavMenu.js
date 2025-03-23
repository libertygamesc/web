

import { useEffect, useState } from "react";
import { Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip, IconButton, ListItemIcon } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { DOWNLOADS, LOGIN, RANKINGS, REGISTER, ROOT, VIDEOS } from 'navigation/CONSTANTS';
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
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';


function NavMenu() {

  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageYOffset, setPageYOffset] = useState(0);


  const openDiscord = () => {
    const discord = "https://discord.gg/qhDquEWQr4";
    window.open(discord, "_blank", "noreferrer");
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])



  const handleScroll = () => {
    setPageYOffset(window.pageYOffset);
  }


  return (
    <Box className="flex_row align_center nav_main" sx={{
      paddingX: '80px', width: '100%', height: '60px',
      background: pageYOffset > 0 ? '#000' : 'transparent'
    }}>
      <Box className="button flex_row align_center" sx={{ paddingX: '20px', height: '100%' }} onClick={() => { navigate(DOWNLOADS) }}>
        <DownloadIcon sx={{ marginRight: 1 }} />
        <b>DOWNLOADS</b>
      </Box>

      <Box className="button flex_row align_center" sx={{ paddingX: '20px', height: '100%' }} onClick={() => { navigate(RANKINGS) }}>
        <EmojiEventsIcon sx={{ marginRight: 1 }} />
        <b>RANKINGS</b>
      </Box>

      <Box className="button flex_row align_center" sx={{ paddingX: '20px', height: '100%' }} onClick={() => { navigate(VIDEOS) }}>
        <VideoLibraryIcon sx={{ marginRight: 1 }} />
        <b>MEDIA</b>
      </Box>

      <Box className="button flex_row align_center" sx={{ paddingX: '20px', height: '100%' }} onClick={() => { openDiscord() }}>
        <Box sx={{ marginRight: 1 }}>
          <img width="24" src={require('assets/discord.png')} />
        </Box>
        <b>DISCORD</b>

      </Box>

    </Box>

  );
}





export default NavMenu;
