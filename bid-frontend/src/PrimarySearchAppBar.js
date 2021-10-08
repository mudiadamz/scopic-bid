import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {APP_TITLE} from "./constants";
import {AuthContext} from "./App";

export default function PrimarySearchAppBar() {
    const{token,userDetail}=React.useContext(AuthContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <a href={'/'} style={{color:"white",textDecoration:"none"}}>{APP_TITLE}</a>
                    </Typography>

                    {!token&&<Button onClick={()=>window.location.href="/login"} color="inherit">Login</Button>}
                    {token&&<>
                        ({userDetail?.name})
                        <Button onClick={()=>{
                            localStorage.removeItem("token");
                            window.location.href="/";
                        }} color="inherit">Logout</Button>
                    </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
