import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../../actions/movie";
import MovieItem from "../components/MovieItem";

export default function MoviesList() {
  const { moviesData, filters } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, filters]);

  return (
    <>
      <Grid container spacing={4}>
        {moviesData?.results?.map((item, index) => (
          <Grid item key={index}>
            <MovieItem movie={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
