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
        idFruta: parseInt(form.idFruta),
        idCalidad: parseInt(form.idCalidad)
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getFruits = () => {
  const endPoint = config.endPoint.selectFruit;
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};


export const getFruitsTypes = () => {
  const endPoint = config.endPoint.selectCategoryFruit;
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getQualityTypes = () => {
  const endPoint = config.endPoint.selectQualityFruit;
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getRequestByClientId = (clientId) => {
  const endPoint = config.endPoint.selectRequestByClientId;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${clientId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};
