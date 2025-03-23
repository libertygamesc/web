import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    Badge,
    Avatar,
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    ListItem,
    IconButton,
    CssBaseline,
    Divider,
    Toolbar,
    Box,
    LinearProgress,
    Button,
    CircularProgress,
    Typography,
    Tooltip,
    Paper
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PRIMARY_COLOR } from 'config/CONSTANTS';
import { useAuth } from 'providers/AuthProvider';
import { DOWNLOADS, LOGIN, RANKINGS, REGISTER, ROOT, VIDEOS } from 'navigation/CONSTANTS';
import { useLayout } from '../providers/LayoutProvider';
import { useCash } from 'providers/CashProvider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { newPassword } from 'services/authServices';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ColorModeContext } from 'App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Vote from 'components/Vote';
import CloseIcon from '@mui/icons-material/Close';
import Footer from 'components/Footer';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '14px',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    height: '80px',
    display: 'flex',
    width: '100vw',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function isSelected(route) {
    if (route == "") return false;
    if (route == ROOT && route == window.location.pathname) return true;
    if (window.location.pathname.indexOf(route) >= 0 && route != ROOT) {
        return true;
    }
    return false;
}

const isLauncher = window.location.pathname.indexOf('launcher') >= 0

export default function MiniDrawer() {

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const [open, setOpen] = React.useState(false);
    const [vote, setVote] = React.useState(true);
    const { user, menus, logout } = useAuth();

    const { cash, cashBonus, shard } = useCash();
    const navigate = useNavigate();
    const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
        closeErrorDialog, showAlertDialog, closeAlertDialog,
        getStringLanguage, language, changeLanguage } = useLayout();


    function handleDrawer() {
        setOpen(state => !state);
    };

    function menuItemClick(route) {
        if (route != "") {
            navigate(route);
        };
    }

    function MenuUser() {
        return
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAccMenu = Boolean(anchorEl);
    const handleClickAccMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccMenu = (event) => {
        setAnchorEl(null);
        const { myValue } = event.currentTarget.dataset;
        console.log(theme)
        if (myValue == "logout") {
            logout();
        }
        if (myValue == "password") {
            setLoading(true);
            newPassword(user.id)
                .then((res) => {
                    setLoading(false);
                    showSuccessDialog(res.message, () => {
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
    };

    const openDiscord = () => {
        const discord = "https://discord.gg/qhDquEWQr4";
        window.open(discord, "_blank", "noreferrer");
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {isLauncher ? <Box sx={{ overflow: 'auto' }} className='flex1'>
                <Outlet />
            </Box> : <>
                {vote && <Paper elevation={2} sx={{
                    position: 'fixed', right: '30px',
                    bottom: '15px', width: '376px', padding: '15px', zIndex: 9999
                }}>
                    <Box className="flex_row jutify_end">
                        <Tooltip title="Fechar">
                            <IconButton onClick={() => { setVote(false) }}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Vote />
                </Paper>}

                {!mobile && <AppBar elevation={0}
                    sx={{ color: '#2f2f2f' }} position="fixed">

                    <Toolbar sx={{ width: '100%' }}>

                        {/* {user && <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawer}
                            edge="start">
                            <MenuIcon />
                        </IconButton>} */}

                        <Box sx={{ width: 1 }} className="flex_row space_between align_center">
                            <Box sx={{ marginLeft: '15px' }} className="flex_row align_center" >

                                <Box sx={{ cursor: 'pointer' }} onClick={() => { navigate(ROOT) }}>
                                    <img height="42" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
                                </Box>

                                <Button variant="text" startIcon={<DownloadIcon />}
                                    sx={{ marginLeft: '50px' }} color="secondary"
                                    onClick={() => { navigate(DOWNLOADS) }}><b>Downloads</b></Button>

                                <Button variant="text" startIcon={<EmojiEventsIcon />}
                                    sx={{ marginLeft: '50px' }} color="secondary"
                                    onClick={() => { navigate(RANKINGS) }}><b>Rankings</b></Button>

                                <Button variant="text" startIcon={<VideoLibraryIcon />}
                                    sx={{ marginLeft: '50px' }} color="secondary"
                                    onClick={() => { navigate(VIDEOS) }}><b>Medias</b></Button>

                                {/* <Tooltip title={"Alterar modo " + (theme.palette.mode === 'dark' ? 'dark' : 'light')}>
                                    <Button variant="text" startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                        sx={{ marginLeft: '50px' }} color="secondary"
                                        onClick={colorMode.toggleColorMode}><b>{theme.palette.mode}</b></Button>
                                </Tooltip> */}

                                <Button variant="text" startIcon={<img width="24" src={require('assets/discord.png')} />}
                                    sx={{ marginLeft: '50px' }} color="secondary"
                                    onClick={() => { openDiscord() }}><b>DISCORD</b></Button>

                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: mobile ? 'column' : 'row' }} className="align_center">

                                <Box sx={{ marginX: mobile ? 0 : 2, marginY: mobile ? 2 : 0 }} marginRight={2}>
                                    <Tooltip title={getStringLanguage("Alterar linguagem")}>
                                        <IconButton onClick={() => { changeLanguage() }}>
                                            <img width="25" src={require('assets/' + (language == 0 ? 'pt' : 'en') + '.png')} />
                                        </IconButton>
                                    </Tooltip>
                                    {mobile && <Typography color={theme.palette.text.primary} variant="h10" sx={{ lineHeight: "15px" }}>
                                        <b>{getStringLanguage("Alterar linguagem")}</b>
                                    </Typography>}
                                </Box>

                                {user == null && <Box sx={{ marginX: mobile ? 0 : 2, marginY: mobile ? 2 : 0 }} className="flex_row align_center">
                                    <Button variant="text" sx={{ marginRight: '15px' }} color="secondary"
                                        onClick={() => { navigate(LOGIN) }}><b>{getStringLanguage('ENTRAR')}</b></Button>
                                    <Button variant="contained"
                                        onClick={() => { navigate(REGISTER) }}>{getStringLanguage('REGISTRE-SE')}</Button>
                                </Box>}

                                {user != null && <Box className="flex_row align_center">
                                    <img height="42" src={require('assets/avatar.png')} />

                                    <Box marginX={2}>
                                        <Typography color={theme.palette.text.primary} variant="h10" sx={{ lineHeight: "15px" }}>
                                            <b>{user.userName}</b>
                                        </Typography>
                                        <Box className="flex_row align_center">
                                            <img height="24" src={require('assets/diamond.png')} />
                                            <Typography marginLeft={.5} marginRight={1} color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                                {cash == null ? (getStringLanguage("Carregando") + "...") : ((cash).toLocaleString('pt-BR'))}
                                            </Typography>
                                            <img height="24" src={require('assets/coin.png')} />
                                            <Typography color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                                {cashBonus == null ? (getStringLanguage("Carregando") + "...") : ((cashBonus).toLocaleString('pt-BR'))}
                                            </Typography>
                                           <Typography color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                                {shard == null ? (getStringLanguage("Carregando") + "...") : ((shard).toLocaleString('pt-BR'))}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <IconButton color="inherit"
                                        id="acc-menu-button"
                                        aria-controls={openAccMenu ? 'acc-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openAccMenu ? 'true' : undefined}
                                        onClick={handleClickAccMenu}>
                                        <ExpandMoreIcon color="action" />
                                    </IconButton>

                                    <Menu
                                        id="acc-menu"
                                        anchorEl={anchorEl}
                                        open={openAccMenu}
                                        onClose={handleCloseAccMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'acc-menu-button',
                                        }}>
                                        <MenuItem data-my-value={"password"} onClick={handleCloseAccMenu}>  <ListItemIcon>
                                            <LockIcon fontSize="small" />
                                        </ListItemIcon>
                                            <Typography variant="inherit" noWrap>
                                                {getStringLanguage("Alterar senha")}
                                            </Typography></MenuItem>
                                        <MenuItem data-my-value={"logout"} onClick={handleCloseAccMenu}>  <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                            <Typography variant="inherit" noWrap>
                                                {getStringLanguage("Sair")}
                                            </Typography></MenuItem>
                                    </Menu>

                                </Box>}
                            </Box>



                        </Box>

                    </Toolbar>
                </AppBar>}

                {<Drawer sx={{ display: mobile || user ? 'flex' : 'none' }} variant="permanent" open={open}>
                    {!mobile && <DrawerHeader>
                        <IconButton onClick={() => { }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>}
                    <Divider />
                    <List>
                        <ListItem key={0}
                            onClick={handleDrawer}
                            disablePadding sx={{
                                display: 'block',
                                background: theme.palette.background,
                                color: theme.palette.text.primary
                            }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: "white"
                                    }}>
                                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                                </ListItemIcon>

                            </ListItemButton>
                        </ListItem>
                    </List>
                    {mobile && open &&
                        <Box sx={{ width: 1 }} className="flex_col space_between align_center">

                            <Box className="flex_row align_center" >
                                <Box sx={{ cursor: 'pointer' }} onClick={() => { navigate(ROOT) }}>
                                    <img height="42" src={theme.palette.mode === 'dark' ? require('assets/logo.png') : require('assets/logo.png')} />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }} className="align_center">

                                <Box sx={{ marginY: 2 }} marginRight={2}>
                                    <Tooltip title={getStringLanguage("Alterar linguagem")}>
                                        <IconButton onClick={() => { changeLanguage() }}>
                                            <img width="25" src={require('assets/' + (language == 0 ? 'pt' : 'en') + '.png')} />
                                        </IconButton>
                                    </Tooltip>
                                    <Typography color={theme.palette.text.primary} variant="h10" sx={{ lineHeight: "15px" }}>
                                        <b>{getStringLanguage("Alterar linguagem")}</b>
                                    </Typography>
                                </Box>

                                {user == null && <Box sx={{ marginY: 2 }} className="flex_row align_center">
                                    <Button variant="text" sx={{ marginRight: '15px' }} color="secondary"
                                        onClick={() => { navigate(LOGIN) }}><b>{getStringLanguage('ENTRAR')}</b></Button>
                                    <Button variant="contained"
                                        onClick={() => { navigate(REGISTER) }}>{getStringLanguage('REGISTRE-SE')}</Button>
                                </Box>}

                                {user != null && <Box className="flex_row align_center">
                                    <Box marginY={2}>
                                        <Typography color={theme.palette.text.primary} variant="h10" sx={{ lineHeight: "15px" }}>
                                            <b>{user.userName}</b>
                                        </Typography>
                                        <Box className="flex_row align_center">
                                            <img height="24" src={require('assets/diamond.png')} />
                                            <Typography marginLeft={.5} marginRight={1} color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                                {cash == null ? (getStringLanguage("Carregando") + "...") : ((cash).toLocaleString('pt-BR'))}
                                            </Typography>
                                            <img height="24" src={require('assets/coin.png')} />
                                            <Typography color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                                {cash == null ? (getStringLanguage("Carregando") + "...") : ((cashBonus).toLocaleString('pt-BR'))}
                                            </Typography>
                                            <Typography color={theme.palette.text.primary} variant="subtitle2" sx={{ lineHeight: "15px" }}>
                                                {shard == null ? (getStringLanguage("Carregando") + "...") : ((shard).toLocaleString('pt-BR'))}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <IconButton color="inherit"
                                        id="acc-menu-button"
                                        aria-controls={openAccMenu ? 'acc-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openAccMenu ? 'true' : undefined}
                                        onClick={handleClickAccMenu}>
                                        <ExpandMoreIcon color="action" />
                                    </IconButton>

                                    <Menu
                                        id="acc-menu"
                                        anchorEl={anchorEl}
                                        open={openAccMenu}
                                        onClose={handleCloseAccMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'acc-menu-button',
                                        }}
                                    >
                                        <MenuItem data-my-value={"password"} onClick={handleCloseAccMenu}>  <ListItemIcon>
                                            <LockIcon fontSize="small" />
                                        </ListItemIcon>
                                            <Typography variant="inherit" noWrap>
                                                {getStringLanguage("Alterar senha")}
                                            </Typography></MenuItem>
                                        <MenuItem data-my-value={"logout"} onClick={handleCloseAccMenu}>  <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                            <Typography variant="inherit" noWrap>
                                                {getStringLanguage("Sair")}
                                            </Typography></MenuItem>
                                    </Menu>

                                </Box>}
                            </Box>


                        </Box>
                    }
                    <List>
                        {menus.map((menu, index) => (
                            <ListItem key={index}
                                onClick={() => { menuItemClick(menu.link) }}
                                disablePadding sx={{
                                    display: 'block',
                                    background: isSelected(menu.link) ? PRIMARY_COLOR : theme.palette.background,
                                    color: isSelected(menu.link) ? "white" : theme.palette.text.primary
                                }}
                                style={{ display: !menu.needUser || menu.needUser && user != null ? 'block' : 'none' }}
                            >

                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: isSelected(menu.link) ? "white" : theme.palette.text.primary
                                        }}>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {mobile && open && <Box sx={{ marginY: 2 }} className="flex_row align_center" >

                        <Button variant="text" startIcon={<img width="24" src={require('assets/discord.png')} />}
                            sx={{ marginLeft: '50px' }} color="secondary"
                            onClick={() => { openDiscord() }}><b>DISCORD</b></Button>

                    </Box>}
                </Drawer>}
                <Box className={theme.palette.mode == 'light' ? 'bg' : ''} component="main" sx={{
                    flexGrow: 1, p: 3,
                    flexDirection: 'column',
                    width: !mobile ? '100vw' : 'calc(100vw - 80px)',
                    display: 'flex', height: '100vh',
                    padding: '0'
                }}>
                    {!mobile && <DrawerHeader />}
                    <Box className='flex1'>
                        <Outlet />
                        <Footer />
                    </Box>
                </Box>
            </>}
        </Box >
    );
}
