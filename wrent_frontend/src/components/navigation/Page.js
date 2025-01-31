import React, {useEffect} from "react";
import Navigation from "./Navigation";
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Background from '../../img/background.png';
import {addResponseMessage, Widget} from 'react-chat-widget';
import {useParams, withRouter} from "react-router-dom";
import {chatra} from './chatra';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundImage: `url(${Background})`
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Wrent
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const Page = ({route}) => {
    const PageBody = route.component;
    const params = useParams();
    const classes = useStyles();
    useEffect(() => {
        const script = document.createElement('script');

        script.src = chatra;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);
    return (
        <>


            <main className={classes.content}>
                {<Navigation route={route}/>}
                <Container maxWidth="xl" className={classes.container}>
                    <PageBody params={params}/>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>

            </main>
        </>
    );
};

export default Page;