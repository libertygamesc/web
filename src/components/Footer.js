

import { Paper, Typography, Box, Button, Divider, Grid, Badge, Tooltip } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { useLayout } from "providers/LayoutProvider";
import { useState } from "react";

function Footer() {

  const { showTermsDialog, language } = useLayout();
  const [pageYOffset, setPageYOffset] = useState(0);

  const openTerms = () => {
    showTermsDialog(language);
  }

  const openSocialUrl = (url) => {
    window.open(url, "_blank", "noreferrer");
  }

  const social = [
    { title: 'Discord', url: '', img: 'discord.png' },
    { title: 'Facebook', url: '', img: 'facebook.png' },
    { title: 'Instagram', url: '', img: 'instagram.png' },
    { title: 'WhatsApp', url: '', img: 'whatsapp.png' },
    { title: 'TikTok', url: '', img: 'tiktok.png' },
  ];

  return (
    <Box className="flex_col align_center" sx={{ padding: '150px', width: '100%', background: '#000' }} >
      {social &&
        <Box marginBottom={6} className="flex_row align_center" sx={{ height: '100%' }}>
          {social.map((s, i) => (
            <Tooltip title={s.title}>
              <Box className="button flex_row align_center"
                sx={{ paddingX: '20px', height: '100%', cursor: 'pointer' }} onClick={() => { openSocialUrl(s.url) }}>
                <Box sx={{ marginRight: 1 }}>
                  <img width="24" src={require('assets/' + s.img)} />
                </Box>
              </Box>
            </Tooltip>))}
        </Box>}
      <Typography variant="h10" sx={{ lineHeight: "30px", textAlign: 'center', color: 'white' }}>
        <b>2025 © Liberty Games</b>
      </Typography>
      <Typography variant="h10" sx={{ lineHeight: "15px", textAlign: 'center' }}>
        {"Images and trademarks belong to their respective owners."}
      </Typography>
      <Typography variant="subtitle2" sx={{ lineHeight: "15px", textAlign: 'center' }}>
        {"We are in no way affiliated / associated / partnered with ESTsoft Corp., ESTsoft Inc., NBird LLC, NBird, SDO, SNDO and SNDA."}
      </Typography>

      <Typography mt={2} onClick={() => openTerms()}
        variant="subtitle2" sx={{ cursor: 'pointer', lineHeight: "15px", textAlign: 'center', textDecoration: 'underline' }}>
        {"Terms of Service"}
      </Typography>
    </Box>
  );
}





export default Footer;
