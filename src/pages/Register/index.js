
import { Paper, Typography, Box, Button, Divider, Grid, Checkbox } from "@mui/material";
import FormTextField from "components/Form/FormTextField";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormPassword from "components/Form/FormPassword";
import { useEffect, useRef, useState } from "react";
import { useLayout } from "providers/LayoutProvider";
import { createAccount, getLocalUser } from "services/authServices";
import { useNavigate, useParams } from "react-router-dom";
import { ROOT } from "navigation/CONSTANTS";
import Reaptcha from 'reaptcha';
import { styled, useTheme } from '@mui/material/styles';
import Banner from "components/Banner";


function Register() {

  const theme = useTheme();
  const navigate = useNavigate();
  const { refer } = useParams()
  const { getStringLanguage } = useLayout();

  const validationSchema = object({
    username: string()
      .nonempty(getStringLanguage('Usuário obrigatório'))
      .regex(new RegExp('^[a-zA-Z0-9]+$'), getStringLanguage('Usuário não pode conter espaços, hífens ou símbolos.'))
      .max(10, getStringLanguage('Usuário pode conter mais que 10 caracteres')),
    password: string()
      .nonempty(getStringLanguage('Senha obrigatório'))
      .regex(new RegExp('^[a-zA-Z0-9]+$'), getStringLanguage('Senha não pode conter espaços, hífens ou símbolos.'))
      .max(10, getStringLanguage('Senha pode conter mais que 10 caracteres')),
    passwordConfirm: string()
      .nonempty(getStringLanguage('Confirmar senha obrigatório')),
    email: string()
      .nonempty(getStringLanguage('E-mail obrigatório'))
      .email(getStringLanguage('E-mail inválido')),
    name: string()
      .nonempty(getStringLanguage('Nome obrigatório'))
      .regex(new RegExp('^[a-zA-Z0-9]+$'), getStringLanguage('Nome não pode conter espaços, hífens ou símbolos.'))
      .max(10, getStringLanguage('Nome pode conter mais que 10 caracteres')),
    referCode: string()
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: getStringLanguage('Senhas não coincidem'),
  });

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue
  } = useForm({
    resolver: zodResolver(validationSchema)
  });

  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog, showTermsDialog } = useLayout();
  const captchaRef = useRef(null)

  const [captchaToken, setCaptchaToken] = useState(null)
  const [terms, setTerms] = useState(false)

  const handleOnSubmit = (formBody) => {

    if (captchaToken == null) {
      showErrorDialog(getStringLanguage("É necessario realizar o desafio ReCaptcha antes de continuar"), () => {
        closeErrorDialog();
      })
    } else {

      if (terms != true) {
        showErrorDialog(getStringLanguage("É necessario aceitar os termos de serviço"), () => {
          closeErrorDialog();
        })
      } else {
        setLoading(true);
        createAccount(formBody)
          .then((res) => {
            setLoading(false);
            localStorage.setItem("referCode", null);
            showSuccessDialog(getStringLanguage("Conta criada com sucesso, foi enviado um link de ativação para seu e-mail. Verique sua caixa de spam"), () => {
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
      }
    };
  }

  const verify = () => {
    captchaRef.current.getResponse().then(res => {
      setCaptchaToken(res)
    })

  }

  const openTerms = () => {
    showTermsDialog(0);
  }

  useEffect(() => {
    const user = getLocalUser();
    if (user != null) {
      navigate(ROOT);
    }

    if(refer != undefined && refer.length == 8){
      localStorage.setItem("referCode", refer);
      setValue("referCode", refer)
    }else{
      let refer = localStorage.getItem("referCode");
      if(refer != null && refer.length == 8){
        setValue("referCode", refer);
      }
    }
   
   
  }, [])

  return (

    <Box sx={{ height: '100%', overflow: 'auto', paddingY: '136px' }}>


      <Box marginY={4}  sx={{width: "100%", padding: mobile ? '15px' : '0px' }} className="flex_row justify_center">

        <Paper elevation={4} sx={{width: mobile ? '100%' : 640, padding: mobile ? '15px' : '50px' }} className="flex_row">

          <Box className="flex_col align_center">
            <img width="128" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />

            <Box sx={{ margin: '30px 0' }} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} container justifyContent="center">
                  <Typography variant="h8" gutterBottom>
                    <b>{getStringLanguage('Criar nova conta')}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormTextField control={control} rules={{ required: true }} errors={errors} name="username" label={getStringLanguage("Usuário")} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormPassword control={control} rules={{ required: true }} errors={errors} name="password" label={getStringLanguage("Senha")} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormPassword control={control} rules={{ required: true }} errors={errors} name="passwordConfirm" label={getStringLanguage("Confirmar senha")} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormTextField control={control} rules={{ required: true }} errors={errors} name="email" label={"E-mail"} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormTextField control={control} rules={{ required: true }} errors={errors} name="name" label={getStringLanguage("Nome")} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormTextField control={control} rules={{ required: true }} errors={errors} name="referCode" label={getStringLanguage("Código Convite")} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box className="flex_row align_center">
                    <Checkbox onChange={() => { setTerms(!terms) }} checked={terms} />
                    {getStringLanguage("Estou de acordo com os ")}
                    <Typography marginX={1} onClick={() => openTerms()}
                      variant="subtitle2" sx={{ cursor: 'pointer', lineHeight: "15px", textAlign: 'center', textDecoration: 'underline' }}>
                      {getStringLanguage(" Termos de Serviço")}
                    </Typography>
                  </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Divider spacing={1}></Divider>
                </Grid>


                <Grid item xs={12} sm={12} md={12} justifyContent={"center"} container>
                  <Reaptcha
                    sitekey={"6LdF0_0qAAAAAHI20058LHDBXn7MSACbPgigiu0f"}
                    ref={captchaRef}
                    onVerify={verify}
                  ></Reaptcha>
                </Grid>

                <Grid item xs={12} sm={12} md={12} container>
                  <Button fullWidth variant="contained" type="submit">{getStringLanguage('CONFIRMAR')}</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Paper>

      </Box>

    </Box >
  );
}

export default Register;
