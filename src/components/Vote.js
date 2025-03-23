import * as React from 'react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useLayout } from 'providers/LayoutProvider';

export default function Vote(props) {

    React.useEffect(() => { }, [])

    const { getStringLanguage, language } = useLayout();


    return (
        <Box className="flex_col" sx={{ padding: '15px', height: '100%' }} >
            <Box>
                <Typography variant="h10" sx={{ lineHeight: "15px", textAlign: 'center' }}>
                    {getStringLanguage("Seu voto é muito importante, ajude nos a manter no toplist, vote a todo momento.")}
                </Typography>

                <Box marginY={2} className="flex_row align_center space_between">
                    <div>
                        <a href="https://www.xtremetop100.com/in.php?site=1132374581">
                            <img src="https://www.xtremeTop100.com/votenew.jpg" border="0" alt="private server" /></a>
                    </div>
                    <div>
                        <a href="https://www.arena-top100.com/index.php?a=in&u=cabalclassicbr"><img src="https://www.arena-top100.com/images/vote/cabal-private-servers.png" alt="Cabal Online Private Servers" width="88" height="53" /></a>
                    </div>
                    <div>
                        <a href="https://topg.org/pt/servidores-cabal-privados/server-656073" target="_blank"><img src="https://topg.org/topg.gif" width="88" height="53" border="0" alt="Cabal Liberty - Cabal servidor privado (PT)" /></a>
                    </div>
                </Box>
            </Box>
        </Box >
    );
}