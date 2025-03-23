import * as React from 'react';
import { Paper, Typography, Box, Button, Divider, Grid, Badge } from "@mui/material";
import { useLayout } from 'providers/LayoutProvider';

export default function PaperHeader(props) {
    const { mobile, getStringLanguage } = useLayout();

    return (


        <Box className="flex_row align_center" sx={{ width: '100%'}}>
            {props.icon}
            <Box className="flex_row align_center" sx={{ flex: 1 }}>
                <Typography variant="h10" marginX={2}>
                    <b>{getStringLanguage(props.title)}</b>
                </Typography>

                <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }} />


                {/* <Typography variant="h10" sx={{ lineHeight: "15px" }}>
                    <b>{props.title}</b>
                </Typography>
                <Box className="flex_row align_center">
                    <Typography variant="subtitle2" sx={{ lineHeight: "15px" }}>
                        {props.subtitle}
                    </Typography>
                </Box> */}
            </Box>
        </Box>



    );
}