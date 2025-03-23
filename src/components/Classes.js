
import { Box, Button, ThemeProvider, Typography, createTheme } from "@mui/material";
import { PRIMARY_COLOR } from "config/CONSTANTS";
import { DOWNLOADS } from "navigation/CONSTANTS";
import { useAuth } from "providers/AuthProvider";
import { useLayout } from "providers/LayoutProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Classes(props) {

  const { mobile, getStringLanguage } = useLayout();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(0);

  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: 'Games',
    }
  });

  const { height, image, title, subtitle, button, position, color } = props;

  const classes = [
    {
      name: 'Guerreiro',
      text: "São sucessores do Primeiro Governo da força. Tem seu treinamento estritamente focado na Força fisica, por isso preferem armaduras fortes e confiaveis, como 'Set de Armadura' do continente Midreth.",
    },
    {
      name: 'Duelista',
      text: "São sucessores dos intermediarios do Governo da Força. Originados da antiga arte marcial oriental com foco na velocidade, usam espada de uma mão, ou espada de lamina duplas nas duas mãos, a habilidade exige que se mova rapidamente e agilmente. Preferem 'Set Marcial' leve do continente de Huan do Sul.",
    },
    {
      name: 'Mago',
      text: "Terceiros sucessores da Torre dos Sabios, manifestam a força na sua forma mais pura. Eles usam um poderoso cajado que pode amplificar seu poder e deixá-lo conjurar magias poderosas. Quanto a armaduras, preferem 'Set Marcial' leve.",
    },
    {
      name: 'Arqueiro Arcano',
      text: "Eles originaram de uma facção de magos, e desenvolveram varias maneiras de manifestar a força de ataque a distancia. Eles usam principalmente cristais como armas, porem também usam 'Arcos Astrais' para carregar força e a controlar mais eficientemente. Preferem 'Set de Batalha' do Continente Pastur.",
    },
    {
      name: 'Guardiao Arcano',
      text: "Guardiões Arcanos usam cristais para manifestar um 'Escudo Astral' e espada de uma mão para atacar. Possuem a maior defesa dentre todos os estilos de luta, especializados em defesa, preferem 'Set de Armadura' forte e confiavel.",
    },
    {
      name: 'Espadachim Arcano',
      text: "Espadachim Arcano é um mestre em usar espada e magia para atacar os inimigos com maestria. Preferem 'Set de Batalha' do Continente Pastur.",
    }
    ,
    {
      name: 'Gladiador',
      text: "Gladiadores podem controlar a fúria e direcionar ao seu adversário, convertendo em uma forma pura de fúria para criar uma força incrivel, Especializados no uso de Habilidades fisicas avançadas, eles preferem usar 'Set de Armadura' para usar o maximo de sua força.",
    }
    ,
    {
      name: 'Atirador Arcano',
      text: "Agentes secretos talentosos em um uso de força e maquinas. Eles podem atingir um alvo de olhos fechados, maximizando o poder da Arma Astral e treinam para aperfeiçoar INT / DES. Atiradores Arcanos preferem 'Set de Batalha' do Continente Pastur.",
    }
    ,
    {
      name: 'Mago Negro',
      text: "Mago Negro combina alma e força para criar uma nova força distorcida. Eles podem neutralizar inimigos através do poder das almas. As almas são manipuladas com orbes em ambas as mãos, e eles preferem armaduras leves.Preferem o 'Set de Batalha' do continente pastur.",
    }
  ]

  const setClass = (i) => {
    setSelectedClass(i);
  }

  return (
    <Box className="flex_col" sx={{ width: '100%', position: 'relative' }}>

      <Box className="class_bg" sx={{ width: '100%', height: '800px', position: 'relative', padding: '0 !important' }}>

        <Box className="flex_col" sx={{ height: '100%', position: 'absolute', marginLeft: '32em', zIndex: 9, paddingBottom: '56px', justifyContent: 'flex-end' }}>
          <Box className="flex_col class_infos align_center" sx={{ width: '100%' }}>
            <h2 className="bellefair classes_label" style={{ marginTop: '0' }}>
              {getStringLanguage('CLASSES')}
            </h2>
            <h3 className="bellefair class_title" style={{ marginTop: '0' }}>
              {getStringLanguage(classes[selectedClass].name)}
            </h3>

            <span className="class_desc"
              dangerouslySetInnerHTML={{ __html: classes[selectedClass].text }}></span>

          </Box>
          <Box className="flex_row align_center" sx={{ width: '100%', marginTop: '64px' }}>
            {classes.map((c, i) => (
              <Box onClick={e => { setClass(i) }}
                className={"button_class" + (i == selectedClass ? '_active' : '')}
                sx={{
                  backgroundImage: 'url(' + (require("assets/" + 'bt_character_' + (i == selectedClass ? 'active_' : '') + '0' + (i + 1) + '.webp')) + ')',
                  position: 'relative'
                }}>
                <h3 className="bellefair class_button_title" style={{ position: 'absolute', width: '100%', textAlign: 'center', bottom: '60px'}}>
                  {getStringLanguage(classes[i].name)}
                </h3>

              </Box>
            ))}
          </Box>
        </Box>

      </Box>
      <Box className="flex_col align_center" sx={{
        width: '100%', position: 'absolute',
        bottom: '-48px'
      }}>
        <img style={{ height: '815px', marginRight: '42em' }}
          src={require('assets/' + 'character_main_0' + (selectedClass + 1) + '.webp')} />
      </Box>
    </Box >);
}

export default Classes;
