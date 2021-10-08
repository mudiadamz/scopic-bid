import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";

export default function CardItem({data}) {
    const history = useHistory();
    const{id,image,name,description,last_price,start_price}=data;
    return <Grid item xs={12} sm={6} md={3}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                sx={{
                    // 16:9
                    // pt: '56.25%',
                }}
                image={`${image}?${id}`}
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {`${name.substring(0,30)}`}
                </Typography>
                <Typography>
                    {`${description.substring(0,60)}`}
                </Typography>
                <Typography color={"green"}>
                    Price: $ {`${start_price}`}<br/>
                </Typography>
                <Typography color={"tomato"}>
                    Last Bid: $ {`${last_price}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={()=>{
                        history.push(`/item/${id}`);
                    }}
                    size="small" variant={"contained"} color={"success"}>Bid Now</Button>
            </CardActions>
        </Card>
    </Grid>;
}
