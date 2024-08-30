import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getSummary = () =>
  axios.get(`${BASE_URL}/summary-management/list`);

export const getTop10Summary = () =>
  axios.get(`${BASE_URL}/summary-management/latest`);

export const getLocomotives = () =>
  axios.get(`${BASE_URL}/locomotive-management/list`);
