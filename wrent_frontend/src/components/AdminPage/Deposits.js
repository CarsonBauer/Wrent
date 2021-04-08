import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];

export default function Deposits() {
    const classes = useStyles();
    return (

        <ResponsiveContainer>
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label/>
                
            </PieChart>
        </ResponsiveContainer>

    );
}