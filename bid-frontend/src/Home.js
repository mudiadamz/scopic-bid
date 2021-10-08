import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TablePaginationDemo from "./TablePaginationDemo";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {API_URL, APP_TITLE} from "./constants";
import Link from "@mui/material/Link";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {FilterContext} from "./App";
import CardItem from "./CardItem";
import AppFooter from "./AppFooter";

const theme = createTheme();

export default function Home(props){
    const{title } = props;
    const history = useHistory();
    const[items,setItems]=useState([]);
    const[totalItems,setTotalItems]=useState(0);
    const {filter} = React.useContext(FilterContext);

    useEffect(()=>{
        const queryParam = Object.keys(filter||{}).map((val,i)=>{
            let param = i>0?"&":"?";
            param += `${val}=${filter[val]}`;
            return param;
        }).join("");
        const fullUrl = `${API_URL}/api/items${queryParam}`;

        axios.get( fullUrl )
            .then(({data})=>data)
            .then(({data,total}) => {
                setItems(data);
                setTotalItems(total);
            }).catch(({response})=>{

        })
    },[filter]);

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrimarySearchAppBar title={APP_TITLE}/>
        <main>
            <Box sx={{ bgcolor: 'background.paper', pt: 8, }} >
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Competitive bidding helps the buyers get the products with best price.
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 4 }} maxWidth="md">
                <TablePaginationDemo total={totalItems} />
                <Grid container spacing={4}>
                    {items.length===0&&<span>No data!</span>}
                    {items.map((data,index) => {
                        return (
                            <CardItem key={index} data={data} />
                        )
                    })}
                </Grid>
            </Container>
        </main>

        <AppFooter/>
    </ThemeProvider>
}