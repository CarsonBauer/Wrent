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
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {loggedIn && <Link href="/userprofile"><ListItem >My Profile</ListItem></Link>}
        {loggedIn && <Link href="/rentalHistory"><ListItem >History</ListItem></Link>}
        {loggedIn && <Link href="/addItem"><ListItem >Add Item</ListItem></Link>}
        {!loggedIn && <Link href="/login"><ListItem >LogIn / Sign Up</ListItem></Link>}
        {isAdmin && <Link href="/adminPage"><ListItem >Stats</ListItem></Link>}
      </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuClosed style={{ color: "#FFFFFF"}}/></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}