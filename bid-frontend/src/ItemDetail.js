import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Alert, FormControl, InputAdornment, InputLabel, OutlinedInput, Snackbar
} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {API_URL} from "./constants";
import axios from "axios";
import {AuthContext} from "./App";
import AutoBid from "./AutoBid";

export function postBid(id,amount,token) {
    const fullUrl = `${API_URL}/api/bid/${id}`;
    return axios.post( fullUrl, {amount}, {headers: { 'authorization': 'Bearer '+token }} )
}

export default function ItemDetail({id,lastPrice}) {
    const[data,setData] = useState({});
    let [newPrice,setNewPrice] = useState(lastPrice);
    const [openBidPrice,setOpenBidPrice] = useState(0);
    const {token,userDetail,setUserDetail} = React.useContext(AuthContext);
    const [open,setOpen] = useState(false);
    const [alert,setAlert] = useState("");

    function handleBid(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const amount = data.get("amount");
        postBid(id, amount,token)
            .then(({data}) => {
                setOpen(!open);
                setAlert("Bid submited!");
                setNewPrice(amount);
            }).catch(({response})=>{
                const { status, data:{message,last_bid} } = response;
                setOpen(!open);
                setAlert(message);
                if(status===401) window.location.href=`/login?ref=/item/${id}`;
            });
    }
    function handleAlertClose(){
        setOpen(!open);
    }

    useEffect(()=>{
        axios.get( `${API_URL}/api/items/${id}` )
            .then(({data}) => {
                const{last_price} = data;
                setData(data);
                setNewPrice(last_price);
                setOpenBidPrice((parseFloat(last_price)||0)+1);
            }).catch(({response})=>{
            });
    },[]);

    const{  image,name,description,start_price,last_price}=data;
    return <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert severity="info">{alert}</Alert>
        </Snackbar>
        <div>
            <img style={{width:400,height:400,maxWidth:100+'%'}} src={image} alt="thumbnail"/>
        </div>
        <Typography gutterBottom variant="h5" component="div">{name}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography color={"green"}>Price: $ {`${start_price}`}<br/></Typography>
        <Typography color={"tomato"}> Last Bid: $ {`${newPrice}`} </Typography>
        <Box
            sx={{ mt: 5 }}>
            <Box
                component="form" noValidate
                onSubmit={handleBid}>
                <FormControl  sx={{ mr: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        name="amount"
                        id="outlined-adornment-amount"
                        type="number"
                        min={openBidPrice}
                        value={openBidPrice}
                        onChange={(e)=>{
                            setOpenBidPrice(parseFloat(e.target.value)||0);
                        }}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>
                <Button
                    type={"submit"}
                    sx={{ mr: 1 }}
                    onClick={()=>{
                    }}
                    size="large"
                    variant={"contained"}
                    color={"success"}>Submit Bid</Button>
            </Box>
            <AutoBid />
        </Box>
    </>;
}
