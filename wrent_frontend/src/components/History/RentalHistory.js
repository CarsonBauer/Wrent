import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ControlCamera, SearchRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Item from "../home/Item";
import WrentLogo from "../auth/wrentLogo";
import {getRentalItems} from "../helpers/RentalController";
import {getUser} from "../helpers/UserController";
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
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
  TextField: {
    width: "50%",
    marginBottom: 10,
    marginTop: 10,
},
}));

export default function Home() {

  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");

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

      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid container spacing={1} alignItems="flex-end" justify="center">

          <Grid item className={classes.TextField}>
              <TextField fullWidth variant="filled" id="input-with-icon-grid" label="Search..."
                          onChange={(event) => {
                              setSearchText(event.target.value)
                          }}/>
          </Grid>

          {/*<Grid item className={classes.select}>
              <FormControl fullWidth variant="filled">
                  <InputLabel>Filter</InputLabel>
                  <Select name="tags" id="tags" onChange={handleTagSelect}>
                      <option value="Default" selected disabled/>
                      {tags.map((tag, i) => (
                          <MenuItem value={tag.id}>
                              {tag.name}
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>
            </Grid>*/}

        </Grid>
      </Grid>

      <Grid container spacing={3} direction="row" alignItems="center">
        <>
          {items.filter((item) => {
            if (searchText == "") {
              return item
            } else if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
              return item
            }
          }).map((item, i) => (
                          <Grid item xs={2}>
                            <Item id={item.id} name={item.name} description={item.desc} img={item.imageURL}
                                  userid={item.ownerId} price={item.price}/>
                          </Grid>
                        ))}
        </>
      </Grid>
    </div>
  );
}
