import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import motd from "./motd.md";
import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong, ControlCamera, KeyboardArrowLeft, SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Item from "./Item";
import WrentLogo from "../auth/wrentLogo";
import { fetchTags } from "../helpers/TagController";
import { getItemsFromTag } from "../helpers/ItemController";
import { sizing } from '@material-ui/system';


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
  SearchRounded: {
    width: "40%",
    height: "35%",
    marginLeft: 40,
    marginRight: -190,
    paddingRight: 0,
    borderRight: 0,

  },
  items: {
    width: "80%",
  }
  ,

  item: {
    width: "20%",
    
  }
  ,

  itemcontainer: {
    marginTop: 10,
  }
  ,

  TextField: {
    width: "50%",
    //backgroundColor: "white",
    //color: "white",
    //marginLeft: -190,
    //marginLeft: 0,
    marginBottom: 10,
    marginTop: 10,
    //paddingLeft: 0,
    //borderLeft: -190,


  },
  select: {
    //minHeight: 50,
    width: "10%",
    //inlineSize: 1000,
    //size: 1100,
    //height: "200%",
    //backgroundColor: "white",
    //color: "white",
    //marginLeft: 900,
    marginBottom: 10,
    marginTop: 10,
    //paddingLeft: -100,
    //borderLeft: 0,
    //float: "right"
  },
  option: {
    width: "20%",
    size: 1100,
    height: "200%",
    backgroundColor: "white",
    color: "white",
    marginLeft: 1000,
    marginBottom: 20,
    paddingLeft: 0,
    borderLeft: 0,
    float: "right"
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
    <div className={classes.root} alignItems="center">
      <Grid container xs={12} spacing={3} direction="column" alignItems="center">
        <WrentLogo />
      </Grid>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid container spacing={1} alignItems="flex-end"  justify="center">
          
          <Grid item className={classes.TextField}>
            <TextField fullWidth variant="filled" id="input-with-icon-grid" label="Search..."
              onChange={(event) => { setSearchText(event.target.value) }} />
          </Grid>

          <Grid item className={classes.select}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Filter</InputLabel>
              <Select  name="tags" id="tags" onChange={handleTagSelect}>
              <option value="Default" selected disabled />
                {tags.map((tag, i) => (
                  <MenuItem value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.itemcontainer} >
      <Grid container spacing={3} className={classes.items} direction="row" alignItems="flex-start" justify="flex-start">
        {items.filter((item) => {
          if (searchText == "") {
            return item
          } else if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
            return item
          }
        }).map((item, i) => (

          <Grid item className={classes.item} >

            <Item id={item.id} name={item.name} description={item.desc} img={item.imageURL} userid={item.ownerId} />

          </Grid>

        ))}
      </Grid>
      </Grid>
    </div >
  );
}
