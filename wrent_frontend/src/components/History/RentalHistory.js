import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Markdown from "../home/Markdown";
import motd from "../home/motd.md";
import { makeStyles } from "@material-ui/core/styles";
import { ControlCamera, SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Item from "../home/Item";
import WrentLogo from "../auth/wrentLogo";
import {getRentalItems} from "../helpers/RentalController";
import {getUser} from "../helpers/UserController";


import ReactDOM from "react-dom";
import Authorization from "../auth/Authorization";

window.$token = ''

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  markdown: {
    padding: theme.spacing(2),
  },
}));

export default function Home() {

  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");



//   useEffect(async () => {
//     const getUser = async () => {
//         const userRes = await getUser();
//         setUser(userRes['id']);
//     }
//     const getItems = async () => {
//       const itemsFromServer = await rentalItems(user);
//       setItems(itemsFromServer)
//     }
//     getUser()
//   }, [])

  useEffect(async () => {
    const userRes = await getUser();
    const itemsFromServer = await getRentalItems(await userRes['id']);
    setItems(itemsFromServer); 
}, [])

  return (
    <div className={classes.root}>
      <Grid container xs={12} spacing={3} direction="column" alignItems="center">
        <WrentLogo />
      </Grid>
      <Grid container spacing={3} direction="row" alignItems="center">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchRounded />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Search..." 
            onChange={(event) => { setSearchText(event.target.value) }} />
          </Grid>
        </Grid>
        <>
          {items.filter((item) => {
            if (searchText == "") {
              return item
            } else if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
              return item
            }
          }).map((item, i) => (
                          <Grid item xs={2}>
                            <Item id={item.id} name={item.name} description={item.desc}/>
                          </Grid>
                        ))}
        </>
      </Grid>
    </div>
  );
}
