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
import {getUser} from "../helpers/UserController"
import {fetchItem} from "../helpers/ItemController"
import {fetchLocation} from "../helpers/LocationController"


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
        width: '60%',
        height: '400px',
        marginTop: theme.spacing(3),
    },
    image: {
        maxHeight: '100%'
    },
    ownerData: {
        maxHeight: '300px',
        width: '50%'
    },
    rentButton: {
        width: '12%',
        height: '50px'
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
}));

export default function ItemPage(props) {
    const classes = useStyles();

    const [item, setItem] = useState({});
    const [location, setLocation] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getItem = async () => {
        //   const itemFromServer = await fetchItem()
          const itemFromServer = await fetchItem(props.params['id'])
          setItem(itemFromServer)
          return itemFromServer['location']
        }
        const getLocation = async (loc) => {
            const locFromServer = await fetchLocation(loc)
            setLocation(locFromServer)
            return locFromServer
        }
        getItem().then((res) => { getLocation(res) })
      }, [])

      useEffect(async () => {
        const res = await getUser();
        setUser(res['id']);
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
      }

    var id = item['id'];
    var description = item['description'];
    var url = item['imageURL'];
    var ownerId = item['ownerId'];
    var name = item['name'];
    var rating = item['rating'];

    return (
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
                        {/* <img className = {classes.image} src={Image} class="img-Rounded"></img> */}
                        <img className = {classes.image} width='100%' height='90%' src={url} class="img-Rounded"></img>
                    </Grid>
                </Grid>

                <Grid container direction="row" justify='center' alignItems="center">
                    <Button className={classes.rentButton} variant='contained' color='Primary'>Rent Item</Button>
                    <Button className={classes.rentButton} variant='outlined' color='secondary'>Add To Cart</Button>
                    <Button href={`/map/${location['lat']}/${location['lon']}`} className={classes.rentButton}>View On Map</Button>
                </Grid>

                <Grid container direction="row" justify='center' alignItems="center">

                    <Grid item className={classes.description} justify='center' alignItems="flex-start">
                        <Typography variant='body1'>{description}</Typography>
                    </Grid>

                    <Grid className={classes.ownerData} item justify='center' alignItems='center'>
                        <Grid container direction='row' justify='center' alignItems="flex-start">
                            <Typography variant='h5'>Owner Info</Typography>
                        </Grid>
                        <Grid container direction='row' justify='center' alignItems="flex-start">
                            <Grid item>
                                <Avatar>JD</Avatar>
                                <Typography variant='h6'>John Doe <Button variant='text' color='secondary'>Contact Owner</Button></Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                
                <Grid container direction='row' justify='center' alignItems="center">
                    <Typography variant='h5'>Reviews</Typography>
                </Grid>

                <Grid container direction='row' justify='center' alignItems="center">
                    <FormControl fullWidth>
                        <TextField id="outlined-basic" label="Enter Review" variant="outlined" />
                    </FormControl>
                </Grid>
                
                
            </Paper>
        </Container>
    );
}