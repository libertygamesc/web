
import { Paper, Typography, Box, Button, Divider, Grid } from "@mui/material";
import FormTextField from "components/Form/FormTextField";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGISTER, ROOT } from "navigation/CONSTANTS";
import { useNavigate } from "react-router-dom";
import { useLayout } from "providers/LayoutProvider";
import { getLocalUser, loginAccount, newPassword } from "services/authServices";
import FormPassword from "components/Form/FormPassword";
import { getAccount } from "services/accountService";
import { useAuth } from "providers/AuthProvider";
import { useEffect } from "react";
import { useCash } from "providers/CashProvider";
import { styled, useTheme } from '@mui/material/styles';
import Slideshow from "components/Slideshow";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PRIMARY_COLOR } from "config/CONSTANTS";
import Moment from 'react-moment';


function HomeUser() {

  const navigate = useNavigate();
  const theme = useTheme();
  const { getStringLanguage } = useLayout();

  useEffect(() => {
    const user = getLocalUser();
    if (user != null) {
      navigate(ROOT);
    }
  }, [])

  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog } = useLayout();
  const { user, setUser } = useAuth();
  const { updateCash } = useCash();

  const validationSchema = object({
    username: string()
      .nonempty(getStringLanguage('Usuário obrigatório')),
    password: string()
      .nonempty(getStringLanguage('Senha obrigatório'))
  })

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    getValues
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const handleOnSubmit = (formBody) => {
    setLoading(true);
    loginAccount(formBody)
      .then((res) => {
        getAccount()
          .then((user) => {
            navigate(ROOT);
            setLoading(false);
            setUser(user)
            updateCash();
          })
          .catch((err) => {
            setLoading(false);
            setUser(null)
          });
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  };

  const resetPassword = () => {
    if (getValues("username")) {
      setLoading(true);
      newPassword(getValues("username"))
        .then((res) => {
          setLoading(false);
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
    } else {
      showErrorDialog(getStringLanguage("Preencha campo usuário para solicitar nova senha"), () => {
        closeErrorDialog();
      })
    }
  }

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>

      <Box marginY={4} className="flex_row justify_center">

        <Box elevation={4} sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }} className="flex_row">

          <Grid container>
            <Grid item xs={12} sm={12} md={8} container justifyContent="center">
              <Slideshow />
            </Grid>
            <Grid item xs={12} sm={12} md={4} container justifyContent="center">

              {!user && <Paper className="flex_col align_center justify_center" sx={{ width: '100%', height: '512px', padding: '30px' }}>

                <Box className="flex_col justify_center" sx={{ cursor: 'pointer' }}>
                  <img height="48" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
                </Box>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} container>
                      <Box marginY={2} sx={{ width: '100%' }} className="flex_col align_center" >
                        <Typography variant="h8" gutterBottom>
                          <b>{getStringLanguage('Login Rápido')}</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormTextField control={control} rules={{ required: true }} errors={errors} name="username" label={getStringLanguage("Usuário")} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormPassword control={control} rules={{ required: true }} errors={errors} name="password" label={getStringLanguage("Senha")} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} container justifyContent="flex-end">
                      <Button variant="text" sx={{ marginRight: '15px' }} color="secondary" onClick={() => { resetPassword() }}>{getStringLanguage('ESQUECI A SENHA')}</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} container>
                      <Button fullWidth variant="contained" type="submit">{getStringLanguage('ENTRAR')}</Button>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container spacing={1} >
                  <Grid item xs={12} sm={12} md={12}>
                    <Divider sx={{ marginY: 1.5 }} spacing={1}>{getStringLanguage('OU')}</Divider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Button fullWidth variant="contained" onClick={() => { navigate(REGISTER) }}>{getStringLanguage('REGISTRE-SE')}</Button>
                  </Grid>
                </Grid>
              </Paper>}

              {user && <Paper className="flex_col align_center justify_center" sx={{ width: '100%', height: '512px', padding: '30px 50px' }}>


                <Box marginY={2} sx={{ width: '100%' }} className="flex_col align_center" >
                  <img height="48" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
                  <Typography variant="h8" gutterBottom>
                    <b>{getStringLanguage('Dados da conta')}</b>
                  </Typography>
                </Box>

                <Box sx={{ width: '100%' }}>

                  <Box marginY={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{getStringLanguage("Nome")}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                      {user.userName}
                    </Typography>
                  </Box>

                  <Box marginY={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{"ID"}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                      {user.id}
                    </Typography>
                  </Box>

                  <Box marginY={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{"E-mail"}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                      {user.email}
                    </Typography>
                  </Box>

                  <Box marginY={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{"Status"}</b>
                    </Typography>
                    {user.Login == 1 && <Typography color={PRIMARY_COLOR} variant="h10" sx={{ lineHeight: '17px' }}>
                      <b>{'ONLINE'}</b>
                    </Typography>}
                    {user.Login != 1 && <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                      {getStringLanguage("Último login em ")}<Moment format="DD/MM/YYYY H:mm:ss">{user.logoutTime}</Moment>
                    </Typography>}
                  </Box>

                  {user.lastIp && <Box marginY={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{getStringLanguage("Último IP")}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                      {user.lastIp}
                    </Typography>
                  </Box>}

                  <Box marginY={2} className="flex_col">
                    <Typography variant="h8" sx={{ lineHeight: '17px' }}>
                      <b>{getStringLanguage("Data de Criação")}</b>
                    </Typography>
                    <Typography variant="h10" sx={{ lineHeight: '17px' }}>
                      {<Moment format="DD/MM/YYYY H:mm:ss">{user.createDate}</Moment>}
                    </Typography>
                  </Box>

                </Box>

              </Paper>}

            </Grid>

          </Grid>

        </Box>

      </Box>

    </Box >
  );
}

export default HomeUser;
