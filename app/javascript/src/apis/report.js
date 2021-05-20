/* eslint-disable arrow-parens */
import axios from "axios";

const index = () => axios.get("/reports/");

const reportApi = {
  index,
};

export default reportApi;
