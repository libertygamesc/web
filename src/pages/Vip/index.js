import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Divider, Grid, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Banner from "components/Banner";
import PaperHeader from "components/PaperHeader";
import { URL, VIP_COLOR } from "config/CONSTANTS";
import { useLayout } from "providers/LayoutProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuyPremiumPass, getPass, getPasses } from "services/accountService";
import Lottie from "react-lottie";
import * as passAnimation from 'assets/vip.json';
import { grey } from '@mui/material/colors';
import { lineHeight } from '@mui/system';
import { useCash } from 'providers/CashProvider';
import MenuNew from 'components/MenuNew';

function Vip() {

  const defaultAnimation = {
    loop: true,
    autoplay: true,
    animationData: passAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage } = useLayout();
  const { cash } = useCash();

  const [pass, setPass] = useState(null);
  const [rewards, setRewards] = useState(null);
  const passLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  const navigate = useNavigate();



  useEffect(() => {
    reloadPass(() => { });
  }, [])

  const reloadPass = (callback) => {
    setLoading(true);
    getPasses()
      .then(res => {
        setPass(res[0].pass)
        setRewards(res[0].rewards)
        callback();
        setLoading(false);
      })
      .catch((err) => {
        setPass(null)
        callback();
        setLoading(false);
      });
  }

  const claimPass = (level) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja obter este level do passe ?"),
      () => {
        setLoading(true);
        getPass(level)
          .then((res) => {
            reloadPass(() => {
              setLoading(false);
              showSuccessDialog(getStringLanguage("Passe Level resgatado com sucesso, cheque iventory cash para pegar recompensa"), () => {
                closeSuccessDialog();
              })
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

  const buyPremiumPass = () => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja adicionar 30 dias VIP por 2kk Cash?"),
      () => {
        setLoading(true);
        BuyPremiumPass()
          .then((res) => {
            reloadPass(() => {
              setLoading(false);
              showSuccessDialog(getStringLanguage("30 dias de VIP adicionado."), () => {
                closeSuccessDialog();
              })
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

  const getPassImage = (level) => {
    var rewardsLevel = rewards.filter(r => r.levelPass == level);
    return rewardsLevel.filter(r => r.image != null)[0].image
  }

  const getPassDesc = (level) => {
    var descstring = "";
    var rewardsLevel = rewards.filter(r => r.levelPass == level && r.title != null);
    var rewardsFix = rewards.filter(r => r.levelPass == 0 && r.title != null);
    rewardsLevel.forEach(r => {
      descstring = descstring + (pass.premium == 1 ? r.premiumItemCount : r.itemCount) + "x" + r.title + "\n"
    })
    rewardsFix.forEach(r => {
      descstring = descstring + (pass.premium == 1 ? r.premiumItemCount : r.itemCount) + "x" + r.title + "\n"
    })
    return descstring;
  }


  const vipTheme = createTheme({
    palette: {
      primary: {
        main: VIP_COLOR
      }
    }
  })



  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', paddingBottom: 4 }} className="flex_col align_center">

      {<Banner image={require("assets/vip.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 15%"} />}

      {pass && <Box mt={4} sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={3} container>
            <Box sx={{ width: '100%' }} className="flex_col">
              <MenuNew />

            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={9} container>
            <Box sx={{ width: "100%" }} className="flex_col align_center">
              <Box marginBottom={4}   sx={{ width: '100%' }}>
                <PaperHeader icon={<WorkspacePremiumIcon color="primary" fontSize="large" />}
                  title={getStringLanguage("VIP - Adquira VIP e obtenha vantagens")} />
              </Box>





              <Paper sx={{ width: mobile ? '100%' : 512 }}>

                <Box sx={{ width: '100%', textAlign: 'center', padding: '15px' }} className="flex_row align_center">
                  <Box marginX={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{getStringLanguage("Tipo da Conta")}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '25px' }}>
                      {pass.premium != 1 ? "FREE" : "VIP"}
                    </Typography>
                  </Box>
                  <Box marginX={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{getStringLanguage("Data de Expiração")}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '25px' }}>
                      {pass.premium != 1 ? "-" : pass.premiumExpire}
                    </Typography>
                  </Box>
                </Box>


              </Paper>

              <Box marginY={2}>
                <Paper sx={{ width: mobile ? '100%' : 512 }}>

                  <Box sx={{ width: '100%', textAlign: 'center' }} className="flex_col align_center">
                    <Lottie options={defaultAnimation}
                      height={128}
                      width={128}
                    />
                    <Typography marginY={2} variant="h8" gutterBottom>
                      <b>{getStringLanguage('VANTAGENS VIP')}</b>
                    </Typography>
                    <Box sx={{ textAlign: 'left' }} >
                      <ul>
                        <li>Buff GM Especial VIP</li>
                        <li>Recompensa extra na TG</li>
                        <li>Recompensa missão diária extra</li>
                        <li>Dg Farm Alz 12b</li>
                      </ul>
                    </Box>
                    <Box marginTop={2} marginBottom={4}>
                      <Button fullWidth variant="contained" onClick={() => buyPremiumPass()}>{getStringLanguage('ADICIONAR 30 DIAS')}</Button>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>}


    </Box >
  );
}

export default Vip;
