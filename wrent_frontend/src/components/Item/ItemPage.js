import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Image from './img/background.jpg';


const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6),
      },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    description: {
        width: '50%',
        marginTop: theme.spacing(3),
    },
    imageContainer: {
        width: '50%',
        maxHeight: '300px',
        marginTop: theme.spacing(3),
    },
    image: {
        maxHeight: '300px'
    },
    ownerData: {
        maxHeight: '300px',
        width: '50%'
    },
    rentButton: {
        width: '12%',
        height: '50px'
    },
}));

export default function ItemPage() {
    const classes = useStyles();

    var id = "";
    //var image = {Image};
    var description = "Donec interdum dolor sed finibus posuere. Curabitur dignissim tellus et ultrices rutrum. Curabitur vestibulum, nisi ac faucibus posuere, leo ipsum ultricies enim, ut consequat quam erat et velit. Nulla id mauris neque. Mauris dui velit, scelerisque in elit et, fringilla tristique augue. Sed feugiat tellus velit, sed maximus ipsum posuere vel. Pellentesque cursus finibus lacus in blandit. Nam auctor risus quis diam vestibulum, sed ornare mi pharetra. Aenean lectus est, malesuada luctus leo eu, eleifend pretium diam. Donec lacinia, arcu vitae tempor accumsan, quam turpis tristique est, quis pulvinar metus nunc at purus. Vivamus efficitur sapien eu laoreet scelerisque. Praesent lobortis est nulla, non dignissim tellus luctus quis. Praesent sed lectus ut neque semper porttitor. Curabitur eu ex sapien. Etiam vitae augue tortor. Sed magna tortor, pretium vestibulum orci ut, tincidunt imperdiet dolor.";
    var ownerId = "";
    var name = "Item Name";
    var location = "";
    var rating = "";

    return (
        <Container component="main" maxWidth="xs=12">
            <CssBaseline />
            <Paper className={classes.paper}>
                
                <Grid container direction="row" justify='flex-start' alignItems="center">
                    <Typography variant='h3'>
                        {name}
                    </Typography>
                </Grid>

                <Grid container direction="row" justify='flex-start' alignItems="center">
                    <Button className={classes.rentButton} variant='contained' color='Primary'>Rent Item</Button>
                    <Button className={classes.rentButton} variant='outlined' color='secondary'>Add To Cart</Button>
                </Grid>

                <Grid container direction="row" justify='flex-start' alignItems="flex-start">
                    <Grid item className={classes.description}>
                        
                        <Typography variant='body1'>{description}</Typography>
                    </Grid>
                    <Grid item className={classes.imageContainer}>
                        <img className = {classes.image} src={Image} class="img-Rounded"></img>
                    </Grid>
                </Grid>

                <Grid container direction='row' justify='flex-start' alignItems="center">
                    <Grid className={classes.ownerData} item justify='center' alignItems='center'>
                        <Grid container direction='row' justify='flex-start' alignItems="flex-start">
                            <Typography variant='h5'>Owner Info</Typography>
                        </Grid>
                        <Grid container direction='row' justify='flex-start' alignItems="flex-start">
                            <Grid item>
                                <Avatar>JD</Avatar>
                                <Typography variant='h6'>John Doe <Button variant='text' color='secondary'>Contact Owner</Button></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        TODO Map 
                    </Grid>
                </Grid>
                
            </Paper>
        </Container>
    );
}