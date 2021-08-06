import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("test in auth action", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("login action", async () => {
    const setErrors = jest.fn();
    await store.dispatch(
      login({ email: "ismael1@gmail.com", password: "Chaos123456*" }, setErrors)
    );
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLoading,
      payload: true,
    });
    expect(actions[1].payload.name).toBe("ismael1");
    expect(actions[2]).toEqual({
      type: types.authLoading,
      payload: false,
    });

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
});
