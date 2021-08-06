import Swal from "sweetalert2";
import axios from "../axios";
import { types } from "../types/types";

export const register = (payload, history, setErrors) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.authLoading, payload: true });
      const resp = await axios.post("auth/new", payload);
      if (resp.data.ok) {
        Swal.fire("Info", "The user was created successfully", "success");
        history.push("/login");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        const { data } = error.response;
        setErrors({ [data.key]: data.msg });
      }
      Swal.fire("Error", "Oops something went wrong :(", "error");
    } finally {
      dispatch({ type: types.authLoading, payload: false });
    }
  };
};

export const login = (payload, history, setErrors) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.authLoading, payload: true });
      const resp = await axios.post("auth/", payload);
      if (resp.data.ok) {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch({
          type: types.authLogin,
          payload: resp.data,
        });
        history.push("/user/movies");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        const { data } = error.response;
        setErrors({ [data.key]: data.msg });
      }
      Swal.fire("Error", "Oops something went wrong :(", "error");
    } finally {
      dispatch({ type: types.authLoading, payload: false });
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get("auth/renew");
      if (resp.data.ok) {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("token-init-date", new Date().getTime());

        dispatch({
          type: types.authLogin,
          payload: {
            uid: resp.data.uid,
            name: resp.data.name,
          },
        });
      } else {
        dispatch(checkingFinish());
      }
    } catch (error) {
    } finally {
      dispatch(checkingFinish());
    }
  };
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
