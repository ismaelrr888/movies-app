import { types } from "../types/types";

const initialState = {
  loadingMovies: false,
  moviesData: {},
  filters: {
    page: 1,
    limit: 10,
    order: "-releaseYear",
    year: null,
    type: "",
    title: "",
  },
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.moviesChangeLoading:
      return {
        ...state,
        loadingMovies: action.payload,
      };
    case types.moviesGet:
      return {
        ...state,
        moviesData: action.payload,
      };

    default:
      return state;
  }
};
