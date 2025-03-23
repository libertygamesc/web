
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Box, Button, Divider, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Banner from "components/Banner";
import PaperHeader from "components/PaperHeader";
import { URL, VIP_COLOR } from "config/CONSTANTS";
import { useLayout } from "providers/LayoutProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuyPremiumPass, getFullPass, getPass, getPasses } from "services/accountService";
import { grey } from '@mui/material/colors';
import { lineHeight } from '@mui/system';
import { VIP } from 'navigation/CONSTANTS';

function Pass() {

  const { loading, mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage } = useLayout();

  const [passes, setPasses] = useState([]);
  const [premium, setPremium] = useState(0);

  const passLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  const completePassPrice = 10000000;

  const navigate = useNavigate();

  useEffect(() => {
    reloadPass(() => { });
  }, [])

  const reloadPass = (callback) => {
    setLoading(true);
    getPasses()
      .then(res => {

        res[0].passId = 1;
        res[1].passId = 2;

        setPasses([res[0], res[1]]);
        setPremium(res[0].pass.premium == 1 ? 1 : 0);
        //setPremium(0);
        // setPass(res[0].pass)
        // setRewards(res[0].rewards)
        callback();
        setLoading(false);
      })
      .catch((err) => {
        setPasses([]);
        callback();
        setLoading(false);
      });
  }

  const claimPass = (pass, level) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja obter este level do passe ?"),
      () => {
        setLoading(true);
        getPass(pass, level)
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

  const getVip = () => {
    navigate(VIP);
  }

  const claimFullPass = (pass) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja completar seu passe por " + completePassPrice.toLocaleString('pt-BR') + " cash ?"),
      () => {
        setLoading(true);
        getFullPass(pass)
          .then((res) => {
            reloadPass(() => {
              setLoading(false);
              showSuccessDialog(getStringLanguage("Passe completado com sucesso, resgate agora suas recompensas."), () => {
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

  const getPassImage = (pass, level) => {
    var rewardsLevel = pass.rewards.filter(r => r.levelPass == level);
    return rewardsLevel.filter(r => r.image != null)[0].image
  }

  const getPassDesc = (pass, level) => {
    var descstring = "";
    var rewardsLevel = pass.rewards.filter(r => r.levelPass == level && r.title != null);
    var rewardsFix = pass.rewards.filter(r => r.levelPass == 0 && r.title != null);
    rewardsLevel.forEach(r => {
      descstring = descstring + (premium == 1 ? r.premiumItemCount : r.itemCount) + "x " + r.title + "\n"
    })
    rewardsFix.forEach(r => {
      descstring = descstring + (premium == 1 ? r.premiumItemCount : r.itemCount) + "x " + r.title + "\n"
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

  const PassComponent = () => {
    return <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

      <Box sx={{ width: '100%' }} marginTop={2} marginBottom={8}>
        <PaperHeader icon={<LocalActivityIcon color="primary" fontSize="large" />}
          title={getStringLanguage("Passe de Batalha")} />
      </Box>

      <Box sx={{ width: '100%', paddingBottom: '30px' }}>

        <Paper elevation={4} sx={{
          width: '100%', backgroundColor: '#121212', color: 'white',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
        }}>
          <Box p={2} sx={{ width: '100%', textAlign: 'center' }} className="flex_row align_center justify_center">
            {premium == 1 && <img height="128" src={require('assets/vip.png')} />}
            {premium != 1 && <img height="128" src={require('assets/free.png')} />}
            <Typography marginX={4} variant="h8" gutterBottom>
              <b>{getStringLanguage('SEU PASSE DE BATALHA É ' + (premium == 1 ? 'VIP' : 'FREE'))}</b>
            </Typography>
            {premium != 1 &&
              <Button variant="contained" onClick={() => getVip()}>{getStringLanguage('OBTER VIP')}</Button>
            }
          </Box>
        </Paper>

        {passes.map((passObj, index) => <Box paddingY={8} paddingX={6} sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.04)' }} marginBottom={8} marginTop={index == 1 ? 12 : 8} className="flex_col justify_center">


          <Box className="flex_col justify_center">
            <Typography variant="h8" gutterBottom>
              <b>{index == 0 ? getStringLanguage('EVENTO NATAL - Até 27/Nov') :
                getStringLanguage('RED DRAGONIUM 3 SLOTS')}</b>
            </Typography>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)'}} />
          </Box>

          <Box marginY={3} className="pass_banner"
            sx={{
              height: '280px', backgroundImage: 'url(' + (index == 0 ? require("assets/pass.png") : require("assets/pass2.png")) + ')',
              backgroundPosition: index == 0 ?  '100% 65%' : '100% 25%'
            }}>
          </Box>

          <Box sx={{ width: '100%', textAlign: 'center' }} className="flex_col justify_center">
            <Typography marginY={2} variant="h8" gutterBottom>
              <b>{(passObj.pass.exp > 1600 ? 1600 : passObj.pass.exp) + " XP"}</b>
            </Typography>
            <LinearProgress variant="determinate" value={(100 * passObj.pass.exp) / 800} />
          </Box>


          <Box marginY={4} sx={{ width: '100%', overflowX: 'scroll', paddingBottom: '15px' }}
            className={"flex_row align_center " + (premium != 1 ? "" : "vip_scroll")}>
            {passLevels.map((passCount) =>
              <Paper elevation={4} sx={{
                width: '300px', marginRight: '20px', backgroundColor: '#121212', color: 'white',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
              }}>
                <Box p={4} className="flex_col align_center">
                  <img className="shop_product"
                    width={146} height={192} src={URL + '/images/products/' + getPassImage(passObj, passCount) + ".png"}></img>

                  <Box className="flex_col justify_center"
                    sx={{ width: '100%', height: '100px', textAlign: 'center' }}>
                    <Typography variant="subtitle2" sx={{ lineHeight: "18px" }}>
                      {getPassDesc(passObj, passCount)}
                    </Typography>
                  </Box>

                  <Box sx={{ marginY: 2 }} className="flex_col text_center">
                    <Typography variant="h8" sx={{ lineHeight: "32px" }}>
                      <b>LEVEL {passCount}</b>
                    </Typography>
                    <Typography variant="subtitle2" sx={{ lineHeight: "24px" }}>
                      {(passCount * 100) + " XP"}
                    </Typography>
                  </Box>

                  <Box className="flex_col justify_center align_center" sx={{ width: '100%', height: '50px' }}>
                    {passObj.pass.levelPass >= passCount &&
                      <Typography marginY={2} variant="h8" gutterBottom>
                        <b>{getStringLanguage("FINALIZADO")}</b>
                      </Typography>
                    }

                    {passObj.pass.levelPass < passCount && ((passObj.pass.exp < passCount * 100)) &&
                      <Typography marginY={2} variant="h8" gutterBottom>
                        <b>{getStringLanguage("INCOMPLETO")}</b>
                      </Typography>
                    }

                    {passObj.pass.levelPass < passCount && ((passObj.pass.exp >= passCount * 100)) &&
                      <Button fullWidth sx={{ cursor: 'pointer', color: 'white !important' }} variant="contained" onClick={() => claimPass(passObj.passId, passCount)}>{getStringLanguage('RESGATAR')}</Button>
                    }
                  </Box>

                </Box>
              </Paper>
            )}

          </Box>

          <Box marginY={4} sx={{ width: '100%', textAlign: 'center' }} className="flex_row justify_center">
            <Paper elevation={4} sx={{
              width: mobile ? '150px': '400px', marginRight: '20px', backgroundColor: '#121212', color: 'white',
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
            }}>
              <Box padding={4} className="flex_col align_center justify_center">
                <img height="32" src={require('assets/diamond.png')} />
                <Typography marginY={1} variant="h8" gutterBottom>
                  <b>{(completePassPrice).toLocaleString('pt-BR')}</b>
                </Typography>
                <Button fullWidth sx={{ cursor: 'pointer', color: 'white !important' }} variant="contained" onClick={() => claimFullPass(passObj.passId)}>{getStringLanguage("COMPLETAR PASSE")}</Button>
              </Box>
            </Paper>
          </Box>


        </Box>)}


      </Box>

    </Box >
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

      <Banner image={require("assets/pass.jpg")} height={'600px'}
        position={mobile ? 'center' : "100% 60%"} title={getStringLanguage("Passe de Batalha")} />

      {!loading && <Box>
        {premium != 1 && <PassComponent />}
        {premium == 1 && <ThemeProvider theme={vipTheme}>
          <PassComponent />
        </ThemeProvider>}
      </Box>}



    </Box >
  );
}

export default Pass;
