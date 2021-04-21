import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import { getRefunds, deleteRefund } from '../helpers/RefundController';

// Generate Order Data
function createData(refundId, itemName, user) {
    return { refundId, itemName, user };
}

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
        setRefunds();
    }, [])

    const setRefunds = async () => {
        const res = await getRefunds();
        setRows(res)
    }

    const handleDeleteClick = async (id) => {
        const res = await deleteRefund(id);
    }

    return (
        <React.Fragment>
            <Title>Refund Requests</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>User</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell>
                                <Button onClick={async () => { 
                                        const res = await deleteRefund(row.refundId)
                                        setRefunds();
                                    }} 
                                    variant="contained" color="secondary" size="small">Accept Request</Button>
                            </TableCell>
                            <TableCell>
                                {row.itemName}
                            </TableCell>
                            <TableCell>
                                {row.user}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}