import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const createTruck = (form, idContrato) => {
  const endPoint = config.endPoint.createtruck;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idCamion: null,
        idTipoCamion: 1,
        idTamanoCamion: 1,
        patente: "pat3nt3EDF",
        modelo: "modelo 1",
        marca: "BWW",
        revisionTecnica: 1,
        idTransportista: 1,
        disponibilidad: 1
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};