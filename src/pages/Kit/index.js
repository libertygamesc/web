
import { Paper, Typography, Box, Button, Divider, Grid } from "@mui/material";
import FormTextField from "components/Form/FormTextField";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useLayout } from "providers/LayoutProvider";
import { useAuth } from "providers/AuthProvider";
import { useEffect, useState } from "react";
import { useCash } from "providers/CashProvider";
import RedeemIcon from '@mui/icons-material/Redeem';
import FormSelect from "components/Form/FormSelect";
import { getKit } from "services/kitService";
import PaperHeader from "components/PaperHeader";
import Banner from "components/Banner";
import MenuNew from "components/MenuNew";

function Kit() {

  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog, getStringLanguage } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {

  }, [])


  const validationSchema = object({
    class: string()
      .nonempty(getStringLanguage('Classe obrigatória')),
  })
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { setUser } = useAuth();
  const [selectedClass, setSelectedClass] = useState(0);

  const classOptions = [
    { value: '1', label: getStringLanguage("Guerreiro (GU)") },
    { value: '2', label: getStringLanguage("Duelista (DU)") },
    { value: '3', label: getStringLanguage("Mago (MA)") },
    { value: '4', label: getStringLanguage("Arqueiro Arcano (AA)") },
    { value: '5', label: getStringLanguage("Guardião Arcano (GA)") },
    { value: '6', label: getStringLanguage("Espadachim Arcano (EA)") },
    { value: '7', label: getStringLanguage("Gladiador (GL)") },
    { value: '8', label: getStringLanguage("Atirador Arcano (AT)") },
    { value: '9', label: getStringLanguage("Mago Negro (MN)") },
  ]
  const handleOnSubmit = (fromBody) => {
    setLoading(true);
    getKit(fromBody.class)
      .then((res) => {
        setLoading(false);
        showSuccessDialog(getStringLanguage("Kit resgatado com sucesso"), () => {
          closeSuccessDialog();
        })
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  };

  const setClass = (i) => {
    setSelectedClass(i);
  }

  const classes = [
    {
      name: 'Guerreiro',
      text: "São sucessores do Primeiro Governo da força. Tem seu treinamento estritamente focado na Força fisica, por isso preferem armaduras fortes e confiaveis, como 'Set de Armadura' do continente Midreth.",
    },
    {
      name: 'Duelista',
      text: "São sucessores dos intermediarios do Governo da Força. Originados da antiga arte marcial oriental com foco na velocidade, usam espada de uma mão, ou espada de lamina duplas nas duas mãos, a habilidade exige que se mova rapidamente e agilmente. Preferem 'Set Marcial' leve do continente de Huan do Sul.",
    },
    {
      name: 'Mago',
      text: "Terceiros sucessores da Torre dos Sabios, manifestam a força na sua forma mais pura. Eles usam um poderoso cajado que pode amplificar seu poder e deixá-lo conjurar magias poderosas. Quanto a armaduras, preferem 'Set Marcial' leve.",
    },
    {
      name: 'Arqueiro Arcano',
      text: "Eles originaram de uma facção de magos, e desenvolveram varias maneiras de manifestar a força de ataque a distancia. Eles usam principalmente cristais como armas, porem também usam 'Arcos Astrais' para carregar força e a controlar mais eficientemente. Preferem 'Set de Batalha' do Continente Pastur.",
    },
    {
      name: 'Guardiao Arcano',
      text: "Guardiões Arcanos usam cristais para manifestar um 'Escudo Astral' e espada de uma mão para atacar. Possuem a maior defesa dentre todos os estilos de luta, especializados em defesa, preferem 'Set de Armadura' forte e confiavel.",
    },
    {
      name: 'Espadachim Arcano',
      text: "Espadachim Arcano é um mestre em usar espada e magia para atacar os inimigos com maestria. Preferem 'Set de Batalha' do Continente Pastur.",
    }
  ]

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', paddingBottom: 4 }} className="flex_col align_center">

      {<Banner image={require("assets/kit.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 15%"} />}

      <Box mt={4} sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={3} container>
            <MenuNew />
          </Grid>
          <Grid item xs={12} sm={12} md={9} container>
            <Box sx={{ width: "100%" }} className="flex_col align_center">
              <Box sx={{ width: '100%' }} marginBottom={2}>
                <PaperHeader icon={<RedeemIcon color="primary" fontSize="large" />}
                  title={getStringLanguage("Kit Iniciante")} />
              </Box>
              <Box marginY={4} sx={{ width: "100%" }} className="flex_row justify_center">

                <Paper elevation={4} sx={{ width: mobile ? '100%' : 640, padding: mobile ? '15px' : '50px', margin: '0 auto' }} >

                  <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={1} alignItems={"center"}>
                      <Grid item xs={12} sm={12} md={12} container>
                        <Typography variant="h8" gutterBottom>
                          <b>{getStringLanguage('Escolha a classe')}</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormSelect options={classOptions} control={control} rules={{ required: true }} errors={errors} name="class" label="Classe" />
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} gutterBottom></Grid>
                      <Grid item xs={9} sm={9} md={9}></Grid>
                      <Grid item xs={3} sm={3} md={3} container>
                        <Button fullWidth variant="contained" type="submit">{getStringLanguage('RESGATAR')}</Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box >
  );
}

export default Kit;
