import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const auctionParticipation = (form) => {
  const endPoint = config.endPoint.auctionparticipation;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idDetalleSubasta: null,
        idSubasta: parseInt(form.idSubasta),
        idCamion: parseInt(form.idCamion),
        precio: parseInt(form.precio)
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};