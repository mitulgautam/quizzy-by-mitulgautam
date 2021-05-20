/* eslint-disable arrow-parens */
import axios from "axios";

const createAttempt = (payload) => axios.post("/api/public/", payload);
const update = (id, payload) => axios.put(`/api/public/${id}`, payload);
const show = (id) => axios.get(`/api/public/${id}`);
const result = (id) => axios.get(`/api/public/result/${id}`);

const attemptApi = {
  createAttempt,
  update,
  show,
  result,
};

export default attemptApi;
