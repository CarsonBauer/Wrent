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

export default function Deposits() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography component="p" variant="h5" >Statistics</Typography>
            <br />
            <Typography component="p" variant="h8" >Number Of Users: 1538</Typography>
            <br />
            <Typography component="p" variant="h8">Number of Admin : 1538</Typography>
            <br />
            <Typography component="p" variant="h8">Rented : 1538</Typography>
            <br />
            <Typography component="p" variant="h8">Not Rented: 1538</Typography>
        </React.Fragment >
    );
}