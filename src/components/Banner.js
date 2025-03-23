
import { Box, Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { PRIMARY_COLOR } from "config/CONSTANTS";
import { DOWNLOADS } from "navigation/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import { useNavigate } from "react-router-dom";

function Banner(props) {

  const { mobile, getStringLanguage } = useLayout();
  const { user } = useAuth();

  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: 'Games',
    }
  });

  const { height, image, title, subtitle, button, position, color } = props;

  return (image ? <Box className="banner_default"
    sx={{
      height: height, backgroundImage: 'url(' + image + ')',
      backgroundPosition: position
    }}>
    <Box sx={{
      fontFamily: 'Games',
      textAlign: mobile ? 'center' : 'left',
      padding: 2
    }} className="banner_default_cont">
      {subtitle && <Typography variant="h6" color={color ? color : 'white'} sx={{ lineHeight: mobile ? '20px' : "80px" }}>
        {subtitle}
      </Typography>}
      {button && <button onClick={() => { navigate(DOWNLOADS) }} className="video-button button-49">
        <ThemeProvider theme={theme}>{button}</ThemeProvider>
      </button>}
    </Box>
  </Box> : <Box />
  );
}

export default Banner;
