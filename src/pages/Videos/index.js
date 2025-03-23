
import { Paper, Typography, Box, Button, Divider, Grid } from "@mui/material";
import FormTextField from "components/Form/FormTextField";
import { useForm } from "react-hook-form";
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useLayout } from "providers/LayoutProvider";
import { useAuth } from "providers/AuthProvider";
import { useEffect } from "react";
import PaperHeader from "components/PaperHeader";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import YoutubeEmbed from "components/YoutubeEmbed";
import Banner from "components/Banner";



function Videos() {

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

  /*const videos = ["MhLuXSlFTSo",
"U7Dg64vL7IY",
"3-wB1s6grVo",
"_vOwgIoZKm4",
"qOyWA31k6JU",
"w7AxY3-tZ2U",
"_xfobHzaqhY"]*/
const videos = [];

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

      {<Banner image={require("assets/video.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 25%"} title={"MEDIAS"} />}

      <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Box sx={{ width: '100%' }} marginY={2}>
          <PaperHeader icon={<VideoLibraryIcon color="primary" fontSize="large" />}
            title={"MEDIAS"} />
        </Box>

        <Box sx={{ width: '100%', paddingBottom: '30px' }}>

          <Grid container spacing={1}>
            {videos.map((url) =>
              <Grid item xs={12} sm={12} md={4} container>
                <YoutubeEmbed embedId={url} />
              </Grid>
            )}
          </Grid>
        </Box>
        {/* 
        <Box className="flex_col align_center text_center" sx={{ width: '100%' }}>
          <img width="128" src={require('assets/kenpachi.jpg')} />
          <Box marginTop={4} className="flex_row justify_center text_center" sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ lineHeight: "15px" }}>
              {getStringLanguage("by ")} <a href="https://www.youtube.com/@Kenpachi__Y">xKenpachi Games</a>
            </Typography>
          </Box>
        </Box> */}

      </Box >

    </Box >
  );
}

export default Videos;
