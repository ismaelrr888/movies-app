import Swal from "sweetalert2";
import axios from "../axios";
import { types } from "../types/types";

export const getMovies = () => {
  return async (dispatch, getState) => {
    try {
      const {
        movie: { filters },
      } = getState();
      dispatch({ type: types.moviesChangeLoading, payload: true });
      const response = await axios.get("movies", {
        params: filters,
      });
      dispatch({ type: types.moviesGet, payload: response.data });
    } catch (error) {
      Swal.fire("Error", "Oops something went wrong :(", "error");
    } finally {
      dispatch({ type: types.moviesChangeLoading, payload: true });
    }
  };
};

export const changeMovieFilters = (payload) => (dispatch) => {
  dispatch({ type: types.moviesChangeFilters, payload: payload });
};
