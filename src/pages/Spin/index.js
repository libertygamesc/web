
import { Paper, Typography, Box, Button, Grid } from "@mui/material";
import Download from "../../components/Download";
import PaperHeader from "components/PaperHeader";
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import { useState } from "react";
import Roulette from "components/Roullete";
import { useCash } from "providers/CashProvider";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useLayout } from "providers/LayoutProvider";
import { buySpin } from "services/cashService";
import Banner from "components/Banner";
import MenuNew from "components/MenuNew";

function Spin() {

  const { spin, updateCash } = useCash();
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage } = useLayout();


  const [inputList, setInputList] = useState([
    {
      id: 0,
      text: "1 War Fragment"
    },
    {
      id: 1,
      text: "10k Cash Bônus"
    },
    {
      id: 2,
      text: "5k Cash"
    },
    {
      id: 3,
      text: "3 War Fragment"
    },
    {
      id: 4,
      text: "30k Cash"
    },
    {
      id: 5,
      text: "20k Cash Bônus"
    },
    {
      id: 6,
      text: "10k Cash"
    },
    {
      id: 7,
      text: "5 War Fragment"
    },
    {
      id: 8,
      text: "30k Cash Bônus"
    },
    {
      id: 9,
      text: "15k Cash"
    },
    {
      id: 10,
      text: "50k Cash Bônus"
    }
  ]);



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
                <PaperHeader marginY={2} icon={<DonutSmallIcon color="primary" fontSize="large" />}
                  title={getStringLanguage("Roleta da Sorte")} />
              </Box>


              <Box marginY={4} sx={{ width: '100%' }}>
                <Box mt={4} mb={10} className="flex_row align_center space_between">
                  <Box className="flex_col">
                    <Typography variant="h8">
                      <b>{"TICKETS"}</b>
                    </Typography>
                    <Typography variant="h8" sx={{ lineHeight: "15px" }}>
                      {getStringLanguage("Você possui ") + (spin == null ? 0 : spin) + getStringLanguage(" tickets restante")}
                    </Typography>
                  </Box>

                </Box>
                <Roulette data={inputList} />

              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box >



  );
}

export default Spin;
