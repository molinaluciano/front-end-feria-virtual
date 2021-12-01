import axios from 'axios';
import config from '../../config/endPoints';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL,
});

export const updateSaleState = (form, saleId) => {
    const endPoint = config.endPoint.updateSaleState;
    return new Promise((resolve, reject) => {
        instance
            .put(`${endPoint}/${saleId}`, {
                idVenta: form.idVenta,
                idEstadoVenta: form.idEstadoVenta,
            })
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};
export const updateStateForSale = (form) => {
    const endPoint = config.endPoint.updateSaleState;
    return new Promise((resolve, reject) => {
        instance
            .put(endPoint, form)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};
