
import { Box, Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { DAILY, DOWNLOADS, KIT, MISSION_DAILY, PASS, RANKINGS, REGISTER, SHOP, SHOP_WAR, VIP } from "navigation/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

function Slideshow() {

  const { mobile, getStringLanguage, showSuccessDialog, closeSuccessDialog } = useLayout();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0)


  const slides = [
    { image: require("assets/register.jpg"), label: "Cadastre-se", sub: "Cadastre-se agora e ganhe 5 dias VIP", url: REGISTER, notUser: true },
    { image: require("assets/kit.jpg"), label: "Kit Inicial", sub: "Após o cadastro resgate o kit inicial para seu personagem", url: KIT },
    { image: require("assets/mission.jpg"), label: "Missão Diária", sub: "Todo dia uma nova missão diferente, faça e resgate premios", url: MISSION_DAILY },
    { image: require("assets/baldus.jpg"), label: "Baldus", sub: "Toda sexta-feira, 1 de cada classe é premiado", url: null },
    { image: require("assets/tierra.jpg"), label: "Suprema Tierra Gloriosa", sub: "Todos os dias, 20h, 22h e 00h", url: null },
    { image: require("assets/vip.jpg"), label: "Vip", sub: "Seja VIP e obtenha algumas vantagens", url: VIP },
    { image: require("assets/daily.jpg"), label: "Recompensa Diária", sub: "Ganhe uma recompensa todo dia gratuita", url: DAILY },
    { image: require("assets/pass.jpg"), label: "Passe de Batalha", sub: "Todo mês um novo passe de batalha com recompensas incriveis", url: PASS },
    { image: require("assets/loja.jpg"), label: "Loja Cash", sub: "Obtenha equipamentos e acelere sua jornada", url: SHOP },
    { image: require("assets/war.jpg"), label: "Loja Guerra", sub: "Troque fragmentos de guerra em recompensas especiais", url: SHOP_WAR },
    { image: require("assets/rankings.jpg"), label: "Ranking", sub: "Veja os jogadores mais ricos, mais fortes, acompanhe o portador e baldus", url: RANKINGS },
    { image: require("assets/donation.jpg"), label: "Recarga", sub: "Faça uma Recarga, e ajude manter o servidor sempre online", url: SHOP_WAR },
  ];

  const theme = createTheme({
    typography: {
      fontFamily: 'Games',
    }
  });

  useEffect(() => {
    const chaneBanner = setInterval(() => {
      setIndex(index => index + 1);
    }, 9000);
    return () => clearInterval(chaneBanner);
  }, []);

  useEffect(() => {
    if (index == -1) {
      setIndex(slides.length - 1);
    } else {
      if (index == slides.length) {
        setIndex(0);
      }
    }
  }, [index]);

  const clickSlide = (row) => {
    if (row.url != null) {
      if ((row.notUser)) {
        navigate(row.url)
      } else {
        if (user) {
          navigate(row.url)
        } else {
          showSuccessDialog(getStringLanguage("Faça login para acessar esta página."), () => {
            closeSuccessDialog();
          })
        }
      }
    }
  }

  return (
    <Box sx={{
      width: '100%',
      height: mobile ? '400px' : '100%'
    }}>
      <Box className="slideshow-container">

        {slides.map((row, i) => (<Box sx={{ display: i == index ? 'block' : 'none' }} onClick={() => { clickSlide(row) }}
          className="fade"><img src={row.image} /></Box>))}

        {<span className="prev" onClick={() => { setIndex(index => index - 1) }}>&#10094;</span>}
        {<span className="next" onClick={() => { setIndex(index => index + 1) }}>&#10095;</span>}

        {slides[index] && <Box className="text flex_col" sx={{ textAlign: 'center' }}>

          <Typography variant="h6" sx={{ lineHeight: "30px" }}>
            <b>{getStringLanguage(slides[index].label)}</b>
          </Typography>
          {slides[index].sub && <Typography variant="h10" sx={{ lineHeight: "20px" }}>
            {getStringLanguage(slides[index].sub)}
          </Typography>}
        </Box>}

        <Box className="dots" sx={{ textAlign: 'center' }}>
          {slides.map((row, i) => (<span className={"dot " + (index == i ? 'active' : '')} onClick={() => setIndex(i)}></span>))}
        </Box>
      </Box>

    </Box >

  );
}

export default Slideshow;
