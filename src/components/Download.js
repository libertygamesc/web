

import { Paper, Typography, Box, Button, Divider, Grid, Badge, Card, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import PaperHeader from "./PaperHeader";
import { useLayout } from "providers/LayoutProvider";

function Download() {


  const openDownload = (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  const { getStringLanguage } = useLayout();

  const downloads = [
    { title: 'Google Drive', desc: getStringLanguage("Tamanho") + ": 4.9GB", url: 'https://drive.google.com/file/d/1aytOzbMzkEwGJKipOkoQ1fvtw-t1kfrp/', image: 'googledrive.png' },
    { title: 'Media Fire', desc: getStringLanguage("Tamanho") + ": 4.9GB", url: 'https://drive.google.com/file/d/1aytOzbMzkEwGJKipOkoQ1fvtw-t1kfrp/', image: 'mediafire.png' },
  ]

  return (
    <Box className="flex_col" sx={{ height: '100%' }} >

      <Box marginY={2}>
        <PaperHeader icon={<DownloadIcon color="primary" fontSize="large" />}
          title={getStringLanguage("Download do jogo")} />
      </Box>

      <Box marginY={2} className="flex_col justify_center align_center" sx={{ flex: 1 }}>
        <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
          {downloads.map((row) => (<Grid item xs={6} sm={6} md={6} alignItems={"center"} justifyContent={"center"} container>
            <Card onClick={e => { openDownload(row.url) }} className="flex_row justify_center align_center text_center"
              sx={{
                cursor: 'pointer',
                position: 'relative',
                width: '100%', padding: '40px',
                marginRight: '20px',
                ':hover': {
                  boxShadow: 20,
                },
              }}>
              <img height="64px" src={require('assets/' + row.image)} />
              <Box sx={{ flex: 1 }} className="flex_col justify_center align_center" >
                <Typography variant="h8" gutterBottom>
                  <b>{row.title}</b><br />{row.desc}
                </Typography>
              </Box>
            </Card>
          </Grid>))}
        </Grid>
      </Box>
      <Box mt={2}>
        <Typography variant="h8" gutterBottom>
          <b>{getStringLanguage("Utilidades")}</b>
        </Typography>
        <Box mt={2} sx={{ fontSize: '14px' }}>
          <ul>
            <li>{getStringLanguage("Utilizar compatibilidade com Windows 7 pode ajudar em problemas de inicialização")}</li>
            <li>{getStringLanguage("Em caso de Windows Defender ou Anti Virus ativo, pode ser necessário colocar a pasta do cliente nas excessões")}</li>
          </ul>
        </Box>
      </Box>
    </Box >
  );
}

export default Download;
