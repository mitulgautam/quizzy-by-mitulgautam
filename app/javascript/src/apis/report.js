/* eslint-disable arrow-parens */
import axios from "axios";

const index = () => axios.get("api/reports/");
const download = () =>
  axios.get("api/reports/download", { responseType: "blob" });

const reportApi = {
  index,
  download,
};

export default reportApi;
