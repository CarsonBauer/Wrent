import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getRecentItems } from '../helpers/RentalController';

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
function createData(id, date, name, amount) {
    // return { id, date, name, shipTo, paymentMethod, amount };
    return { id, date, name, amount };
}

// const rows = [
//     createData(0, '7 April, 2021', 'Elvis Presley', 312.44),
//     createData(1, '7 April, 2021', 'Paul McCartney', 866.99),
//     createData(2, '7 April, 2021', 'Tom Scholz', 100.81),
//     createData(3, '7 April, 2021', 'Michael Jackson', 654.39),
//     createData(4, '7 April, 2021', 'Bruce Springsteen', 212.79),
// ];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {

    const classes = useStyles();
    const [rows, setRows] = React.useState([])

    React.useEffect(async () => {
        const res = await getRecentItems();
        var i
        setRows(res)
        // res.forEach(element => {
        //     setRows(...rows, createData(i, element.time, element.userName, element.price))
        //     i = i + 1;
        // })
    }, [])

    return (
        <React.Fragment>
            <Title>Recent Rents</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        {/* <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell> */}
                        <TableCell align="right">Rent Payments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.userName}</TableCell>
                            {/* <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell> */}
                            <TableCell align="right">${row.price.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more rents
                </Link>
            </div> */}
        </React.Fragment>
    );
}