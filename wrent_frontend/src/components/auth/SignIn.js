import React, {useState, useEffect} from 'react';
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
import SvgIcon from "@material-ui/core/SvgIcon";
import Container from '@material-ui/core/Container';
import WrentLogo from './wrentLogo';
import {Redirect} from 'react-router';
import {useHistory} from 'react-router-dom';
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
        padding: theme.spacing(2),
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
        marginTop: theme.spacing(4)
    },
    submit: {
        margin: theme.spacing(0, 0, 1),
    },
    footer: {
        margin: theme.spacing(1, 0, 0)
    }
}));

export default function SignIn() {
    const classes = useStyles();
    console.log("rendering");
    let history = useHistory()

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

    const login = () => {
        fetch('/users/login', {
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
        })
            .then(res => res.json())
            .then((result) => {
                if (result['statusCode'] != 200) {
                    setFailure(true);
                } else {
                    setFailure(false);
                    localStorage.setItem('user-jwt', result['access_token']);
                    history.push("/");
                }
            }).catch(err => setFailure(true));
}

const loginOauth = (res) => {
    var id_token = res.tokenId;
    fetch('/users/oauth', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                'id_token': id_token.toString()
            }
        )

    })
        .then(res => res.json())
        .then((result) => {
            if (result['statusCode'] != 200) {
                console.log("failed!");
                setFailure(true);
            } else {
                setFailure(false);
                localStorage.setItem('user-jwt', result['access_token']);
                history.push("/");
            }
        }).catch(err => setFailure(true));

    // .then(res => res.json())
    //     .then((result) => console.log(result))
    //     .catch(err => setFailure(err));

}

return (
    <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Paper className={classes.paper}>

            <WrentLogo className={classes.avatar}/>

            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            {failure && <Paper className={classes.errorPaper}>{"Login failure, please create an account"}</Paper>}

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
                <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText="Login"
                    render={renderProps => (
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            color="primary"
                            className={classes.submit}>Google Login
                        </Button>
                    )}
                    onSuccess={loginOauth}
                    onFailure={loginOauth}
                />
                <Grid container className={classes.footer}>
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
                <br/>
            </form>
        </Paper>
    </Container>
);
}