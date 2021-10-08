import Typography from "@mui/material/Typography";
import {Alert, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "./constants";
import {postBid} from "./ItemDetail";
import {AuthContext} from "./App";

export default function BidHistory({id, lastHistory}) {
    const [data,setData] = useState([]);
    const {token,userDetail,setUserDetail} = React.useContext(AuthContext);
    const [open,setOpen] = useState(false);
    const timeoutRef = React.useRef(null);
    let interval;

    function handleAlertClose(){
        setOpen(!open);
    }

    function fetchBidHistory() {
        axios.get( `${API_URL}/api/bid_history/${id}` )
            .then(({data:{data}}) => {
                const lastBid = data[0];
                let newBid = parseFloat(lastBid?.amount)||0;
                if(newBid>0) newBid=newBid+1;
                if(userDetail?.auto_bid&&userDetail?.max_bid===0)
                    setOpen(true);
                if(typeof userDetail?.id!=="undefined"
                    && lastBid?.user_id!==userDetail?.id
                    && userDetail?.auto_bid===1
                    && newBid <= userDetail?.max_bid){
                    //do auto bid
                    console.log("autobid")
                    postBid(id, newBid, token);
                }
                setData(data);
                lastHistory(lastBid);
            }).catch(({response})=>{
            });
    }

    // useEffect(()=>{
    //     fetchBidHistory();
    // },[]);

    useEffect(()=>{
        function loadHistory(){
            fetchBidHistory();
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(()=> {
                timeoutRef.current = null;
                loadHistory();
            },5000);
        }
        loadHistory();
    },[userDetail]);

    return <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert severity="info">You must configure max bet!</Alert>
        </Snackbar>
        <Typography gutterBottom variant="h5" component="div">
            Latest bid
        </Typography>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead sx={{background:"#e5e5e5"}}>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length===0&&<tr><td colSpan={2}>No bid!</td></tr>}
                    {
                        data.map(({user_name,amount},i)=>{
                            return (<TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="td" scope="row">
                                    {user_name}
                                </TableCell>
                                <TableCell component="td" scope="row" align="right">
                                    {amount}
                                </TableCell>
                            </TableRow>);
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
}
