import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { AreaChart, Area, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Rent
                        </Label>
                    </YAxis>
                    <Tooltip/>
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="url(#colorUv)" dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}