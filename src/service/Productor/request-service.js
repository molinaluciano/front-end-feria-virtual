import axios from "axios";
import config from "../../config/endPoints";
import { getAuctionsById } from "../../service/Transportista/auctions-service"
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const requestParticipation = (form) => {
  console.log('form', form)
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

export const allRequestDetails = () => {
  const endPoint = config.endPoint.detailRequest;
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getRequestById = (requestId) => {
  const endPoint = config.endPoint.getRequestById;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${requestId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getRequestByStatusId = (statusId) => {
  const endPoint = config.endPoint.getRequestBystatus;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${statusId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const requestDetailsById = (requestId) => {
  const endPoint = config.endPoint.detailRequest;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${requestId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getQualityTypeById = (id) => {
  const endPoint = config.endPoint.selectQualityFruit;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${id}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getUserById = (id) => {
  const endPoint = config.endPoint.selectUserById; // // //
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${id}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getFruitById = (id) => {
  const endPoint = config.endPoint.selectFruit;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${id}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const getRoutesDetail = async (auctionId) => {
  const auctionDetailResponse = await getAuctionsById(auctionId);
  const routesDetail = auctionDetailResponse[0].rutas[0].detallesRuta;
  return routesDetail;
};




