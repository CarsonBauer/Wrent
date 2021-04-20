import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import WrentLogo from './wrentLogo';
import { useState } from 'react'
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
    errorPaper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFBABA',
    },
    avatar: {
        margin: theme.spacing(8),
        marginTop: '50px',
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(8)

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AfterReturnCode({ email }) {
    const classes = useStyles();
    var code = "";
    const [password, setPassword] = useState('test');
    let history = useHistory()

    const handleCodeChange = (event) => {
        code = event.target.value;
    }

    const handleSubmit = (event) => {
        checkCode();
        event.preventDefault();
    }

    const checkCode = async () => {
        const res = await fetch(`/tempcodes/check`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'email': email.toString(),
                    'code': code.toString()
                }
            )
        })
        var data = await res.json();
        localStorage.setItem('user-jwt', data['access_token'])
        history.push("/updatepassword");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* <div className={classes.paper}> */}
            <Paper className={classes.paper}>
                <WrentLogo />


                <form className={classes.form} noValidate>
                    <Typography component="h1" variant="h5">
                        Password Assistance Return Code
                    </Typography>
                    <Typography component="h1" variant="h5">

                    </Typography>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>

                    <Grid item xs={12}>
                        <TextField onChange={handleCodeChange}
                            variant="outlined"
                            required
                            fullWidth
                            name="VerificationCode"
                            label="Verification Code"
                            type="password"
                            id="verificationncode"
                            autoComplete="verification-code"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            // href="/afterreturncode"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Submit Code
                        </Button>
                    </Grid>
                    {/* <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>
                    <Typography component="h1" variant="h5">
                        Password Return Here: 
                        <text>{password}</text>
                    </Typography>
                    <div>&nbsp;&nbsp;</div>
                    <span>Section: </span>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>
                    <div>&nbsp;&nbsp;</div>

                    <div>&nbsp;&nbsp;</div> */}
                    <Grid item xs>
                        <Button
                            href="/login"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Return to Sign In
          </Button>
                    </Grid>
                </form>
                {/* </div> */}
            </Paper>
        </Container>
    );
}