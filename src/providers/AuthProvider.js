import { ACCOUNT, CHARACTERS, DAILY, DONATE, DOWNLOADS, KIT, LAUNCHER, LOGIN, LOTTERY, MERCADO_PAGO, MISSION_DAILY, PASS, PASSWORD, RANKINGS, REGISTER, ROOT, SHOP, SHOP_BONUS, SHOP_WAR, SPIN, VERIFY, VERIFY_KEY, VIDEOS, VIP } from 'navigation/CONSTANTS';
import React, { createContext, useContext, useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { getLocalUser } from 'services/authServices';
import { getAccount } from 'services/accountService';
import { useLayout } from 'providers/LayoutProvider';
import { useNavigate } from 'react-router-dom';
import { useCash } from './CashProvider';
import GroupIcon from '@mui/icons-material/Group';
import RedeemIcon from '@mui/icons-material/Redeem';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ShieldIcon from '@mui/icons-material/Shield';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WalletIcon from '@mui/icons-material/Wallet';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const authContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const { loading, setLoading, getStringLanguage } = useLayout();

    const { updateCash } = useCash();
    const [menus, setMenus] = useState([
        { label: "Início", icon: <HomeIcon />, link: ROOT, needUser: false },
        { label: getStringLanguage("Minha Conta"), icon: <AccountCircleIcon />, link: ACCOUNT, needUser: true },
        { label: getStringLanguage("Personagens"), icon: <GroupIcon />, link: CHARACTERS, needUser: true },
        { label: "VIP", icon: <WorkspacePremiumIcon />, link: VIP, needUser: true },
        { label: getStringLanguage("Kit Iniciante"), icon: <RedeemIcon />, link: KIT, needUser: true },
        { label: getStringLanguage("Cash Shop"), icon: <StoreOutlinedIcon />, link: SHOP, needUser: true },
        { label: getStringLanguage("Recarga"), icon: <AddReactionIcon />, link: MERCADO_PAGO, needUser: true },
         { label: getStringLanguage("Roleta da sorte"), icon: <DonutSmallIcon />, link: SPIN, needUser: true },
        { label: "Downloads", icon: <DownloadIcon />, link: DOWNLOADS, needUser: false },
        { label: "Rankings", icon: <EmojiEventsIcon />, link: RANKINGS, needUser: false },
        { label: "Medias", icon: <VideoLibraryIcon />, link: VIDEOS, needUser: false }
    ]);

    useEffect(() => {
        const user = getLocalUser();
        /// setLoading(true);
        if (user != null) {
            getAccount()
                .then((res) => {
                    //    setLoading(false);
                    window.scrollTo(0, 0);
                    setUser(res)
                    updateCash();
                })
                .catch((err) => {
                    logout();
                });
        } else {
            setUser(null);
            //    setLoading(false);
            if (window.location.pathname != ROOT && window.location.pathname != LOGIN &&
                window.location.pathname.indexOf(REGISTER) < 0 && window.location.pathname.indexOf(VERIFY) < 0 && window.location.pathname.indexOf('/password') < 0
                && window.location.pathname != LAUNCHER && window.location.pathname != RANKINGS && window.location.pathname != DOWNLOADS) {
                window.location.href = ROOT;
            }
        }
    }, [])

    const logout = () => {
        setLoading(false);
        setUser(null);
        window.scrollTo(0, 0);
        localStorage.setItem("user", null);
        if (window.location.pathname != ROOT) {
            window.location.href = ROOT;
        }
    }

    return (
        <authContext.Provider value={{ user, setUser, menus, logout }}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
