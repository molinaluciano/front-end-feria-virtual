import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const changeRequestStatus = (idRequest, idStatus) => {
  const endPoint = config.endPoint.updaterequeststatus;
  return new Promise((resolve, reject) => {
    instance
      .put(endPoint, {
        idSolicitud: idRequest,
        idEstadoSolicitud: idStatus
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};