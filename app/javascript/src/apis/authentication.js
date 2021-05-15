import axios from "axios";

const login = payload => axios.post("sessions/login", payload);
const logout = () => axios.get("sessions/logout");
const show = () => axios.get("sessions/user");

const authenticationApi = {
  login,
  logout,
  show,
};

export default authenticationApi;
