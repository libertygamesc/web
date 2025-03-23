
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button, Paper, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import * as giftBox from 'assets/giftbox.json';
import Banner from "components/Banner";
import PaperHeader from "components/PaperHeader";
import { ERROR_COLOR } from "config/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Moment from 'react-moment';
import { useNavigate } from "react-router-dom";
import { getCheckDaily, getDaily, getIp } from "services/accountService";


function LinearProgressWithLabel(props) {
  return (
    <Box className="flex_col align_center" sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" {...props} />

      <b><Typography variant="body2" color="text.secondary">{`${Math.round(
        props.value,
      )}%`}</Typography> </b>
    </Box>
  );
}


function Daily() {

  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage } = useLayout();
  const { user } = useAuth();
  const [pass, setPass] = useState(null);
  const [error, setError] = useState("Carregando...");

  const defaultAnimation = {
    loop: true,
    autoplay: true,
    animationData: giftBox,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    checkDaily();
    console.log(getHardwareId());
  }, [])

  const checkDaily = () => {
    setLoading(true);
    getIp()
      .then(res => {
        getCheckDaily(getHardwareId(), res.ip)
          .then(res => {
            setError(null);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message)
            setLoading(false);
          });
      }).catch((err) => {
        setError(err.message)
        setLoading(false);
      });

  }

  const claimDaily = () => {
    setLoading(true);
    getIp()
      .then(res => {
        getDaily(getHardwareId(), res.ip)
          .then(res => {
            checkDaily();
            showSuccessDialog(res.message, () => {
              closeSuccessDialog();
            })
          })
          .catch((err) => {
            setError(err.message)
            setLoading(false);
          });
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false);
      });
  }

  const getHardwareId = () => {
    var navigator_info = window.navigator;
    var screen_info = window.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    return uid;
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

      {<Banner image={require("assets/daily.jpg")} height={'500px'}
        position={mobile ? 'center' : "100% 55%"} title={getStringLanguage("Recompensa Diaria")} />}


      <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }} className="flex_col align_center">

        <Box sx={{ width: '100%' }} marginY={2}>
          <PaperHeader icon={<CalendarMonthIcon color="primary" fontSize="large" />}
            title={getStringLanguage("Recompensa Diária")} />
        </Box>

        <Paper sx={{ width: mobile ? '100%' : 512 }}>
          <Box p={4} className="flex_col align_center">

            <Lottie options={defaultAnimation}
              height={256}
              width={256}
            />
            <Box sx={{ marginY: 2 }} className="flex_col text_center">
              <Typography variant="h10" sx={{ lineHeight: "18px" }}>
                <b>{<Moment format="DD/MM/YYYY">{new Date()}</Moment>}</b>
              </Typography>

              <Box className="flex_col justify_center"
                sx={{ width: '100%', height: '100px' }}>
                <Typography variant="subtitle2" sx={{ lineHeight: "18px" }}>
                  {getStringLanguage('Ganhe uma recompensa todo dia!')}
                </Typography>
              </Box>
            </Box>

            <Box className="flex_col justify_center align_center" sx={{ width: '100%', height: '50px' }}>

              {error == null && <Button fullWidth variant="contained" onClick={() => claimDaily()}>{getStringLanguage('RESGATAR')}</Button>}
              {error != null && <Typography variant="subtitle2" color={ERROR_COLOR} sx={{ lineHeight: "18px" }}>
                {getStringLanguage(error)}
              </Typography>}


            </Box>

          </Box>
        </Paper>

      </Box >



    </Box >
  );
}

export default Daily;
