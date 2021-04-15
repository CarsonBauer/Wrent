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
import UserProfile from "../auth/UserProfile";


//import Img from "./Icon.png";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%"

    },
    media: {
        maxHeight: 140,
        minHeight: 140
    },
    title: {
        height: 70,
        overflow: "hidden",
        textOverflow: "ellipsis"
    }

});

export default function Item({ id, name, description, img, userid }) {

    const classes = useStyles()

    const [state, setState] = useState('start')



    return (

        <Paper>
            <Card className={classes.root}>
                <Button href={"/item/" + id}>
                    <CardActionArea>

                        <CardMedia

                            className={classes.media}
                            src={img}
                            component="img"
                            title="Item for rent"
                        />

                        <CardContent>
                            <Typography className={classes.title} textAlign="center" gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button href={"/item/" + id} variant="contained" size="small" color="primary">
                                Learn More
                        </Button>
                            <Button href={"/detailprofile/" + userid} size="small" color="primary">
                                Renter profile
                            </Button>
                        </CardActions>
                    </CardActionArea>
                </Button>
            </Card>
        </Paper >

    );

}