import React, {useEffect, useState} from "react";
import {AuthContext} from "./App";
import {Checkbox, FormControlLabel} from "@mui/material";
import {updateUser} from "./utils";
import CustomizedDialogs from "./CustomizedDialogs";

export default function AutoBid() {
    const[autoBid,setAutoBid]=useState(false);
    const {token,userDetail,setUserDetail} = React.useContext(AuthContext);

    useEffect(()=>{
        if(userDetail?.auto_bid) setAutoBid(userDetail?.auto_bid);
    },[userDetail]);

    return <>
        <FormControlLabel
            control={<Checkbox
                inputProps={{ 'aria-label': 'controlled' }}
                checked={Boolean(autoBid)}
                onChange={(event)=>{
                    const auto_bid = !autoBid;
                    setAutoBid(auto_bid);
                    updateUser({auto_bid}, setUserDetail);
                }}
            />} label={<span>Enable Auto Bid </span>} />
        <CustomizedDialogs open={false}/>
    </>;
}
