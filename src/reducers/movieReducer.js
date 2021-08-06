import { types } from "../types/types";

const initialState = {
  loadingMovies: false,
  moviesData: {},
  filters: {
    page: 1,
    limit: 10,
    order: "-releaseYear",
    year: "",
    type: "",
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
    case types.moviesChangeFilters:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case types.moviesSearch:
      return {
        ...state,
        filters: {
          ...state.filters,
          page: 1,
          [action.payload.name]: action.payload.value,
        },
      };
    case types.moviesClearFilters:
      return {
        ...state,
        filters: {
          ...state.filters,
          year: "",
          type: "",
        },
      };

    default:
      return state;
  }
};
