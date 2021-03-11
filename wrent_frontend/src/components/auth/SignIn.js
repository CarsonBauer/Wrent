import React, {useState} from 'react';
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
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WrentLogo from './wrentLogo';
import { Redirect } from 'react-router';
import GoogleLogin from 'react-google-login';


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

export default function SignIn() {
    const classes = useStyles();
    const [error] = useState();
    console.log("rendering");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failure, setFailure] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        login();
        event.preventDefault();
    }

    const login = async () => { 
        const res = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'email': email.toString(),
                    'password': password.toString()
                }
            )
            }).catch(err => setFailure(true));

            var data = await res.json();

            if (data['statusCode'] != 200) {
                setFailure(true);
            } else {
                localStorage.setItem('user-jwt', data['access_token']);
            }
    }   

    const loginOauth = async (res) => {
        var id_token = res.tokenId;
        const tkn = await fetch('/users/oauth', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'id_token': id_token.toString()
                }
            )
        }).catch(err => setFailure(true));

        var data = await tkn.json();

        if (data['statusCode'] != 200) {
            setFailure(true);
        } else {
            localStorage.setItem('user-jwt', data['access_token']);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper className={classes.paper}>

                <WrentLogo className={classes.avatar}/>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {error && <Paper className={classes.errorPaper}>{error.message}</Paper>}

                <form className={classes.form} noValidate>
                    <TextField onChange={handleEmailChange}
                               variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               id="email"
                               label="Email Address"
                               name="email"
                               autoComplete="email"
                               autoFocus
                    />
                    <TextField onChange={handlePasswordChange}
                               variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               name="password"
                               label="Password"
                               type="password"
                               id="password"
                               autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="./forgotpassword" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <br />
                    <GoogleLogin 
                    clientId="This is where our client id will go."
                    buttonText="Login"
                    onSuccess={loginOauth}
                    // onFailure={loginOauth}
                    />
                    <br />
                    <br />
                    <>
                        {failure && <font color='red'>Unable to login</font>}
                    </>
                </form>
            </Paper>
        </Container>
    );
}