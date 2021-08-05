import Swal from "sweetalert2";
import axios from "../axios";

export const register = (payload, setLoading, history, setErrors) => {
  return async () => {
    try {
      setLoading(true);
      const resp = await axios.post("auth/new", payload);
      if (resp.data.ok) {
        Swal.fire("Info", "The user was created successfully", "success");
        history.push("/login");
      }
    } catch (error) {
      if (error.response.status === 400) {
        const { data } = error.response;
        setErrors({ [data.key]: data.msg });
      }
      Swal.fire("Error", "Oops something went wrong :(", "error");
    } finally {
      setLoading(false);
    }
  };
};
