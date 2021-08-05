import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { movieReducer } from "./movieReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
});
