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


const useStyles = makeStyles((theme) => ({
    paper: {
        border: '10px solid #6f6cb2',
        width: '300%',
        color: '#4E4BA6',
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '30px',
        marginLeft: '-400px',
    },
    d1: {
        paddingLeft: '15px',
        fontSize: '30px',
        color: 'black',
        float: 'right',
        width: "40%",
        border: '10px #4E4BA6',
        borderRadius: '5px',
        marginRight: '60px',
    },
    t1:
    {
        width: '70%',
        borderTop: '10px',
        borderBottom: '10px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: '#679ece',
        borderRadius: '5px',
        padding: '8px',
        paddingLeft: '30px',
        textAlign: 'center',
    },
    t2: {
        width: '30%',
        borderTop: '10px',
        borderBottom: '10px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: '#679ece',
        borderRadius: '5px',
        padding: '8px',
        paddingLeft: '80px',
    },
    t3:
    {
        width: '30%',
        borderTop: '10px',
        borderBottom: '10px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: '#679ece',
        borderRadius: '5px',
        padding: '8px',
        paddingLeft: '80px',

    },
    t4:
    {
        width: '30%',
        borderTop: '10px',
        borderBottom: '10px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: '#679ece',
        borderRadius: '5px',
        padding: '8px',
        paddingLeft: '80px',
    }
}));

export default function DetailProfile(props) {

    const userid = props['userid'];
    async function getDetailUser() {
        const res = await fetch('/' + userid + '/get', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
            }
        });
        const res_json = await res.json();
        return res_json;
    }



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
        const res = await getDetailUser();
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
            <br />
            <Paper className={classes.paper}>
                <div className={classes.d1}>
                    <Typography className={classes.t1} onMouseOut={changeBackground2} onMouseOver={changeBackground} component="h1" variant="h5">
                        Map
                </Typography>
                    <br />
                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                    <Button href={`/map/${location['lat']}/${location['lon']}`} >View On Map</Button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <>
                    {items.map((item, i) => (
                        <Grid item xs={2}>
                            <Item id={item.id} name={item.name} description={item.desc} />
                        </Grid>
                    ))}
                </>
                <Typography className={classes.t2} onMouseOut={changeBackground2} onMouseOver={changeBackground} component="h1" variant="h5">
                    User Profile
                </Typography>
                <br />
                <br />
                <Typography className={classes.t3} onMouseOut={changeBackground2} onMouseOver={changeBackground} component="h1" variant="h5">
                    {/* UserName :  &nbsp; &nbsp;&nbsp;&nbsp; {users.name} */}
                    User Name :  &nbsp; &nbsp;&nbsp;&nbsp; {users.name}
                    {users.lastName} &nbsp; &nbsp;&nbsp;&nbsp; {users.firstName}
                </Typography>
                <br />
                <br />
                <Typography className={classes.t4} onMouseOut={changeBackground2} onMouseOver={changeBackground} component="h1" variant="h5">
                    Email :  &nbsp; &nbsp;&nbsp;&nbsp; {users.email}
                </Typography>
                <br />
                <br />
            </Paper>
            <br />
        </Container >

    );
}