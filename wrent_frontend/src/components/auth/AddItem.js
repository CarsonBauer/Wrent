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
import {useState, useEffect} from 'react'
import AfterReturnCode from './AfterReturnCode';
import ImageUploader from 'react-images-upload';

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


export default function AddItem() {

    const classes = useStyles();
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const getUser = async () => { 
        const res = await fetch('/users/get', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
            }
        });
        const res_json = await res.json();
        setUser(res_json['id'])
        }
        getUser()
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !description) {
            alert('One of the required fields is empty');
        } else {
            postItem();
        }
    }

    const postItem = async () => {
        await fetch('/items', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('user-jwt')}`
            },
            body: JSON.stringify({
                'location': 1,
                'ownerId': user,
                'name': name.toString(),
                'description': description.toString(),
                'imageURL': "placeholderURL",
                'rating': 1
            })
        })
    }

    return (
        <Container component="main" maxWidth="xs=12">
            <CssBaseline />
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                    Post Item for Rent
                </Typography>
            <form className={classes.form} noValidate>
                    <TextField onChange={handleNameChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                        />
                    <TextField onChange={handleDescriptionChange}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                autoFocus
                        />
                    <TextField
                               variant="outlined"
                               margin="normal"
                               required
                               fullWidth
                               id="location"
                               label="Location"
                               name="location"
                               autoComplete="location"
                               autoFocus
                        />
                    <ImageUploader 
                        withIcon={true}
                        buttonText='Choose images'
                        // onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880} />
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Post
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}