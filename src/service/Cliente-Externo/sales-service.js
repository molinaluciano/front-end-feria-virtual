import axios from "axios";
import config from "../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const getSales = () => {
  const endPoint = config.endPoint.sales;
  return new Promise((resolve, reject) => {
    instance
      .get(endPoint)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const salesByStatus = (statusId) => {
  const endPoint = config.endPoint.salesByStatus;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${statusId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const salesByPayType = (payTypeId) => {
  const endPoint = config.endPoint.salesByPayType;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${payTypeId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const salesByRequest = (requestId) => {
  const endPoint = config.endPoint.salesByRequest;
  return new Promise((resolve, reject) => {
    instance
      .get(`${endPoint}/${requestId}`)
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};

export const finishSale = (form) => {
  console.log(form,'llegue')
  const endPoint = config.endPoint.updateSaleState
  return new Promise((resolve, reject) => {
    instance
      .put(endPoint, {
          idVenta: parseInt(form.idVenta),
          responseCode: parseInt(form.responseCode)
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)))
  })
}

