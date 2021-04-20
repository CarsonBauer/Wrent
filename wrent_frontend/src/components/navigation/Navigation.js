import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {routes} from "../../constants/routes";
import logo from "../home/Icon.png";
import MenuClosed from "@material-ui/icons/Menu";
import MenuOpen from "@material-ui/icons/MenuOpen";
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// stolen from: https://github.com/sneas/react-nested-routes-example

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        }
    },
    tabs: {
        marginLeft: 'auto',
        marginRight: 0
    },
    logo: {
        height: 50,
    }
}));

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}


function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const Navigation = ({route}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const [value, setValue] = React.useState(history.location.pathname);
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue)
        history.push(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <nav className="breadcrumbs">
            <AppBar position="static">
                <Toolbar className={classes.grow}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link href="/">
                            <img className={classes.logo} src={logo} alt="WrentLogo"/>
                        </Link>
                    </Typography>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MenuClosed style={{ color: "#ffffff"}}/>
                        </Button>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                            <Link href="/userprofile"><MenuItem onClick={handleClose}>My Profile</MenuItem></Link>
                            <Link href="/rentalHistory"><MenuItem onClick={handleClose}>History</MenuItem></Link>
                            <Link href="/addItem"><MenuItem onClick={handleClose}>Add Item</MenuItem></Link>
                            <Link href="/login"><MenuItem onClick={handleClose}>LogIn / Sign Up</MenuItem></Link>
                            <Link href="/adminPage"><MenuItem onClick={handleClose}>Stats</MenuItem></Link>
                        </Menu>
                    </Tabs>
                </Toolbar>
            </AppBar>
        </nav>
    );
}

export default Navigation;
