
import { Paper, Typography, Box, Button, Divider, Grid, Badge, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useLayout } from "providers/LayoutProvider";
import { Delete, MaxRune, decodificar, getCharacters, getSkills, getSkill, getTitle, getTitles, removePk, reward, updateNation, updatePoints, getStyle, checkStyle, removeStyle, getReset, getCostumeTitles, setCostumeTitle, setTag, getFullReset, removeInfinite, addInfinite, transferInfinite } from "services/characterService";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupIcon from '@mui/icons-material/Group';
import { useForm } from "react-hook-form";
import FormTextField from "components/Form/FormTextField";
import FormNumber from "components/Form/FormNumber";
import { literal, number, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCash } from "providers/CashProvider";
import LinearProgress from '@mui/material/LinearProgress';
import PaperHeader from "components/PaperHeader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Banner from "components/Banner";
import { PRIMARY_COLOR, URL } from "config/CONSTANTS";
import FormatClearIcon from '@mui/icons-material/FormatClear';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import GradeIcon from '@mui/icons-material/Grade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as tag from 'assets/tag.json';
import Lottie from "react-lottie";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MenuNew from "components/MenuNew";
import { lineHeight } from "@mui/system";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import * as infiniteAnimation from 'assets/infinite.json';
import AddIcon from '@mui/icons-material/Add';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FormSelect from "components/Form/FormSelect";
import { useAuth } from "providers/AuthProvider";
import { getInfiniteChar } from "services/rankingService";
import Moment from "react-moment";
import HistoryIcon from '@mui/icons-material/History';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function Characters() {

  const [characters, setCharacters] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog } = useLayout();
  const { updateCash, infinite } = useCash();
  const { getStringLanguage, language } = useLayout();
  const { user } = useAuth();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
    getValues
  } = useForm({});


  useEffect(() => {
    setLoading(true);
    reloadCharacters(() => {
      setLoading(false);
      setSelectedCharacter(0);
    });
  }, [])

  const reloadCharacters = (callback) => {
    getCharacters()
      .then(res => {

        res.forEach((element, index) => {
          element.class = decodificar(element.class, language);

          if (index + 1 == res.length) {

            setCharacters(res);
            reset(res[selectedCharacter]);
            updateCash();
            callback();
          }

        });
      })
      .catch((err) => {
        setCharacters(null)
        callback();
      });
  }

  const handleChange = (event, newValue) => {
    setSelectedCharacter(newValue);
    reset(characters[newValue]);
  };

  const pntResolver = (ev, pnt) => {
    var value = parseInt(ev.target.value == "" || ev.target.value == null ? 0 : ev.target.value);
    if (value < 0) {
      value = 0
    }
    var lastValue = getValues(pnt);
    if (value < lastValue) {
      var freePoints = getValues("pnt");
      setValue("pnt", freePoints + (lastValue - value))
      setValue(pnt, value);
    } else {
      var freePoints = getValues("pnt");
      var dif = value - lastValue;
      if (dif > freePoints) {
        setValue("pnt", 0)
        setValue(pnt, lastValue + freePoints);
      } else {
        setValue("pnt", freePoints - dif)
        setValue(pnt, value);
      }
    }
  }

  const handleOnSubmit = (formBody) => {
    setLoading(true);
    updatePoints(formBody)
      .then((res) => {
        reloadCharacters(() => {
          setLoading(false);
          showSuccessDialog(getStringLanguage("Pontos alterado com sucesso"), () => {
            closeSuccessDialog();
          })
        })
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  }

  const changeNation = (id) => {
    var character = characters[selectedCharacter];
    if (character.nation != id) {
      showAlertDialog(getStringLanguage("Tem certeza que deseja utilizar 300k Cash para alterar sua nação para ") + (id == 1 ? "Capella" : "Procyon"),
        () => {
          updateNation({ characterIdx: character.characterIdx, nation: id })
            .then((res) => {
              reloadCharacters(() => {
                setLoading(false);
                showSuccessDialog(getStringLanguage("Nação alterada com sucesso"), () => {
                  closeSuccessDialog();
                })
              })
            })
            .catch((err) => {
              setLoading(false);
              showErrorDialog(err.message, () => {
                closeErrorDialog();
              })
            });
          closeAlertDialog();
        },
        () => {
          closeAlertDialog();
        })
    }
  }


  const removePkClick = () => {
    var character = characters[selectedCharacter];
    removePk(character.characterIdx)
      .then((res) => {
        reloadCharacters(() => {
          setLoading(false);
          showSuccessDialog(getStringLanguage("Pk removido com sucesso"), () => {
            closeSuccessDialog();
          })
        })
      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
    closeAlertDialog();
  }


  const deletClick = () => {
    var character = characters[selectedCharacter];

    showAlertDialog(getStringLanguage("Tem certeza que deseja utilizar 50k Cash para deletar o personagem?\nSeu personagem será deletado definitivamente, e não nós responsabilizamos por qualquer decisão tomada."),
      () => {
        setLoading(true);
        Delete(character.characterIdx)
          .then((res) => {
            reloadCharacters(() => {
              setLoading(false);
              showSuccessDialog(getStringLanguage("Personagem deletado com sucesso"), () => {
                closeSuccessDialog();
              })
            })
          })
          .catch((err) => {
            setLoading(false);
            showErrorDialog(err.message, () => {
              closeErrorDialog();
            })
          });
        closeAlertDialog();
      },
      () => {
        closeAlertDialog();
      })
  }



  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', paddingBottom: 4 }} className="flex_col align_center">


      {<Banner image={require("assets/mission.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 25%"} />}

      <Box mt={4} sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={3} container>
            <Box sx={{ width: '100%' }} className="flex_col">
              <MenuNew />

            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9} container>

            {characters != null &&
              <Box><Tabs
                value={selectedCharacter}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {characters.map((character, i) => <Tab
                  key={i}
                  sx={{ alignItems: 'center', paddingY: 2, paddingX: 4 }}
                  textColor="secondary"
                  icon={<img width="32" height="32" src={
                    require('assets/' + character.class.classSingle + '.png')
                  } />}
                  label={<span style={{ marginTop: '5px' }}>{character.name}</span>} {...a11yProps(i)}
                  iconPosition="top" />)}

              </Tabs></Box>}

            {<Box sx={{ width: '100%' }}>

              {characters != null && <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: 0 }}
              >

                {characters.map((character, i) => <TabPanel
                  key={i}
                  value={selectedCharacter} index={i}>

                  <Paper elevation={4} sx={{ padding: mobile ? '15px' : '50px' }} mb={1}>

                    <Grid container spacing={4} alignItems={"center"}>

                      <Grid item xs={12} sm={12} md={6} container>
                        <Box sx={{ width: '100%' }} className="flex_col align_center justify_center">
                          <Badge color={characters[selectedCharacter].login == 1 ? 'success' : 'error'} overlap="circular" badgeContent=" ">
                            <Box mb={2} className="classIcon">
                              <img width="32" height="32" src={require('assets/' + character.class.classSingle + '.png')} />
                            </Box>
                          </Badge>
                          <Typography variant="h8" sx={{ lineHeight: "24px", textAlign: 'center' }}>
                            <b>{character.name}</b>
                          </Typography>
                          <Typography variant="h8" sx={{ lineHeight: "24px", textAlign: 'center' }}>
                            {character.class.className}
                          </Typography>
                          <Typography variant="h8" sx={{ lineHeight: "24px", textAlign: 'center' }}>
                            {"Level " + character.lev}
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="h8" gutterBottom>
                            <b>{getStringLanguage('Nação')}</b>
                          </Typography>
                          <Divider />

                          <Box mt={2} fullWidth className="flex_row align_center justify_center">
                            <Box onClick={() => changeNation(2)} className="flex_col align_center justify_center">
                              <Box className={{ 'nation_image': true, 'procyon': true, 'disable': characters[selectedCharacter].nation != 2 || characters[selectedCharacter].nation == 0 }}>
                              </Box>
                              <Typography mt={2} variant="h8" gutterBottom>
                                <b>Procyon</b>
                              </Typography>
                            </Box>
                            <Box onClick={() => changeNation(1)} className="flex_col align_center justify_center">
                              <Box className={{ 'nation_image': true, 'capella': true, 'disable': characters[selectedCharacter].nation != 1 || characters[selectedCharacter].nation == 0 }}>
                              </Box>
                              <Typography mt={2} variant="h8" gutterBottom>
                                <b>Capella</b>
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} container>
                        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                          <Grid container spacing={2} alignItems={"center"}>
                            <Grid item xs={12} sm={12} md={12} container>
                              <Typography sx={{ width: '100%' }} textAlign="center" variant="h8" gutterBottom>
                                <b>{getStringLanguage('Distribuir Pontos')}</b>
                              </Typography>
                              <Divider />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormNumber control={control} rules={{ required: true }} errors={errors} name="str" label="STR"
                                onChange={(ev) => {
                                  pntResolver(ev, "str");
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormNumber control={control} rules={{ required: true }} errors={errors} name="dex" label="DEX"
                                onChange={(ev) => {
                                  pntResolver(ev, "dex");
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormNumber control={control} rules={{ required: true }} errors={errors} name="int" label="INT"
                                onChange={(ev) => {
                                  pntResolver(ev, "int");
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormNumber control={control} rules={{ required: true }} errors={errors} readOnly={true} name="pnt" label={getStringLanguage("PONTOS LIVRE")}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} container>
                              <Button fullWidth variant="contained" type="submit">{getStringLanguage('CONFIRMAR')}</Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} container>

                        <Box>
                          <Grid container spacing={6} alignItems={"start"}>
                            <Grid item xs={12} sm={12} md={12} container>
                              <Box sx={{ width: '100%' }}>
                                <PaperHeader icon={<FormatClearIcon color="primary" fontSize="large" />}
                                  title={getStringLanguage('Limpar PK')} />
                                {characters[selectedCharacter].pkPenalty == 0 &&
                                  <Typography mt={1} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                    {getStringLanguage("Este personagem não esta PK")}
                                  </Typography>}
                                {characters[selectedCharacter].pkPenalty != 0 && <Grid container spacing={1}>
                                  <Grid item xs={12} sm={12} md={12} gutterBottom></Grid>
                                  <Grid item xs={12} sm={12} md={12} container>
                                    <Button fullWidth variant="contained" onClick={() => removePkClick()}>{getStringLanguage('LIMPAR')}</Button>
                                  </Grid>
                                </Grid>}
                              </Box>
                            </Grid>


                            <Grid item xs={12} sm={12} md={12} container>
                              <Box sx={{ width: '100%' }}>
                                <PaperHeader icon={<DeleteForeverIcon color="primary" fontSize="large" />}
                                  title={getStringLanguage('Deletar Personagem')} />
                                <Grid container spacing={1}>
                                  <Grid item xs={12} sm={12} md={12} gutterBottom></Grid>
                                  <Grid item xs={12} sm={12} md={12} container>
                                    <Button fullWidth variant="contained" onClick={() => deletClick()}>{getStringLanguage('DELETAR')}</Button>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>

                          </Grid>
                        </Box>
                      </Grid>




                    </Grid>




                  </Paper>

                </TabPanel>)}



              </Box>}
            </Box>}


          </Grid>
        </Grid>

      </Box >

    </Box >
  );
}

export default Characters;
