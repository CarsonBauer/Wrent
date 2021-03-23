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

    const [password, setPassword] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        updatePassword();
        event.preventDefault();
    }

    const updatePassword = async () => {
        var tkn = localStorage.getItem('user-jwt')
        fetch('/users/password', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${tkn}`
            },
            body: JSON.stringify(
                {
                    // 'email': tkn['email'],
                    'password': password.toString()
                }
            )
        })
    }   

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper className={classes.paper}>

                <WrentLogo className={classes.avatar}/>

                <Typography component="h1" variant="h5">
                    Update Password
                </Typography>

                {error && <Paper className={classes.errorPaper}>{error.message}</Paper>}

                <form className={classes.form} noValidate>
                    <TextField onChange={handlePasswordChange}
                               variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               id="password"
                               label="Password"
                               name="password"
                               autoComplete="password"
                               autoFocus
                    />
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}