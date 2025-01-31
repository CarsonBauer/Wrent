import React from 'react';
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
import Paper from '@material-ui/core/Paper';
import WrentLogo from './wrentLogo';
import {useState} from 'react'
import AfterReturnCode from './AfterReturnCode';

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

export default function ForgotPassWord() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [navigate, setNav] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        getCode();
        // useHistory().push("/afterreturncode");
        event.preventDefault();
    }

    const getCode = async () => {
        const res = await fetch('/tempcodes', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(
              {
                'email': email.toString()
             }
            )
          })
        
        if (res.status == 200) {
            setNav(false);
        }

    }

    return (
        <>
        {navigate ? <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* <div className={classes.paper}> */}
            <Paper className={classes.paper}>
                <WrentLogo />
                <Typography component="h1" variant="h5">
                    Password Assistance
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
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
                            Get Verification Code
                        </Button>
                    </Grid>


                </form>
            {/* </div> */}
            </Paper>
        </Container >: 
        <AfterReturnCode email={email} />}
        </>
    );
}