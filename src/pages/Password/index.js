
import { Paper, Typography, Box, Button, Divider, Grid } from "@mui/material";
import FormTextField from "components/Form/FormTextField";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormPassword from "components/Form/FormPassword";
import { useEffect, useRef, useState } from "react";
import { useLayout } from "providers/LayoutProvider";
import { changePassword, createAccount, getLocalUser } from "services/authServices";
import { useNavigate, useParams } from "react-router-dom";
import { ROOT } from "navigation/CONSTANTS";
import Reaptcha from 'reaptcha';
import { styled, useTheme } from '@mui/material/styles';

function Password() {

  const navigate = useNavigate();
  const theme = useTheme();
  const { key } = useParams()

  useEffect(() => {

    if (key != undefined && key.length > 9) {
      // verifyAccount(key)
      //   .then((res) => {
      //     showSuccessDialog("Conta verificada com sucesso, realize o login e resgate seu kit inicial", () => {
      //       closeSuccessDialog();
      //       navigate(ROOT)
      //     })

      //   })
      //   .catch((err) => {
      //     setLoading(false);
      //     showErrorDialog(err.message, () => {
      //       closeErrorDialog();
      //       navigate(ROOT)
      //     })
      //   });
    }


  }, [])

  const validationSchema = object({
    password: string()
      .nonempty('Senha obrigatório')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'Senha não pode conter espaços, hífens ou símbolos.')
      .max(10, 'Senha pode conter mais que 10 caracteres'),
    passwordConfirm: string()
      .nonempty('Confirmar senha obrigatório'),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog } = useLayout();
  const captchaRef = useRef(null)

  const [captchaToken, setCaptchaToken] = useState(null)

  const handleOnSubmit = (formBody) => {

    if (captchaToken == null) {
      showErrorDialog("É necessario realizar o desafio ReCaptcha antes de continuar", () => {
        closeErrorDialog();
      })
    } else {
      setLoading(true);
      changePassword(key, formBody.password)
        .then((res) => {
          setLoading(false);
          showSuccessDialog("Senha alterada com sucesso", () => {
            closeSuccessDialog();
            navigate(ROOT);
          })
        })
        .catch((err) => {
          setLoading(false);
          showErrorDialog(err.message, () => {
            closeErrorDialog();
          })
        });
    };
  }

  const verify = () => {
    captchaRef.current.getResponse().then(res => {
      setCaptchaToken(res)
    })

  }

  return (
    <Box sx={{ padding: '30px 0', height: '100%', overflow: 'auto' }}>

      <Box sx={{ marginBottom: '30px' }} className="flex_row justify_center">

        <Box className="card_image register" />

        <Paper className="flex_col align_center" sx={{ width: 480, padding: '50px' }}>
          <img width="128" src={theme.palette.mode === 'dark' ?  require('assets/logo.png') : require('assets/logo.png')} />

          <Box sx={{ margin: '30px 0' }} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                <Typography variant="h8" gutterBottom>
                  <b>Alterar senha</b>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormPassword control={control} rules={{ required: true }} errors={errors} name="password" label="Senha" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormPassword control={control} rules={{ required: true }} errors={errors} name="passwordConfirm" label="Confirmar senha" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Divider spacing={1}></Divider>
              </Grid>


              <Grid item xs={12} sm={12} md={12} justifyContent={"center"} container>
                <Reaptcha
                  sitekey={"6LedEIImAAAAADI_LJEc9jsAqKGLcyga3rzvyHx9"}
                  ref={captchaRef}
                  onVerify={verify}
                ></Reaptcha>
              </Grid>

              <Grid item xs={12} sm={12} md={12} container>


                <Button fullWidth variant="contained" type="submit">CONFIRMAR</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

      </Box >

    </Box >
  );
}

export default Password;
