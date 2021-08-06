import { types } from "../types/types";

const initialState = {
  loading: false,
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
        loading: false,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
      return {
        loading: false,
        checking: false,
      };
    case types.authLoading:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
