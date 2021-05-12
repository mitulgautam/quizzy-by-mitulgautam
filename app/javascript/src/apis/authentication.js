import axios from "axios";

const login = payload => axios.post("/log-in", payload);
const logout = () => axios.delete("/logout");

const authenticationApi = {
  login,
  logout,
};

export default authenticationApi;
