import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const requestParticipation = (form) => {
  const endPoint = config.endPoint.participateRequest;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idProductorSolicitud: null,
        precio: parseInt(form.precio),
        idProductor: parseInt(form.idProductor),
        idSolicitud: parseInt(form.idSolicitud)
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};