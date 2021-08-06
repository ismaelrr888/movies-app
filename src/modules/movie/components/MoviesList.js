import { Grid, TablePagination } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMovieFilters, getMovies } from "../../../actions/movie";
import MovieItem from "../components/MovieItem";

export default function MoviesList() {
  const { moviesData, filters } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    dispatch(changeMovieFilters({ name: "page", value: newPage + 1 }));
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, filters]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid
          item
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
        >
          <Grid item></Grid>
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
      </Grid>
    </>
  );
}
