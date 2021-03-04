import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import card from "@material-ui/core/card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { CardActionArea, requirePropFactory } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Img from "./Icon.png";

const useStyles = makeStyles({
    root:{
        maxWidth: 345,
    },
    media: {
        height: 100,
    },
    paper:{
        maxWidth: 345,
    }
});

export default function item(){

    const classes = useStyles;

    return(

        <Paper className={classes.paper}>
            <card className={CallMissedSharp.root}>
                <CardActionArea>
                    <CardMedia 

                        className={classes.media}
                        src={Img}
                        component="img"
                        title="Item for rent"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Item
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This is a tile to represent an item to rent
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                        <Button size="small" color="primary">
                        Renter profile
                        </Button>
                    </CardActions>
                </CardActionArea>
            </card>
        </Paper>

    );

}