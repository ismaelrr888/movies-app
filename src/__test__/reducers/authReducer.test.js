import "@testing-library/jest-dom";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  loading: false,
  checking: true,
};

describe("Test in auth reducer", () => {
  test("should return state by default", () => {
    const action = {};
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
  test("should auth user", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "ismael",
      },
    };

    const state = authReducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      checking: false,
      uid: "123",
      name: "ismael",
    });
  });
});
