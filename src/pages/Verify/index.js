
import { Paper, Typography, Box, Button, Divider, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useLayout } from "providers/LayoutProvider";
import { useEffect } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { verifyAccount } from "services/authServices";
import { ROOT } from "navigation/CONSTANTS";

function Verify() {

  const navigate = useNavigate();
  const { key } = useParams()

  useEffect(() => {

    if (key != undefined && key.length > 9) {
      verifyAccount(key)
        .then((res) => {
          showSuccessDialog("Conta verificada com sucesso, realize o login e resgate seu kit inicial", () => {
            closeSuccessDialog();
            navigate(ROOT)
          })

        })
        .catch((err) => {
          setLoading(false);
          showErrorDialog(err.message, () => {
            closeErrorDialog();
            navigate(ROOT)
          })
        });
    }


  }, [])

  const { showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog } = useLayout();

  return (
    <Box marginTop={8} sx={{ padding: '30px 0', height: '100%', overflow: 'auto' }}>

      <Box className="flex_row justify_center">
        <Paper sx={{ width: 860 }}>

          <Box sx={{ padding: '30px' }} className="flex_row align_center">
            <AccountBoxIcon color="primary" fontSize="large" />
            <Box marginX={2}>
              <Typography variant="h10" sx={{ lineHeight: "15px" }}>
                <b>Verificando sua conta</b>
              </Typography>
              <Box className="flex_row align_center">
                <Typography variant="subtitle2" sx={{ lineHeight: "15px" }}>
                  {"Carregando ..."}
                </Typography>
              </Box>
            </Box>
          </Box>

        </Paper>

      </Box >

    </Box >
  );
}

export default Verify;
