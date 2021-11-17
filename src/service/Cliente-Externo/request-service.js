import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const requestCreation = (form) => {
  const endPoint = config.endPoint.requestCreation;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idUsuario: form.idUsuario,
        idTipoSolicitud: form.idTipoSolicitud,
        kilos: parseInt(form.kilos),
        idFruta: form.idFruta,
        idCalidad: form.idCalidad
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};