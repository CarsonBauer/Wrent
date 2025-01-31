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
import FormControl from "@material-ui/core/FormControl";
import Image from './img/background.jpg';
import GoogleMap from "../auth/GoogleMap";
import { getUser } from "../helpers/UserController"
import { fetchItem } from "../helpers/ItemController"
import { fetchLocation } from "../helpers/LocationController"
import Authorization from "../auth/Authorization"
import {getRentalItem} from "../helpers/RentalController"
import { PayPalButton } from "react-paypal-button-v2";
import { CenterFocusStrong } from '@material-ui/icons';
import { Hidden } from '@material-ui/core';
import { postRefund } from '../helpers/RefundController';

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
        height: '100%',
        marginTop: theme.spacing(3),
    },
    description: {
        width: '75%',
        //marginTop: theme.spacing(3),
    },
    imageContainer: {
        width: '60%',
        height: '400px',
        marginTop: theme.spacing(3),
        justify: 'center',
        overflow: 'hidden',
        alignItems: 'center',
        //position: 
    },
    image: {
        maxHeight: '100%',
        justify: 'center',
        alignItems: 'center',
    },
    ownerData: {
        maxHeight: '300px',
        width: '50%'
    },
    rentButton: {
        width: '12%',
        height: '50px'
    },
    paymentBtns: {
        width: '50%%',
    },
    leftCol: {
        maxHeight: '300px',
        width: '50%'
    },
    rightCol: {
        width: '50%',
        maxHeight: '300px',
    },
    reviwplaceholder: {
        width: '50%',
        height: '300px',
    },
    payment:{
        width: '25%'
    },
    price:{
        marginRight: '10%',
    },
    mapBtn:{
        minWidth: '100px',
    },
}));

export default function ItemPage(props) {
    const classes = useStyles();

    const [item, setItem] = useState({});
    const [location, setLocation] = useState({});
    const [user, setUser] = useState(null);
    const [rented, setRented] = useState(false);

    useEffect(() => {
        const getItem = async () => {
            const itemFromServer = await fetchItem(props.params['id'])
            setItem(itemFromServer)
            return itemFromServer['location']
        }
        const getLocation = async (loc) => {
            const locFromServer = await fetchLocation(loc)
            setLocation(locFromServer)
            return locFromServer
        }
        const fetchUser = async () => {
            const res = await getUser();
            setUser(res['id']);
            return res['id'];
        }
        const fetchRental = async (u) => {
            console.log(u + " " + props.params['id'])
            const rental = await getRentalItem(u, props.params['id'])
            if (rental['statusCode'] == 200) {
                setRented(true)
            }
        }
        getItem().then((res) => { getLocation(res).then(() => { fetchUser().then((res) => { fetchRental(res) }) }) })
    }, [])

    const createRental = async () => {
        await fetch('/rentals', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
            },
            body: JSON.stringify({
                "renterId": user,
                "itemId": item['id']
            })
        })
        setRented(true)
    }

    const applyRefund = async () => {
        await postRefund(user, item.id)
    }

    var id = item['id'];
    var description = item['description'];
    var url = item['imageURL'];
    var ownerId = item['ownerId'];
    var name = item['name'];
    var rating = item['rating'];

    return (
        <Authorization>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Paper className={classes.paper}>

                    <Grid container direction="row" justify='center' alignItems="center">
                        <Typography variant='h3'>
                            {name}
                        </Typography>
                    </Grid>

                    <Grid container direction="row" justify='center' alignItems="center">
                        <Grid item className={classes.imageContainer} justify='center' alignItems="center">
                            <img className={classes.image} width='100%' height='90%' src={url} class="img-Rounded"></img>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justify='center' alignItems="center">
                        <Grid className = {classes.price}>
                            {item.price &&
                                <Typography textAlign="center" variant="h5" color="textSecondary" component="p">
                                    Price: ${item.price.toFixed(2)}
                                </Typography>
                            }
                        </Grid>

                        <Grid direction="row" justify='left' alignItems="center">
                            <Button className={classes.mapBtn} href={`/map/${location['lat']}/${location['lon']}`} variant="contained" color="primary">Map</Button>
                        </Grid>

                    </Grid>

                    

                    <Grid container direction="row" justify='flex-start' alignItems="center">
                        
                        <Grid item className={classes.description} justify='flex-start' alignItems="flex-start">
                            <Typography variant='body1'>{description}</Typography>
                        </Grid>

                        <Grid className={classes.payment} direction="row" justify='center' alignItems="center">
                            <>
                            {!rented ? 
                            <PayPalButton 
                                amount = {item.price}
                                currency = {'USD'}
                                onSuccess = { createRental }
                                options={{
                                    clientId: process.env.REACT_APP_PAYPAL_CLIENT
                                }}
                            />
                            : 
                            <Button onClick={applyRefund} className={classes.rentButton} variant='contained' color='Primary'>Refund</Button>}
                            </>
                        </Grid>

                        {/*<Grid className={classes.ownerData} item justify='center' alignItems='center'>
                            <Grid container direction='row' justify='center' alignItems="flex-start">
                                <Typography variant='h5'>Owner Info</Typography>
                            </Grid>
                            <Grid container direction='row' justify='center' alignItems="flex-start">
                                <Grid item>
                                    <Avatar>JD</Avatar>
                                    <Typography variant='h6'>John Doe <Button variant='text' color='secondary'>Contact Owner</Button></Typography>
                                </Grid>
                            </Grid>
                        </Grid>*/}
                    </Grid>
                </Paper>
            </Container>
        </Authorization>
    );
}