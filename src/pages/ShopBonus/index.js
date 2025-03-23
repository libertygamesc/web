
import { Paper, Typography, Box, Button, Divider, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLayout } from "providers/LayoutProvider";
import { decodificar, getCharacters, removePk, updateNation, updatePoints } from "services/characterService";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupIcon from '@mui/icons-material/Group';
import { useForm } from "react-hook-form";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { buyProduct, getCategories, getProducts } from "services/shopBonusService";
import { useCash } from "providers/CashProvider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PaperHeader from "components/PaperHeader";
import { URL } from "config/CONSTANTS";
import Banner from "components/Banner";
import WalletIcon from '@mui/icons-material/Wallet';

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

function ShopBonus() {

  const [categories, setCategories] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  const [products, setProducts] = useState([]);
  const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
    closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage, language } = useLayout();
  const { updateCash } = useCash();

  const [openDialog, setOpenDialog] = useState(false);

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
    getCategories()
      .then((res) => {
        setCategories(res);
        loadProducts(res[0].id, () => {
          setLoading(false);
        })
      })
      .catch((err) => {
        setCategories(null)
        setLoading(false);
      });
  }, [])

  const loadProducts = (categoryId, callback) => {
    getProducts(categoryId)
      .then((res) => {
        setProducts(res);
        callback();
      })
      .catch((err) => {
        setProducts(null);
        callback();
      });
  }

  const handleChange = (event, newValue) => {
    setLoading(true);
    setSelectedCategorie(newValue);
    loadProducts(categories[newValue].id, () => {
      setLoading(false);
    })
  };

  const buy = (product) => {
    setSelectedProduct(product);
    setSelectedQty(1);
    setOpenDialog(true)
  }

  const confirmBuy = () => {
    setOpenDialog(false);
    setLoading(true)
    buyProduct({ itemId: selectedProduct.id, itemQty: selectedQty })
      .then((res) => {
        updateCash();
        setLoading(false);
        showSuccessDialog(getStringLanguage("Item comprado com sucesso, confira seu Invetario Cash no jogo"), () => {
          closeSuccessDialog();
        })

      })
      .catch((err) => {
        setLoading(false);
        showErrorDialog(err.message, () => {
          closeErrorDialog();
        })
      });
  }

  const replaceProductTittle = (title) => {
    title = title.replace("AA", "FA");
    title = title.replace("EA", "FB");
    title = title.replace("GA", "FS");
    title = title.replace("GU", "WA");
    title = title.replace("MA", "WI");
    title = title.replace("DU", "BL");
    title = title.replace("AT", "FG");
    title = title.replace("Lutador", "Fighter");
    title = title.replace("Sabio", "Sage");
    title = title.replace("Magico", "Mage");
    return title;
  }

  const cancelBuy = () => {
    setOpenDialog(false);
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }} className="flex_col align_center">

      {<Banner image={require("assets/bonus.jpg")} height={'400px'}
        position={mobile ? 'center' : "100% 30%"} title={getStringLanguage("Loja Bonus")} />}

      <Box sx={{ width: mobile ? '100%' : 1250, padding: mobile ? '15px' : 0 }}>

        <Box sx={{ width: '100%' }} marginY={2}>
          <PaperHeader marginY={4} icon={<WalletIcon color="primary" fontSize="large" />}
            title={getStringLanguage("Loja Bônus")} />
        </Box>

        {categories != null && <Box><Tabs
          value={selectedCategorie}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, i) => <Tab
            key={i}
            sx={{ alignItems: 'end' }}
            textColor="secondary"
            label={<b><span sx={{ fontSize: '5px' }}>{category.name}</span></b>} {...a11yProps(i)} />)}

        </Tabs></Box>}

        {categories != null && <Box
          sx={{ bgcolor: 'background.paper', display: 'flex' }}
        >
          {categories.map((category, i) => <TabPanel
            className="flex1"
            key={i}
            value={selectedCategorie} index={i}>
            <Box sx={{ width: '100%' }}>

              <Grid container spacing={1}>
                {products.map((product, x) =>
                  <Grid item xs={12} sm={12} md={4} container>
                    <Paper sx={{ width: '100%' }} key={x}>

                      <Box p={4} className="flex_col align_center">

                        <img className="shop_product"
                          width={146} height={192} src={URL + '/images/products/' + product.image + ".png"}></img>

                        <Box sx={{ marginY: 2 }} className="flex_col text_center">
                          <Typography variant="h10" sx={{ lineHeight: "18px" }}>
                            <b>{language == 0 ? product.title : replaceProductTittle(product.title)}</b>
                          </Typography>
                          <Typography variant="subtitle2" sx={{ lineHeight: "18px" }}>
                            {product.description}
                          </Typography>
                        </Box>

                        <Box marginY={2} className="flex_row align_center justify_center">
                          <img height="32" src={require('assets/coin.png')} />
                          <Typography marginY={2} marginLeft={1} variant="h8" gutterBottom>
                            <b>{(product.priceBonus).toLocaleString('pt-BR')}</b>
                          </Typography>
                        </Box>

                        <Button sx={{ cursor: 'pointer' }} variant="contained" onClick={() => buy(product)}>{getStringLanguage("COMPRAR")}</Button>
                      </Box>
                    </Paper>
                  </Grid>
                )}
              </Grid>


            </Box>

          </TabPanel>)}
        </Box>}
      </Box >

      {selectedProduct != null && <Dialog
        open={openDialog}
        onClose={() => { }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box className="flex_row align_center">
            <StoreOutlinedIcon sx={{ marginRight: '15px' }} color="warning" />
            {getStringLanguage("Comprar")}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {<Box sx={{ padding: '15px' }}>
              <TextField
                fullWidth
                value={selectedQty}
                label={getStringLanguage("Selecionar quantidade")}
                onChange={event => setSelectedQty(event.target.value < 1 ? 1 : event.target.value)}
                autoFocus={true}
              ></TextField>
            </Box>}
            <Typography variant="h10" sx={{ color: 'white' }}>
              {getStringLanguage("Comprar") + " " + selectedQty + "x " + (language == 0 ?
                selectedProduct.title : replaceProductTittle(selectedProduct.title)) + getStringLanguage(" por ")}
              {(selectedProduct.priceBonus * selectedQty).toLocaleString('pt-BR') + " cash bônus ?"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { cancelBuy() }} autoFocus>
            {getStringLanguage("Não")}
          </Button>
          <Button onClick={() => { confirmBuy() }} autoFocus>
            {getStringLanguage("Sim")}
          </Button>
        </DialogActions>
      </Dialog>}
    </Box >
  );
}

export default ShopBonus;
