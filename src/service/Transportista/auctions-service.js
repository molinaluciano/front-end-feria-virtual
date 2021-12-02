import axios from 'axios';
import config from '../../config/endPoints';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL,
});

export const auctionParticipation = (form) => {
    console.log('form-service-received', form);
    const endPoint = config.endPoint.auctionParticipation;
    return new Promise((resolve, reject) => {
        instance
            .post(endPoint, {
                idDetalleSubasta: null,
                idSubasta: parseInt(form.idSubasta),
                idCamion: parseInt(form.idCamion),
                precio: parseInt(form.precio),
            })
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getAuctionsByStatus = (status) => {
    const endPoint = config.endPoint.getAuctionsByStatus;
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}/${status}`)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getAllAuctions = () => {
    const endPoint = config.endPoint.auctions;
    return new Promise((resolve, reject) => {
        instance
            .get(endPoint)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getAuctionsById = (auctionId) => {
    const endPoint = config.endPoint.auctions;
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}/${auctionId}`)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getAuctionsByRequests = (requestId) => {
    const endPoint = config.endPoint.auctions;
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}/${requestId}`)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getDetailAuctions = () => {
    const endPoint = config.endPoint.detailsAuction;
    return new Promise((resolve, reject) => {
        instance
            .get(endPoint)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};
