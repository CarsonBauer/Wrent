import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WrentLogo from './wrentLogo';
import { Redirect } from 'react-router';
import GoogleLogin from 'react-google-login';
import plusIcon from '../../../src/plusIcon.png';
import userImage from '../../../src/userImage.png';
import userBackground from '../../../src/userBackground.jpg';
import Map from './Map';
import GoodMap from './GoogleMap';
import Item from './../home/Item';
import GoogleMap from './GoogleMap';
import Card from "@material-ui/core/card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, requirePropFactory } from "@material-ui/core";
import { getUser } from '../helpers/UserController';
import { fetchItem } from "../helpers/ItemController"
import { fetchLocation } from "../helpers/LocationController"
import { CenterFocusWeakTwoTone } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    Container: {
    },
    paper: {
        border: '10px solid #6f6cb2',
        width: '80%',
        height: '100%',
        color: '#4E4BA6',
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '40px',
    },
    d1: {
        //paddingLeft: '5%',
        fontSize: '25px',
        color: 'purple',
        //float: 'right',
        //width: "40%",
        //border: '10px #4E4BA6',
        //borderRadius: '5px',
        //marginRight: '60px',
    },
    t2: {
        //width: '30%',
        //borderTop: '10px',
        //borderBottom: '10px',
        fontSize: '25px',
        //font: 'italic',
        //textShadow: '10%',
        color: 'purple',
        //backgroundColor: '#679ece',
        //borderRadius: '5px',
        //padding: '8px',
        paddingLeft: '15%',
    },
    t3:
    {
        //width: '30%',
        //borderTop: '10px',
        //borderBottom: '10px',
        //fontSize: '25px',
        color: 'purple',
        //backgroundColor: '#679ece',
        //borderRadius: '5px',
        //padding: '8px',
        paddingLeft: '15%',

    },
    t4:
    {
        //width: '30%',
        //borderTop: '10px',
        //borderBottom: '10px',
        fontSize: '20px',
        color: 'purple',
        //backgroundColor: '#679ece',
        //borderRadius: '5px',
        //padding: '8px',
        paddingLeft: '15%',
        //maiginLeft: '15%',
        //textAlign: 'center',
    },
}));

export default function UserProfile(props) {





    const classes = useStyles();

    function changeBackground(e) {
        e.target.style.background = '#997cb3';
    }

    function changeBackground2(e) {
        e.target.style.background = '#679ece';
    }

    const [items, setItems] = useState([]);
    const [item, setItem] = useState({});
    // const [users, setUsers] = useState([]);
    const [users, setUser] = useState({});

    const [location, setLocation] = useState({});

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
        setUser(res);
    }, [])

    const fetchUsers = async () => {
        const res = await fetch('/users', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await res.json();
        return data
    }

    return (
        <Container component="main" maxWidth="xs">

            <Paper className={classes.paper}>
                <WrentLogo className={classes.l1} />
                <Button className={classes.t2} component="h1" variant="h5">
                    USER PROFILE
                </Button>
                <br />
                <br />
                <Button className={classes.t3} component="h1" variant="h5">
                    Name :  &nbsp; &nbsp; {users.name}
                    {users.lastName} &nbsp; &nbsp; {users.firstName}
                </Button>
                <br />
                <br />
                <Button className={classes.t4} component="h1" variant="h5">
                    Email :  &nbsp; &nbsp; {users.email}
                </Button>
                <br />
                <br />
                <div >
                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    <Button className={classes.d1} href={`/map/${location['lat']}/${location['lon']}`} >View On Map</Button>
                </div>
                <>
                    {items.map((item, i) => (
                        <Grid item xs={2}>
                            <Item id={item.id} name={item.name} description={item.desc} />
                        </Grid>
                    ))}
                </>
            </Paper>
            <br />
        </Container >

    );
}