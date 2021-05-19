/* eslint-disable arrow-parens */
import axios from "axios";

const createAttempt = (payload) => axios.post("/api/public/init", payload);

const attemptApi = {
  createAttempt,
};

export default attemptApi;
