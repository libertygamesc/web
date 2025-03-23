
import { Paper, Typography, Box } from "@mui/material";
import News from "../../components/News";
import LastWar from "components/LastWar";
import Ranking from "components/Ranking";
import Banner from "components/Banner";
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import HomeUser from "components/HomeUser";
import Dungeons from "components/Dungeons";
import Snowfall from 'react-snowfall'
import { useEffect, useState } from "react";
import Classes from "components/Classes";
import BannerHome from "components/BannerHome";

function Home() {

  const { user } = useAuth();
  const { mobile, getStringLanguage } = useLayout();


  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* <Snowfall snowflakeCount={255} style={{zIndex: 2}} speed={[2.5,4]} wind={[1.5,5]}/> */}
      <Box sx={{ position: 'relative', width: '100%', height: (mobile ? '600px' : '898px') }}>

        {<BannerHome />}

      </Box>

      <Classes />
      {/* 
      {<HomeUser />}
*/}
      { <Box>
        <Box marginY={2} className="flex_row justify_center">
          <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
            <Ranking />
          </Box>
        </Box>
        {/* <Box marginY={2} className="flex_row justify_center">
          <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
            <LastWar />
          </Box>
        </Box>
        <Box mb={2} className="flex_row justify_center">
          <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>
            <Dungeons />
          </Box>
        </Box> */}
      </Box>}
    </Box >
  );
}

export default Home;
