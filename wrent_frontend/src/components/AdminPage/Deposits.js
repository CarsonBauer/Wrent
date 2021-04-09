import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import Title from './Title';
//import { Tooltip } from '@material-ui/core';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits({rentals, items}) {
    const classes = useStyles();

    const data01 = [
      {
        "name": "Rented",
        "value": rentals
      },
      {
        "name": "not rented",
        "value": items
      }
    ];

    return (
      <>
        <Title>Items</Title>
        <ResponsiveContainer>
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} fill="#679ECE" label/>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
      </>
    );
}