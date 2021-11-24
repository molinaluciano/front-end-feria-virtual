import axios from 'axios';
import config from '../../config/endPoints';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL,
});

export const getAllBalanceNotAvailability = async () => {
    const endPoint = config.endPoint.getBalanceNotAvailability;

    try {
        const { data } = await instance.get(endPoint);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllBalanceAvailability = async () => {
    const endPoint = config.endPoint.getBalanceAvailability;

    try {
        const { data } = await instance.get(endPoint);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllBalance = async () => {
    const endPoint = config.endPoint.getBalance;

    try {
        const { data } = await instance.get(endPoint);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const createBalance = async (form) => {
    const endPoint = config.endPoint.createBalance;

    try {
        const { data } = await instance.post(endPoint, form);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateBalance = async (form) => {
    const endPoint = config.endPoint.updateBalance;

    try {
        const { data } = await instance.put(endPoint, form);
        return data;
    } catch (error) {
    console.log("🚀 ~ file: balance-services.js ~ line 62 ~ updateBalance ~ error", error)
        
    return error.response.data
    }
};

export const deleteBalance = async (id) => {
    const endPoint = config.endPoint.deleteBalance;
    try {
        const { data } = await instance.delete(endPoint + id);
        return data;
    } catch (error) {
        console.log("🚀 ~ file: balance-services.js ~ line 62 ~ updateBalance ~ error", error)
        return error.response.data 
    }
};
