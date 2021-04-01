import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { CardActionArea, requirePropFactory } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
//import Img from "./Icon.png";

const useStyles = makeStyles({
    root: {
        //width: "100%",
        height: 500
    },
    media: {
        height: 20,
    },

});

export default function item({ id, name, description, img, userid }) {

    const classes = useStyles;

    return (

        <Paper className={classes.root}>
            <card>
            <Button href={"/item/" + id}>
                <CardActionArea>
                    
                        <CardMedia

                            className={classes.media}
                            src={img}
                            component="img"
                            title="Item for rent"
                        />
                    
                    <CardContent>
                        <Typography textAlign="center" gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography textAlign="center" variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button href={"/item/" + id} variant="contained" size="small" color="primary">
                            Learn More
                        </Button>
                        <Button href={"/userprofile/" + userid} size="small" color="primary">
                            Renter profile
                        </Button>
                    </CardActions>
                </CardActionArea>
                </Button>
            </card>
        </Paper>

    );

}