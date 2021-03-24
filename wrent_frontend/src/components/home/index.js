import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Markdown from "./Markdown";
import motd from "./motd.md";
import { makeStyles } from "@material-ui/core/styles";
import { ControlCamera, SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Item from "./Item";
import WrentLogo from "../auth/wrentLogo"
import {fetchTags} from "../helpers/TagController"
import {getItemsFromTag} from "../helpers/ItemController"


import ReactDOM from "react-dom";
import Authorization from "../auth/Authorization";
import { MenuList } from "@material-ui/core";

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
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetch(motd)
      .then((res) => res.text())
      .then((post) => setMessage(post))
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    getItems().then(getTags())
  }, [])

  const getItems = async () => {
    const itemsFromServer = await fetchItems()
    setItems(itemsFromServer)
  }

  const getTags = async () => {
    const tagsFromServer = await fetchTags()
    setTags(tagsFromServer)
  }

  const fetchItems = async () => {
    const res = await fetch('/items/available', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json();
    return data
  }

  const handleTagSelect = async (event) => {
    if (event.target.value != "") {
      const res = await getItemsFromTag(event.target.value);
      setItems(res);
    } else {
      getItems();
    }
  }

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
          <Grid item>
            <select name="tags" id="tags" onChange={handleTagSelect}>
              <option value="" />
              {tags.map((tag, i) => (
                            <option value={tag.id}>
                              {tag.name}
                            </option>
                          ))}
            </select>
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
