import axios from 'axios';
import config from '../../config/endPoints';
require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL,
});

export const getAllProducer = async () => {
    const endPoint = config.endPoint.selectProducer;
    let producers = [];
    try {
        const { data } = await instance.get(endPoint);
        producers = data;
    } catch (error) {
        console.log(
            '🚀 ~ file: producto-service.js ~ line 18 ~ getAllProducer ~ error',
            error
        );
    }

    return producers;
};
export const getAllProducerRequest = async () => {
    const endPoint = config.endPoint.producerRequest;
    let producers = [];
    try {
        const { data } = await instance.get(endPoint);
        producers = data;
    } catch (error) {
        console.log(
            '🚀 ~ file: producto-service.js ~ line 18 ~ getAllProducer ~ error',
            error
        );
    }

    return producers;
};
