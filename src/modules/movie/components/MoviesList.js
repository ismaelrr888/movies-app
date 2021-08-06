import {
  CircularProgress,
  Grid,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMovieFilters, getMovies } from "../../../actions/movie";
import MovieFilters from "../components/MovieFilters";
import MovieItem from "../components/MovieItem";

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function MoviesList() {
  const classes = useStyles();
  const { moviesData, filters, loadingMovies } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();

  const handlePageChange = (event, newPage) => {
    dispatch(changeMovieFilters({ name: "page", value: newPage + 1 }));
  };

  const createSortHandlerYear = () => {
    dispatch(
      changeMovieFilters({
        name: "order",
        value: filters.order === "releaseYear" ? "-releaseYear" : "releaseYear",
      })
    );
  };

  const createSortHandlerTitle = () => {
    dispatch(
      changeMovieFilters({
        name: "order",
        value: filters.order === "title" ? "-title" : "title",
      })
    );
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, filters]);

  return (
    <>
      <MovieFilters />
      <Grid container spacing={4}>
        {loadingMovies ? (
          <Grid container justifyContent="center" alignItems="center">
            <CircularProgress size={40} />
          </Grid>
        ) : (
          <>
            <Grid
              item
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Grid item>
                {moviesData?.results?.length > 0 && (
                  <>
                    <TableSortLabel
                      active={true}
                      direction={
                        filters.order === "releaseYear" ? "asc" : "desc"
                      }
                      onClick={createSortHandlerYear}
                    >
                      Year
                      <span className={classes.visuallyHidden}>
                        {filters.order === "releaseYear"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    </TableSortLabel>
                    <TableSortLabel
                      active={true}
                      direction={filters.order === "title" ? "asc" : "desc"}
                      onClick={createSortHandlerTitle}
                    >
                      Title
                      <span className={classes.visuallyHidden}>
                        {filters.order === "title"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    </TableSortLabel>
                  </>
                )}
              </Grid>
              <Grid item>
                <TablePagination
                  labelRowsPerPage={""}
                  component={"div"}
                  rowsPerPageOptions={[10]}
                  page={moviesData?.total === 0 ? 0 : filters.page - 1}
                  count={moviesData?.total ? moviesData?.total : 0}
                  rowsPerPage={10}
                  onPageChange={handlePageChange}
                />
              </Grid>
            </Grid>

            {moviesData?.results?.map((item, index) => (
              <Grid item key={index}>
                <MovieItem movie={item} />
              </Grid>
            ))}
            {moviesData?.results?.length === 0 && (
              <Grid container justifyContent="center">
                <Typography variant="h6">Sorry no movies found :(</Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </>
  );
}
