import {
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import FilterListIcon from "@material-ui/icons/FilterList";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMovieFilters } from "../../../actions/movie";

const useStyles = makeStyles({
  list: {
    width: 270,
  },
  fullList: {
    width: "auto",
  },
});

export default function MovieFilters() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.movie);

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    dispatch(changeMovieFilters(e.target));
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <IconButton arial-label="filter-drawer" onClick={toggleDrawer}>
          <FilterListIcon />
        </IconButton>
      </Grid>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Grid
          className={classes.list}
          container
          direction="column"
          alignItems="stretch"
        >
          <Grid item container alignItems="center">
            <Grid item>
              <Tooltip title="Close Filters">
                <IconButton onClick={toggleDrawer}>
                  <Close />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid
              style={{
                padding: "0 0 0 8px",
                fontSize: 18,
                fontWeight: 600,
              }}
              item
              component={Typography}
            >
              Advanced Filters
            </Grid>
          </Grid>
          <Grid
            style={{
              padding: "8px 16px",
            }}
            container
            item
            xs
            direction="column"
            alignItems="stretch"
          >
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  select
                  label="Select category"
                  helperText={
                    <span>
                      Filter movies by <b>Category</b>
                    </span>
                  }
                  variant="outlined"
                  fullWidth
                  value={filters.type}
                  FormHelperTextProps={{
                    component: Typography,
                    noWrap: true,
                  }}
                  name="type"
                  onChange={handleChange}
                >
                  <MenuItem value={"series"}>Serie</MenuItem>
                  <MenuItem value={"movie"}>Movie</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                helperText={
                  <span>
                    Filter movies by <b>Year</b>
                  </span>
                }
                variant="outlined"
                fullWidth
                value={filters.year}
                FormHelperTextProps={{
                  component: Typography,
                  noWrap: true,
                }}
                name="year"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
