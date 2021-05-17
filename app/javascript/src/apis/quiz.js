/* eslint-disable arrow-parens */
import axios from "axios";

const create = (payload) => axios.post("/quizzes/", payload);
const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);
const destroy = (id) => axios.delete(`/quizzes/${id}`);
const index = () => axios.get("/quizzes/");
const show = (id) => axios.get(`/quizzes/${id}`);

const quizApi = {
  create,
  update,
  destroy,
  index,
  show,
};

export default quizApi;
