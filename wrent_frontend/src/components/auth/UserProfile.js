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
import Map from './Map';
import GoodMap from './GoogleMap';
import Item from './../home/Item';
import GoogleMap from './GoogleMap';
import Card from "@material-ui/core/card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea, requirePropFactory } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        marginLeft: -theme.spacing(3),
        width: '100%',
    },
    media: {
        height: 100,
    },
}));

export default function UserProfile() {

    function changeBackground(e) {
        e.target.style.background = '#4E4BA6';
    }

    function changeBackground2(e) {
        e.target.style.background = 'black';
    }

    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await fetchUsers()
            setUsers(usersFromServer)
        }
        getUsers()
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
            <Paper style={{ width: '300%', color: '#4E4BA6', backgroundColor: 'white', borderRadius: '5px', padding: '40px', marginLeft: '-400px', }} className="paper">
                <img src={userImage} style={{ width: "20%", border: '1px solid black', borderRadius: '100px', marginLeft: '90px' }} alt="UserImage" />

                <img src={plusIcon} style={{ width: "4%", border: '1px solid black', borderRadius: '5px', marginLeft: '-8px' }} alt="plusIcon" />
                <div style={{ paddingLeft: '15px', paddingTop: '30px', fontSize: '30px', color: 'black', float: 'right', width: "40%", border: '20px solid black', borderRadius: '5px', marginRight: '60px' }}>
                    this is section for items and map
                    <CardActionArea>
                        <CardMedia
                            title="Item for rent"
                        />
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                        </Button>
                            <Button size="small" color="primary">
                                Renter profile
                        </Button>
                        </CardActions>
                    </CardActionArea>
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
                <br />
                <br />
                <Typography onMouseOut={changeBackground2} onMouseOver={changeBackground} style={{ width: '37%', borderTop: '10px', borderBottom: '10px', fontSize: '30px', color: 'white', backgroundColor: 'black', borderRadius: '5px', padding: '5px', textAlign: 'center' }} component="h1" variant="h5">
                    User Profile
                </Typography>
                <br />
                <br />
                <Typography onMouseOut={changeBackground2} onMouseOver={changeBackground} style={{ width: '30%', borderTop: '10px', borderBottom: '10px', fontSize: '20px', color: 'white', backgroundColor: 'black', borderRadius: '5px', padding: '8px', paddingLeft: '80px', }} component="h1" variant="h5">
                    UserName :  &nbsp; &nbsp;&nbsp;&nbsp; {users.name}
                </Typography>
                <br />
                <br />
                <Typography onMouseOut={changeBackground2} onMouseOver={changeBackground} style={{ hright: '10%', width: '30%', borderTop: '10px', borderBottom: '10px', fontSize: '20px', color: 'white', backgroundColor: 'black', borderRadius: '5px', padding: '8px', paddingLeft: '80px', }} component="h1" variant="h5">
                    {users.lastName} &nbsp; &nbsp;&nbsp;&nbsp; {users.firstName}
                </Typography>
                <br />
                <br />
                <Typography onMouseOut={changeBackground2} onMouseOver={changeBackground} style={{ width: '30%', borderTop: '10px', borderBottom: '10px', fontSize: '20px', color: 'white', backgroundColor: 'black', borderRadius: '5px', padding: '8px', paddingLeft: '80px', }} component="h1" variant="h5">
                    Email :  &nbsp; &nbsp;&nbsp;&nbsp; {users.email}
                </Typography>
                <br />
                <br />
                <Typography onMouseOut={changeBackground2} onMouseOver={changeBackground} style={{ width: '30%', borderTop: '10px', borderBottom: '10px', fontSize: '20px', color: 'white', backgroundColor: 'black', borderRadius: '5px', padding: '8px', paddingLeft: '80px', }} component="h1" variant="h5">
                    Location :  &nbsp; &nbsp;&nbsp;&nbsp; {users.location}
                </Typography>
                <br />
                <br />
            </Paper>
            <br />
        </Container >
    );
}