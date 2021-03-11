import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Markdown from "./Markdown";
import motd from "./motd.md";
import { makeStyles } from "@material-ui/core/styles";
import { SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Item from "./Item";
import WrentLogo from "../auth/wrentLogo"


import ReactDOM from "react-dom";

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
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    fetch(motd)
      .then((res) => res.text())
      .then((post) => setMessage(post))
      .catch((err) => console.error(err));
  });

  const items = fetch('/items', {method: 'GET'})
  .then(res => res.json())
  .then(jwt => {console.log(jwt)});
  

  return (
    
    <div className={classes.root}>
      <Grid container xs={12} spacing={3} direction="column" alignItems="center">
      <WrentLogo/>
      </Grid>
      <Grid container spacing={3} direction="row" alignItems="center">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchRounded />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Search..." />
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
        <Grid item xs={2}>
          <Item/>
        </Grid>
      </Grid>
    </div>
  );
}
