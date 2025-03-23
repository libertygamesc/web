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
import NavUser from 'components/NavUser';
import Nav from 'components/Nav';
import Sidenav from 'components/Sidenav';

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

export default function NewLayout() {

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const [open, setOpen] = React.useState(false);
    const [vote, setVote] = React.useState(true);
    const { user, menus, logout } = useAuth();

    const { cash, cashBonus } = useCash();
    const navigate = useNavigate();
    const { mobile, showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog,
        closeErrorDialog, showAlertDialog, closeAlertDialog,
        getStringLanguage, language, changeLanguage } = useLayout();


    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <Box>

            <Sidenav />
            <Nav />
            <Box sx={{ paddingTop: '45px' }}>
                <Outlet />
                <Box>
                    <Footer />
                </Box>
            </Box>

        </Box >
    );
}
