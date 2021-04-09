import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { AreaChart, Area, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';
import { getRecentRentals } from '../helpers/RentalController';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

export default function Chart() {
    const theme = useTheme();

    const [data, setData] = React.useState([]);

    React.useEffect(async () => {
        var i
        for (i = 0; i <= 24; i++) {
            data.push(createData(`${i}`, 0))
        }
        const res = await getRecentRentals();
        res.forEach(element => {
            data[element.time].amount = data[element.time].amount+1
        })
    }, [])

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