import axios from "axios";
import config from "./../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const loginUsers = (form) => {
  const endPoint = config.endPoint.login;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        idTipoUsuario: form.idTypeUser,
        correo: form.email,
        contrasena: form.password,
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};
