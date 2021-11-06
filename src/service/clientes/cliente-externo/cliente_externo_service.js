import axios from "axios";
import config from "../../../config/endPoints";
require("dotenv").config();

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export const createUser = (form) => {
  const endPoint = config.endPoint.createuser;
  return new Promise((resolve, reject) => {
    instance
      .post(endPoint, {
        nombre: form.nombre,
        apellidopaterno: form.apellidopaterno,
        apellidomaterno: form.materno,
        correo: form.correo,
        password: form.password,
        direccion: form.direccion,
        rut: form.rut,
        digitoverificador: form.digitoverificador,
        codigopostal: form.codigopostal,
        telefono: form.telefono,
        pais: form.pais,
        tipocliente: form.tipocliente
      })
      .then((result) => resolve(result.data))
      .catch((error) => reject(new Error(error)));
  });
};
