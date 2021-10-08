import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {APP_TITLE} from "./constants";
import React from "react";
import Link from "@mui/material/Link";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                {APP_TITLE}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function AppFooter() {
    return <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
            {APP_TITLE}
        </Typography>
        <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
        >
            Something here to give the footer a purpose!
        </Typography>
        <Copyright />
    </Box>;
}
