import React from "react";
import MovieFilters from "../components/MovieFilters";
import MoviesList from "../components/MoviesList";

export default function MovieContainer() {
  return (
    <>
      <MovieFilters />
      <MoviesList />
    </>
  );
}
