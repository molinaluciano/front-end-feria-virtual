import axios from "axios";
import config from "../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const getRequestById = (id) => {
  const endPoint = config.endPoint.getRequestBystatus;
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

export const getRequestsByClient = async (clientId) => {
  try{
    const result = await getAllRequests();
    console.log(JSON.stringify(result), 'stringufy')
    console.log(result, 'asdas')
    // const clientRequest = result.filter(x => x.idUsuario = clientId)
    // return clientRequest  
  }catch(err){
    console.log(err);
  }
  
}


