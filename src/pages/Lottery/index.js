
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Box, Button, Divider, Grid, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Banner from "components/Banner";
import PaperHeader from "components/PaperHeader";
import { ERROR_COLOR, URL, VIP_COLOR } from "config/CONSTANTS";
import { useLayout } from "providers/LayoutProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuyPremiumPass, getFullPass, getPass, getPasses } from "services/accountService";
import { grey } from '@mui/material/colors';
import { lineHeight } from '@mui/system';
import { VIP } from 'navigation/CONSTANTS';
import { getLotteryCupom, getLotterys, getLotterysCupons } from 'services/cashService';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

function Lottery() {

  const { loading, mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage } = useLayout();


  const [lotterys, setLotterys] = useState([]);
  const [lotterysCupons, setLotterysCupons] = useState([]);

  const [passes, setPasses] = useState([]);
  const [premium, setPremium] = useState(0);

  const passLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  const completePassPrice = 10000000;

  const navigate = useNavigate();

  useEffect(() => {
    reloadLotterys(() => { });
    // reloadPass(() => { });
  }, [])

  const reloadLotterys = (callback) => {
    setLoading(true);
    getLotterys()
      .then(res => {
        setLotterys(res);


        getLotterysCupons()
          .then((resCupons) => {

            setLotterysCupons(resCupons);
            setLoading(false);
            callback();


          })
          .catch((err) => { });


      })
      .catch((err) => {
        setLotterys([]);
        callback();
        setLoading(false);
      });
  }

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

  const claimCupom = (loterryId) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja resgatar 1 cupom para este sorteio ?"),
      () => {
        setLoading(true);
        getLotteryCupom(loterryId)
          .then((res) => {
            reloadLotterys(() => {
              setLoading(false);
              showSuccessDialog(getStringLanguage("Cupom resgatado com sucesso."), () => {
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

  const getUserLotteryCupons = (lotteryId) => {
    return lotterysCupons.filter(r => r.lotteryId == lotteryId)[0];
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');

  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

      <Banner image={require("assets/banner_home.jpg")} height={'600px'}
        position={mobile ? 'center' : "100% 60%"} title={getStringLanguage("Sorteios")} />

      {!loading && <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Box sx={{ width: '100%' }} marginTop={2} marginBottom={8}>
          <PaperHeader icon={<EmojiEmotionsIcon color="primary" fontSize="large" />}
            title={getStringLanguage("Sorteios")} />
        </Box>

        <Box sx={{ width: '100%', paddingBottom: '30px' }}>

          {lotterys.length == 0 && <Paper elevation={4} sx={{
            width: '100%', backgroundColor: '#121212', color: 'white',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
          }}>
            <Box p={2} sx={{ width: '100%', textAlign: 'center' }} className="flex_row align_center justify_center">
              {premium == 1 && <img height="128" src={require('assets/vip.png')} />}
              {premium != 1 && <img height="128" src={require('assets/free.png')} />}
              <Typography marginX={4} variant="h8" gutterBottom>
                <b>{getStringLanguage('NO MOMENTO NÃO HÁ NENHUM SORTEIO EM ANDAMENTO')}</b>
              </Typography>
            </Box>
          </Paper>}

          {lotterys.map((lottery, index) => <Box paddingY={8} paddingX={6} sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
            marginBottom={8} marginTop={index == 1 ? 12 : 8} className="flex_col justify_center">


            <Box className="flex_col justify_center">
              <Typography variant="h8" gutterBottom>
                <b>{getStringLanguage(lottery.title)}</b>
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            </Box>

            <Box marginY={3} className="pass_banner"
              sx={{
                height: '350px', backgroundImage: 'url(' + (require("assets/" + lottery.image)) + ')',
                backgroundSize: 'fit'
              }}>
            </Box>

            <Box sx={{ width: '100%', textAlign: 'center' }} className="flex_row justify_center">

            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }} className="flex_col justify_center">
              <Typography marginY={2} variant="h8" gutterBottom>
                <b>{getStringLanguage(lottery.description)}</b>
              </Typography>
              <Box sx={{ width: '100%', textAlign: 'center' }} className="flex_row justify_center">
                <Box sx={{ textAlign: 'center' }} className="flex_col justify_center">
                  <Typography marginTop={2} variant="h8" gutterBottom>
                    {getStringLanguage('DATA DO SORTEIO')}
                  </Typography>
                  <Typography marginBottom={2} variant="h8" gutterBottom>
                    <b>{formatDate(lottery.dateLottery)}</b>
                  </Typography>
                </Box>
                <Box ml={6} sx={{ textAlign: 'center' }} className="flex_col justify_center">
                  <Typography marginTop={2} variant="h8" gutterBottom>
                    {getStringLanguage('CUPONS NO SORTEIO')}
                  </Typography>
                  <Typography marginBottom={2} variant="h8" gutterBottom>
                    <b>{lottery.cupons}</b>
                  </Typography>
                </Box>
              </Box>
              {/*<LinearProgress variant="determinate" value={(100 * passObj.pass.exp) / 800} />*/}
            </Box>

            {lotterysCupons.length > 0 && <Box sx={{ width: '100%', textAlign: 'center' }} className="flex_col justify_center">
              <Typography marginTop={2} variant="h8" gutterBottom>
                <b>{getStringLanguage('SEUS CUPONS')}</b>
              </Typography>
              <Typography marginBottom={2} variant="h8" gutterBottom>
                <b>{getUserLotteryCupons(lottery.id).cupons.length}</b>
              </Typography>
              {getUserLotteryCupons(lottery.id).cupons.length == 0 && <Typography color={ERROR_COLOR} marginBottom={2} variant="h8" gutterBottom>
                {getStringLanguage('VOCÊ NÃO POSSUI CUPONS PARA ESTE SORTEIO')}
              </Typography>}
              {getUserLotteryCupons(lottery.id).cupons.length > 0 && <Box marginY={2} paddingX={6} sx={{ width: '100%', }}
                className={"flex_row align_center"}>


                <Grid container spacing={4} justifyContent={getUserLotteryCupons(lottery.id).cupons.length < 5 ? "center" : "flex-start"}>
                  {getUserLotteryCupons(lottery.id).cupons.map((c, i) => (<Grid item xs={12} sm={12} md={3}>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <div className='cupom'>
                        <span>
                          <b>{c.code}</b>
                        </span>
                      </div>
                    </Box>
                  </Grid>))}
                </Grid>



              </Box>}
              <Box marginY={4} sx={{ width: '100%', textAlign: 'center' }} className="flex_row justify_center">
                <Paper elevation={4} sx={{
                  width: mobile ? '150px' : '400px', marginRight: '20px', backgroundColor: '#121212', color: 'white',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
                }}>
                  <Box padding={4} className="flex_col align_center justify_center">
                    <Typography marginBottom={2} variant="h10" gutterBottom>
                      {getStringLanguage('A cada R$100,00 doado nos 2 meses anterior a data do sorteio, é igual a um cupom')}
                    </Typography>
                    <img width={64} src={require('assets/cupom.png')} />
                    <Typography marginTop={1} variant="h8" gutterBottom>
                      <b>{getUserLotteryCupons(lottery.id).lotteryBalance}</b>
                    </Typography>
                    {getUserLotteryCupons(lottery.id).lotteryBalance > 0 &&
                      <Button marginTop={1} fullWidth sx={{ cursor: 'pointer', color: 'white !important' }} variant="contained" onClick={() => claimCupom(lottery.id)}>{getStringLanguage("RESGATAR")}
                      </Button>}
                  </Box>
                </Paper>
              </Box>

            </Box>}

            {/*
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
                width: mobile ? '150px' : '400px', marginRight: '20px', backgroundColor: '#121212', color: 'white',
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
            */}


          </Box>)}


        </Box>

      </Box >}



    </Box >
  );
}

export default Lottery;
