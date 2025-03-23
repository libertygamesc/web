
import { Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip, IconButton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLayout } from "providers/LayoutProvider";
import { Delete, MaxRune, decodificar, getCharacters, getSkills, getSkill, getTitle, getTitles, removePk, reward, updateNation, updatePoints, getStyle, checkStyle, removeStyle, getReset, getCostumeTitles, setCostumeTitle, setDisconnect, getFullReset, getCharacterClan, RemoveMember } from "services/characterService";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupIcon from '@mui/icons-material/Group';
import { useForm } from "react-hook-form";
import FormTextField from "components/Form/FormTextField";
import FormNumber from "components/Form/FormNumber";
import { literal, number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCash } from "providers/CashProvider";
import LinearProgress from '@mui/material/LinearProgress';
import PaperHeader from "components/PaperHeader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles, styled } from '@mui/material/styles';
import Banner from "components/Banner";
import { ERROR_COLOR, PRIMARY_COLOR, URL } from "config/CONSTANTS";
import FormatClearIcon from '@mui/icons-material/FormatClear';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import GradeIcon from '@mui/icons-material/Grade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Lottie from "react-lottie";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Moment from "react-moment";
import DeleteIcon from '@mui/icons-material/Delete';
import HomeUser from "components/HomeUser";
import { useAuth } from "providers/AuthProvider";
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import FormPassword from "components/Form/FormPassword";
//import { changePasswordOld, Disconnect, NewEmail, setDisconnectPassword } from "services/accountService";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import MenuNew from "components/MenuNew";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box marginTop={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function Account() {

  const [characters, setCharacters] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const { user, setUser } = useAuth();
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, parameters } = useLayout();
  const { getStringLanguage, language } = useLayout();

  const validationSchema = object({
    oldPassword: string()
      .nonempty('Senha atual obrigatório')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'Senha não pode conter espaços, hífens ou símbolos.')
      .max(16, 'Senha pode conter mais que 16 caracteres'),
    newPassword: string()
      .nonempty('Nova senha obrigatório')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'Senha não pode conter espaços, hífens ou símbolos.')
      .max(16, 'Senha pode conter mais que 16 caracteres'),
    newPasswordConfirm: string()
      .nonempty('Confirmar nova senha obrigatório'),
  }).refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ['newPasswordConfirm'],
    message: 'Senhas não são iguais',
  });
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });
  const handleOnSubmit = (formBody) => {
    /*setLoading(true);
    changePasswordOld(formBody.oldPassword, formBody.newPassword)
      .then((res) => {
        setLoading(false);
        reset();
        showSuccessDialog("Senha alterada com sucesso", () => {
          closeSuccessDialog();

        })
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });*/
  }

  const validationSchemaDisconnectButton = object({
    password: string()
      .nonempty('Senha atual obrigatório')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'Senha não pode conter espaços, hífens ou símbolos.')
      .max(16, 'Senha pode conter mais que 16 caracteres'),
  });

  const {
    control: control2,
    formState: { errors: errorsDisconnectButton, isSubmitSuccessful: isSubmitSuccessfulDisconnectButton },
    reset: reset2,
    handleSubmit: handleSubmit2
  } = useForm({
    resolver: zodResolver(validationSchemaDisconnectButton),
  });
  const handleOnSubmitDisconnectButton = (fromBody) => {
    showAlertDialog(getStringLanguage("Tem certeza que deseja resetar sua subsenha?"),
      () => {
        closeAlertDialog();
      },
      () => {
        closeAlertDialog();
      })

  };

  const validationSchemaMail = object({
    password: string()
      .nonempty('Senha obrigatório')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'Senha não pode conter espaços, hífens ou símbolos.')
      .max(16, 'Senha pode conter mais que 16 caracteres'),
    email: string()
      .nonempty(getStringLanguage('E-mail obrigatório'))
      .email(getStringLanguage('E-mail inválido'))
  });

  const {
    control: control3,
    formState: { errors: errorsMail, isSubmitSuccessful: isSubmitSuccessfulMail },
    reset: reset3,
    handleSubmit: handleSubmit3,
    setValue: setValue3
  } = useForm({
    resolver: zodResolver(validationSchemaMail),
  });
  const handleOnSubmitMail = (fromBody) => {

    /* showAlertDialog(getStringLanguage("Tem certeza que deseja utilizar " + EmailChangeCost() + " coin para alterar o e-mail?"),
       () => {
         closeAlertDialog();
         setLoading(true);
         NewEmail(fromBody)
           .then((res) => {
             setLoading(false);
             reset3();
             showSuccessDialog(res.message, () => {
               closeSuccessDialog();
             })
           })
           .catch((err) => {
             setLoading(false);
             showErrorDialog(err.message, () => {
               closeErrorDialog();
             })
           });
       },
       () => {
         closeAlertDialog();
       })*/
  };



  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const EmailChangeCost = () => {
    if (parameters && parameters.settings) {
      var settingsValue = parameters.settings.filter(s => s.idType == "Email");
      if (settingsValue[0]) {
        return parseInt(settingsValue[0].cost).toLocaleString('pt-BR')
      } else {
        return (999999999).toLocaleString('pt-BR')
      }
    } else {
      return (999999999).toLocaleString('pt-BR')
    }
  }

  useEffect(() => {
    setLoading(true);
    if (user) {
      // setValue1("oldPassword", user.haveDisconect ? "" : "123456")
      setLoading(false);
    }
  }, [user])

  useEffect(() => {
  }, [parameters])

  return (

    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', paddingBottom: 4 }} className="flex_col align_center">

      {<Banner image={require("assets/vip.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 15%"} />}

      <Box mt={4} sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={3} container>
            <MenuNew />
          </Grid>
          <Grid item xs={12} sm={12} md={9} container>
            <Box sx={{ width: '100%' }} marginBottom={2}>
              <PaperHeader icon={<GroupIcon color="primary" fontSize="large" />}
                title={getStringLanguage("Minha Conta")} />
            </Box>

            {user &&
              <Paper sx={{ width: '100%' }}>
                <Box paddingX={4} paddingY={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={4} container>
                      <Box marginY={2} className="flex_col">
                        <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                          <b>{getStringLanguage("Nome")}</b>
                        </Typography>
                        <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                          {user.userName}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} container>
                      <Box marginY={2} className="flex_col">
                        <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                          <b>{"ID"}</b>
                        </Typography>
                        <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                          {user.id}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} container>
                      <Box marginY={2} className="flex_col">
                        <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                          <b>{"E-mail"}</b>
                        </Typography>
                        <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} container>
                      <Box marginY={2} className="flex_col">
                        <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                          <b>{"Status"}</b>
                        </Typography>
                        {user.active == 1 && <Typography color={PRIMARY_COLOR} variant="h10" sx={{ lineHeight: '17px' }}>
                          <b>{'Online'}</b>
                        </Typography>}
                        {user.active != 1 && <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                          <b>{'Offline'}</b>
                        </Typography>}
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} container>
                      <Box marginY={2} className="flex_col">
                        <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                          <b>{getStringLanguage("Ultímo Login")}</b>
                        </Typography>
                        <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                          {<Moment format="DD/MM/YYYY H:mm:ss">{user.createDate}</Moment>}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>}
            <Box>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  key={0}
                  sx={{ alignItems: 'center', padding: 4 }}
                  textColor="secondary"
                  icon={<LockIcon />}
                  label={<span sx={{ fontSize: '5px' }}>{"ALTERAR SENHA"}</span>} {...a11yProps(0)}
                  iconPosition="top" />
                <Tab
                  key={1}
                  sx={{ alignItems: 'center', padding: 4 }}
                  textColor="secondary"
                  icon={<KeyIcon />}
                  label={<span sx={{ fontSize: '5px' }}>{"SUB-SENHA"}</span>} {...a11yProps(1)}
                  iconPosition="top" />
                <Tab
                  key={2}
                  sx={{ alignItems: 'center', padding: 4 }}
                  textColor="secondary"
                  icon={< ForwardToInboxIcon />}
                  label={<span sx={{ fontSize: '5px' }}>{"ALTERAR E-MAIL"}</span>} {...a11yProps(2)}
                  iconPosition="top" />
              </Tabs>
            </Box>

            <Box sx={{ width: '100%', paddingBottom: '30px' }}>

              <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: 0 }}
              >

                <TabPanel key={0} value={selectedTab} index={0}>

                  <Paper elevation={4} sx={{ padding: mobile ? '15px' : '50px', width: '100%' }} mb={3}>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item xs={12} sm={12} md={8} container justifyContent="center">
                        <Box sx={{ margin: '30px 0' }}
                          paddingX={12}
                          component="form"
                          key={1}
                          onSubmit={handleSubmit(handleOnSubmit)}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                              <Box marginY={2} className={"flex_col align_center"}>
                                <LockIcon />
                                <Typography marginY={2} variant="h8" gutterBottom>
                                  <b>Alterar senha</b>
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormPassword control={control} rules={{ required: true }} errors={errors} name="oldPassword" label="Senha atual" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormPassword control={control} rules={{ required: true }} errors={errors} name="newPassword" label="Nova senha" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormPassword control={control} rules={{ required: true }} errors={errors} name="newPasswordConfirm" label="Confirmar nova senha" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Divider spacing={1}></Divider>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} container>
                              <Button marginTop={4} fullWidth variant="contained" type="submit">CONFIRMAR</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                </TabPanel>

                <TabPanel key={1} value={selectedTab} index={1}>

                  <Paper elevation={4} sx={{ padding: mobile ? '15px' : '50px', width: '100%' }} mb={3}>
                    <Box sx={{ width: '100%' }} className={"flex_col align_center justify_center"}>
                      <Box sx={{ margin: '30px 0' }}
                        paddingRight={4}
                        key={3}
                        component="form" onSubmit={handleSubmit2(handleOnSubmitDisconnectButton)}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                            <Box marginY={2} className={"flex_col align_center"}>
                              <Typography marginY={2} variant="h8" gutterBottom>
                                <b>Resetar Sub-Senha</b>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <FormPassword control={control2} rules={{ required: true }} errors={errorsDisconnectButton} name="password" label="Senha da conta" />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <Divider spacing={1}></Divider>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} container>
                            <Button marginTop={4} fullWidth variant="contained" type="submit">RESETAR</Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Paper>

                </TabPanel>


                <TabPanel key={2} value={selectedTab} index={2}>

                  <Paper elevation={4} sx={{ padding: mobile ? '15px' : '50px', width: '100%' }} mb={3}>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item xs={12} sm={12} md={8} container justifyContent="center">
                        <Box sx={{ margin: '30px 0' }}
                          paddingX={12}
                          component="form"
                          key={4}
                          onSubmit={handleSubmit3(handleOnSubmitMail)}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                              <Box marginY={2} className={"flex_col align_center"}>
                                <ForwardToInboxIcon />
                                <Typography marginY={2} variant="h8" gutterBottom>
                                  <b>Alterar E-mail</b>
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormPassword control={control3} rules={{ required: true }} errors={errorsMail} name="password" label="Senha" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormTextField control={control3} rules={{ required: true }} errors={errorsMail} name="email" label={"Novo E-mail"} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <Divider spacing={1}></Divider>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} container>
                              <Button marginTop={4} fullWidth variant="contained" type="submit">CONFIRMAR</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} container>

                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box marginY={2} className={"flex_col align_center"}>
                      {/* <img height="28" src={require('assets/CoinIco.png')} /> */}
                      <Typography marginY={2} variant="h8" gutterBottom>
                        <b>{EmailChangeCost()}</b>
                      </Typography>
                    </Box>
                  </Paper>

                </TabPanel>

              </Box>
            </Box>
          </Grid>
        </Grid>



      </Box >


    </Box >
  );
}

export default Account;
