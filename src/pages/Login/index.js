
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
import Banner from "components/Banner";

function Login() {

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
  const { setUser } = useAuth();
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
    <Box sx={{ height: '100%', overflow: 'auto', paddingY: '136px' }}>

      <Box marginY={4} sx={{ width: "100%", padding: mobile ? '15px' : '0px' }} className="flex_row justify_center">

        <Paper elevation={4} sx={{ width: mobile ? '100%' : 640, padding: mobile ? '15px' : '50px' }} className="flex_row">

          <Box className="flex_col align_center">
            <img width="128" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
            <Box sx={{ margin: '30px 0' }} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                  <Typography variant="h8" gutterBottom>
                    <b>{getStringLanguage('Entrar na sua conta')}</b>
                  </Typography>
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
            <Grid container spacing={2} >
              <Grid item xs={12} sm={12} md={12}>
                <Divider spacing={1}>{getStringLanguage('OU')}</Divider>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button fullWidth variant="contained" onClick={() => { navigate(REGISTER) }}>{getStringLanguage('REGISTRE-SE')}</Button>
              </Grid>
            </Grid>
          </Box>

        </Paper>

      </Box>

    </Box >
  );
}

export default Login;
