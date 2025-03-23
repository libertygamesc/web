

import { Paper, Typography, Box, Button, Divider, Grid, Badge } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import GradeIcon from '@mui/icons-material/Grade';
import { getNews } from "services/newsService";
import { useEffect, useState } from "react";
import { FacebookEmbed } from 'react-social-media-embed';
import PaperHeader from "./PaperHeader";
import { useLayout } from "providers/LayoutProvider";

function News() {

  const [news, setNews] = useState([]);
  const { getStringLanguage } = useLayout();

  useEffect(() => {
    loadNews();

  }, [])

  const loadNews = () => {
    getNews()
      .then((res) => {
        setNews(res);
      })
      .catch((err) => {
        setNews([]);
      });
  }

  return (
    <Box className="flex_col" sx={{ height: '100%' }} >

      <Box>
        <PaperHeader icon={<GradeIcon color="primary" fontSize="large" />}
          title={getStringLanguage("Notícias e rede sociais")} />
      </Box>

      <Box className="flex_row" marginY={4} sx={{ flex: 1, overflow: 'auto', paddingBottom: '25px' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginRight: '15px', background: 'white' }}>
          <FacebookEmbed url="" width={450} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginRight: '15px', background: 'white' }}>
          <FacebookEmbed url="" width={450} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginRight: '15px', background: 'white' }}>
          <FacebookEmbed url="" width={450} />
        </div>
        
      </Box>
    </Box >
  );
}

export default News;
