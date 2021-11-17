import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const createTruck = (form, idContrato) => {
  const endPoint = config.endPoint.createTruck;
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


export const deleteTruck = async (id) => {
  const endPoint = `${config.endPoint.deleteTruck}/${id}`

  try {
    const { data } = await instance.delete(endPoint)

    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: transportista-services.js ~ line 51 ~ deleteTruck ~ error',
      error,
    )

    return error.response.data
  }
}

export const updateTruck = async (form) => {
  const endPoint = config.endPoint.updateTruck

  try {
    const { data } = await instance.put(endPoint, form)
    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: transportista-services.js ~ line 66 ~ updateTruck ~ error',
      error,
    )

    return error.response.data
  }
}


export const getTrucksByCarrierId = (carrierId) => {
  const endPoint = config.endPoint.getTrucksByCarrierId;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${carrierId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};