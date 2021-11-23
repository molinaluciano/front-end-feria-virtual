import axios from "axios";
import config from "../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const getRequestById = (id) => {
  const endPoint = config.endPoint.getrequestbystatus;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${id}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};