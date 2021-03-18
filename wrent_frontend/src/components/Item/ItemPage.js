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
import GoogleMap from "../auth/GoogleMap";


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

    useEffect(() => {
        const getItem = async () => {
          const itemFromServer = await fetchItem()
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
    
      const fetchItem = async () => {
        const res = await fetch('/items/'+props.params['id'], {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })
        const data = await res.json();
        return data
      }

      const fetchLocation = async (loc) => {
          const res = await fetch('/locations/'+loc, {
              method: 'GET',
              headers: {
                  'Content-type': 'application/json'
              }
          })
          const data = await res.json();
          return data
      }

    var id = item['id'];
    var description = item['description'];
    var ownerId = item['ownerId'];
    var name = item['name'];
    var rating = item['rating'];

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
                    <Button href={`/map/${location['lat']}/${location['lon']}`} className={classes.rentButton}>Find Item</Button>
                </Grid>

                <Grid container direction="row" justify='flex-start' alignItems="flex-start">
                    <Grid item className={classes.description}>
                        
                        <Typography variant='body1'>{description}</Typography>
                    </Grid>
                    <Grid item className={classes.imageContainer}>
                        <img className = {classes.image} src={Image} class="img-Rounded"></img>
                    </Grid>
                </Grid>

                <Grid container direction='row' justify='flex-start' alignItems="flex-start">
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
                    <Grid Item>
                    <Typography variant='h5'>Map</Typography>
                    </Grid>
                </Grid>
                
                <Grid container direction='row' justify='center' alignItems="center">
                    <Typography variant='h5'>Reviews</Typography>
                </Grid>

                <Grid container direction='row' justify='center' alignItems="center">
                    <Grid item className={classes.reviwplaceholder}></Grid>
                </Grid>
                
            </Paper>
        </Container>
    );
}