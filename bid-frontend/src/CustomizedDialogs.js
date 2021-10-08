import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from "@mui/material/Grid";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import axios from "axios";
import {API_URL} from "./constants";
import {AuthContext} from "./App";
import {useEffect} from "react";
import BootstrapDialogTitle from "./BootstrapDialogTitle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(props.open);
    const [max_bid, setMax_bid] = React.useState(0);
    const {token,userDetail,setUserDetail} = React.useContext(AuthContext);

    function handleClickOpen(){
        setOpen(true);
    }
    function handleSubmit(){
        axios.post( `${API_URL}/api/user/update`, {max_bid}, {headers: { 'authorization': 'Bearer '+token }} )
            .then(({data}) => {
                setUserDetail(data);
            }).catch(({response})=>{
            const { status, data:{message,last_bid} } = response;
            if(status===401) window.location.href=`/login`;
        });
        setOpen(false);
    }
    useEffect(()=>{
        if(userDetail?.max_bid)
            setMax_bid(userDetail?.max_bid);
    },[userDetail]);

    return (<>
            <Button onClick={handleClickOpen}>
                <SettingsIcon/> Configure
            </Button>
            <div>
                <BootstrapDialog
                    fullWidth={true}
                    onClose={handleSubmit}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleSubmit}>
                        Auto Bid Configuration
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Maximum bid amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={max_bid}
                                        onChange={(e)=>{
                                            setMax_bid(parseFloat(e.target.value)||0);
                                        }}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleSubmit}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
    </>
    );
}
