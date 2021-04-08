import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits({users, admins, rentals, items}) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography component="p" variant="h5" >Statistics</Typography>
            <br />
            <Typography component="p" variant="h8" >Number Of Users: {users}</Typography>
            <br />
            <Typography component="p" variant="h8">Number of Admin : {admins}</Typography>
            <br />
            <Typography component="p" variant="h8">Rented : {rentals}</Typography>
            <br />
            <Typography component="p" variant="h8">Not Rented: {items}</Typography>
        </React.Fragment >
    );
}