
import { Paper, Typography, Box } from "@mui/material";
import Banner from "components/Banner";
import LastWar from "components/LastWar";
import Ranking from "components/Ranking";
import { useLayout } from "providers/LayoutProvider";

function Rankings() {

  const { mobile, getStringLanguage } = useLayout();

  return (
    <Box sx={{ height: '100%' }}>

      {<Banner image={require("assets/rankings.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 35%"} title={"RANKINGS"} />}

      <Box marginY={2} className="flex_row justify_center">
        <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
          <Ranking />
        </Box>
      </Box>
{/* 
      <Box marginY={2} className="flex_row justify_center">
        <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
          <LastWar/>
        </Box>
      </Box> */}

    </Box>
  );
}

export default Rankings;
