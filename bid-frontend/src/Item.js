import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import {API_URL, APP_TITLE} from "./constants";
import {
    Alert,
    CardActions, Snackbar,
    ThemeProvider
} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {Link, useHistory, useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {AuthContext} from "./App";
import BidHistory from "./BidHistory";
import ItemDetail, {postBid} from "./ItemDetail";

const theme = createTheme();

function ItemDeta() {
    return null;
}


export default function Item(props){
    const { id } = useParams();
    const history = useHistory();
    const[item,setItem] = useState({});
    const[lastPrice,setLastPrice] = useState(0);
    const {token,userDetail,setUserDetail} = React.useContext(AuthContext);
    const [open,setOpen] = useState(false);
    const [alert,setAlert] = useState("");
    let interval;

    function handleAlertClose(){
        setOpen(!open);
    }

    return<ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert severity="info">{alert}</Alert>
        </Snackbar>
        <CssBaseline />
        <PrimarySearchAppBar title={APP_TITLE}/>
        <Card sx={{m:5}}>
            <CardContent>
                <Grid container >
                    <Grid item xs={12} sm={12} md={8} >
                        <ItemDetail id={id} lastPrice={lastPrice}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} >
                        <BidHistory id={id} lastHistory={(lastBid)=>{
                            setLastPrice(lastBid?.amount);
                        }}/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ pt:7 }}>
                <Button
                    onClick={()=>{
                        history.push("/");
                    }}
                    size="small">Cancel</Button>
            </CardActions>
        </Card>
    </ThemeProvider>
    }
