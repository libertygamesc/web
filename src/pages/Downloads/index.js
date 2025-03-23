
import { Paper, Typography, Box } from "@mui/material";
import Download from "../../components/Download";
import Requires from "components/Requires";
import { useLayout } from "providers/LayoutProvider";
import Banner from "components/Banner";

function Downloads() {

  const { mobile } = useLayout();


  return (
    <Box sx={{ height: '100%', overflow: 'auto', paddingBottom: 4 }}>

      {<Banner image={require("assets/video.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 15%"} />}

      <Box marginY={2} className="flex_row justify_center">
        <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
          <Download />
        </Box>
      </Box>

      <Box marginY={2} className="flex_row justify_center">
        <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
          <Requires />
        </Box>
      </Box>

    </Box>
  );
}

export default Downloads;
