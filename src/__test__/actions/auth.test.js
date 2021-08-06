import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { login } from "../../actions/auth";
import { types } from "../../types/types";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

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
      login(
        { email: "ismaelrr888@gmail.com", password: "Chaos123456*" },
        setErrors,
        []
      )
    );
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLoading,
      payload: true,
    });
    expect(actions[1].payload.name).toBe("ismael");
    expect(actions[2]).toEqual({
      type: types.authLoading,
      payload: false,
    });

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
  });

  test("should incorrect login", async () => {
    const setErrors = jest.fn();
    await store.dispatch(
      login(
        { email: "ismael111@gmail.com", password: "Chaos123456*" },
        [],
        setErrors
      )
    );

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Oops something went wrong :(",
      "error"
    );
  });
});
