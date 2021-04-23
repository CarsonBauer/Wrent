import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from "@material-ui/core/Link"
import { getAdminStatus, getUser } from "../helpers/UserController"
import {NavLink, useHistory} from "react-router-dom";
import MenuClosed from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TempDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const history = useHistory();
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [value, setValue] = React.useState(history.location.pathname);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(async () => {

    const lgRes = await getUser();
    if (lgRes.msg == 'OK') {
        setLoggedIn(true)
    }

    const adminRes = await getAdminStatus();
    setIsAdmin(adminRes.isAdmin)
}, [])

const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue)
    history.push(newValue);
};

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer('right', false)}
      onKeyDown={toggleDrawer('right', false)}
    >
      <List>
        {loggedIn && <Button fullWidth href="/userprofile"><ListItem >My Profile</ListItem></Button>}
        {loggedIn && <Button fullWidth href="/rentalHistory"><ListItem >History</ListItem></Button>}
        {loggedIn && <Button fullWidth href="/addItem"><ListItem >Add Item</ListItem></Button>}
        {!loggedIn && <Button fullWidth href="/login"><ListItem >LogIn / Sign Up</ListItem></Button>}
        {isAdmin && <Button fullWidth href="/adminPage"><ListItem >Stats</ListItem></Button>}
        {loggedIn && <Button fullWidth onClick={() => localStorage.removeItem('user-jwt')} href="/"><ListItem >Logout</ListItem></Button>}
      </List>
    </div>
  );
  
  return (
    <div>
        <React.Fragment key='right'>
          <Button onClick={toggleDrawer('right', true)}><MenuClosed style={{ color: "#FFFFFF"}}/></Button>
          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}