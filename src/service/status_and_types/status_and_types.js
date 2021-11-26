import axios from 'axios';
import config from '../../config/endPoints';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL,
});

export const getPayTypes = async () => {
    const endPoint = config.endPoint.getPayType;

    try {
        const { data } = await instance.get(endPoint);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getStatusSales = async () => {
    const endPoint = config.endPoint.getStatusSale;

    try {
        const { data } = await instance.get(endPoint);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};
