import axios from 'axios';
import config from '../config/endPoints';
import {
    getUserById,
    getFruitById,
    getQualityTypeById,
} from '../service/Productor/request-service';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL,
});

export const getRequestByStatus = (id) => {
    const endPoint = config.endPoint.getRequestBystatus;
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}/${id}`)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getRequestById = (id) => {
    const endPoint = config.endPoint.getRequestById;
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}/${id}`)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};
export const getRequestByStatusId = (id) => {
    const endPoint = config.endPoint.getAllRequest;
    return new Promise((resolve, reject) => {
        instance
            .get(`${endPoint}/${id}`)
            .then((result) => resolve(result.data))
            .catch((error) => reject(new Error(error)));
    });
};

export const getAllRequests = () => {
    const endPoint = config.endPoint.getRequestBystatus;
    return new Promise((resolve, reject) => {
        instance
            .get(endPoint)
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

export const getRequestDetailByIdResponse = async (idResponse) => {
    console.log('idResponse', idResponse);
    const getRequestByIdResponse = await getRequestById(idResponse);
    const qualityId = getRequestByIdResponse[0].detallesSolicitud[0].idCalidad;
    const userId = getRequestByIdResponse[0].idUsuario;
    const fruitId = getRequestByIdResponse[0].detallesSolicitud[0].idFruta;
    const qualityResponse = await getQualityTypeById(qualityId);
    const userInformation = await getUserById(userId);
    const fruitResponse = await getFruitById(fruitId);

    const kilos = getRequestByIdResponse[0].detallesSolicitud[0].kilos;
    const quality = qualityResponse.calidad;
    const customerName = `${userInformation.nombre} ${userInformation.apellidoPaterno} ${userInformation.apellidoMaterno}`;
    const customerPhone = userInformation.telefono;
    const customerMail = userInformation.correo;
    const fruta = fruitResponse.nombreFruta;

    let obj = {
        fruta: fruta,
        kilos: kilos,
        quality: quality,
        customerName: customerName,
        customerPhone: customerPhone,
        customerMail: customerMail,
    };

    return obj;
};
