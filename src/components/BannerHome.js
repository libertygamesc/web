
import { Box, Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { PRIMARY_COLOR } from "config/CONSTANTS";
import { DOWNLOADS } from "navigation/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import { useNavigate } from "react-router-dom";

function BannerHome(props) {

  const navigate = useNavigate();
  const { mobile, getStringLanguage } = useLayout();

  return (<div class="warp-myvdo">
    <img id="bg" src={require('assets/banner_bg.png')} />

    <div className="header-shadow"></div>

    <div className="infos flex_row">
      <div className="info_container flex_col align_center justify_center">
        <div onClick={() => { navigate(DOWNLOADS)}} style={{ margin: '45px 0px', cursor: 'pointer' }} class="bg-openbeta">
          <span>
            JOGUE AGORA!
          </span>
        </div>
        <img style={{ width: '50%', marginBottom: '45px' }} src={require('assets/divider4.png')} />
        <Typography variant="h6" sx={{ lineHeight: "30px", textAlign: 'center', color: 'white' }}>
          {getStringLanguage('Venha se aventurar neste mundo nostálgico de Nevareth!')}
        </Typography>
      </div>
    </div>
    <div className="sparks flex_row">
      <div className="sparks_container">
        <div className="sparks_3"></div>
        <div className="sparks_4"></div>
        <div className="sparks_5"></div>
        <div className="sparks_6"></div>
      </div>
      <div className="sparks_container">
        <div className="sparks_3"></div>
        <div className="sparks_4"></div>
        <div className="sparks_5"></div>
        <div className="sparks_6"></div>
      </div>
    </div>

    <img id="character" src={require('assets/banner_character.png')} />
    {/* <video id="myVideo" autoPlay muted loop>
      <source src={require('assets/vdo-bg-main.mp4')} type="video/mp4" />
    </video> */}
  </div>);
}

export default BannerHome;
