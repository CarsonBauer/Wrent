import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import WrentLogo from './wrentLogo';
import { postLocation } from '../helpers/LocationController';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(5),
        marginLeft: -theme.spacing(3),
        width: '450px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    let history = useHistory()
    var id = null;

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfPasswordChange = (event) => {
        setConfPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !userName || !email || !location || !password || !confPassword) {
            alert('One of the required fields is empty');
        } else if (password != confPassword) {
            alert('Your passwords are different.');
        } else {
            geocode().then((res) => {
                if (res != "NO_POST") {
                    postUser()
                }
            })
        }
    }

    const geocode = async () => {
        const res = await postLocation(location);
        if (res != "ZERO_RESULTS") {
            id = res;
            return "OK"
        } else {
            alert("Location does not exist.");
            return "NO_POST"
        }
    }

    const postUser = async () => {
        await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'name': firstName.toString() + " " + lastName.toString(),
                'password': password.toString(),
                'email': email.toString(),
                'location': id,
                'userName': userName.toString(),
                'permission': "User"
            })
        }).then(history.push("/login"))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <WrentLogo />
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={handleFirstNameChange}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={handleLastNameChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleUserNameChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="userName"
                                autoComplete="user name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleEmailChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleLocationChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="location"
                                label="Location"
                                name="location"
                                autoComplete="location"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handlePasswordChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleConfPasswordChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="confpassword"
                                label="Confirm Password"
                                type="password"
                                id="confpassword"
                                autoComplete="confirm-password"
                            />
                        </Grid>

                    </Grid>
                    <Button onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                <p style={{ margin: 0, color: 'red' }}>Already have an account? Sign in</p>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}