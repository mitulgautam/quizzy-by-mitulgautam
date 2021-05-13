import axios from "axios";

const login = payload => axios.post("sessions/login", payload);
const logout = () => axios.get("sessions/logout");

const authenticationApi = {
  login,
  logout,
};

export default authenticationApi;
